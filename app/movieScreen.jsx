import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/tmdb";
import Loading from "../components/Loading";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";
const MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState({});
  const [movieCredits, setMovieCredits] = useState({});

  const [loading, setLoading] = useState(false);

  const [cast, setCast] = useState([1, 2, 2, 5, 5, 5]);
  const movieName = "the avengers enssoasd";

  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [IsFavourite, setIsFavourite] = useState(false);
  const getMovieDetails = async () => {
    setLoading(true);
    const data = await fetchMovieDetails(item.id);
    if (data) {
      setMovieDetails(data.result);
    }
    setLoading(false);
  };
  const getSimilarMovies = async () => {
    setLoading(true);
    const data = await fetchSimilarMovies(item.id);
    if (data) {
      setSimilarMovies(data.result);
    }
    setLoading(false);
  };
  const getMovieCredits = async () => {
    setLoading(true);
    const data = await fetchMovieCredits(item.id);
    if (data) {
      setMovieCredits(data.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
    getMovieCredits();
  }, []);

  return (
    <Loading loading={loading}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900 "
      >
        <StatusBar barStyle={"light-content"} />

        {/* back nutton and heart icon */}
        <View className="w-full  ">
          <SafeAreaView
            className={
              "z-20 w-full absolute  items-center flex-row justify-between px-4 top-0 right-0 " +
              topMargin
            }
          >
            <TouchableOpacity
              className="rounded-xl p-1 bg-red-500"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-xl p-1 "
              onPress={() => {
                setIsFavourite(!IsFavourite);
              }}
            >
              <HeartIcon size="35" color={IsFavourite ? "red" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <Image
              source={
                movieDetails
                  ? { uri: image500(movieDetails.poster.path) }
                  : require("../assets/images/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg")
              }
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>
        {/* movie details nad description */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wide ">
            {movieDetails.title}
          </Text>
          {/* mivie details */}
          <Text className="text-center text-neutral-400 font-semibold text-base ">
            {movieDetails.status} - {movieDetails.release_date.split("-"[0])} -
            {movieDetails.runtime} min
          </Text>
          {/* genras */}
          <View className="flex-row justify-center items-center space-x-2 mx-4">
            {movieDetails.genres.map((genre, idx) => {
              let showDot = idx + 1 != movieDetails.genres.length;
              return (
                <Text className="text-center text-neutral-400 font-semibold text-base ">
                  {genre} {showDot ? "-" : null}
                </Text>
              );
            })}
          </View>
          <Text className="text-neutral-400 text-base tracking-wide mx-4">
            {movieDetails.overview}
          </Text>
        </View>
        {/* cast */}
        {movieCredits.length > 0 && <Cast cast={movieCredits} />}

        {/* similar movies */}
        {similarMovies.length > 0 && (
          <MovieList title={"similar movies"} data={similarMovies} />
        )}
      </ScrollView>
    </Loading>
  );
};

export default MovieScreen;
