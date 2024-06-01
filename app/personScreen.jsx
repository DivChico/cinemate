import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPersonDetails, image342, fetchPersonMovies } from "../api/tmdb";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "expo-router";
import MovieList from "../components/MovieList";
import { useRoute } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "my-3";
const personScreen = () => {
  const [IsFavourite, setIsFavourite] = useState(false);
  const [personData, setPersonData] = useState({});

  const [movies, SetMovies] = useState({});
  const { params: person } = useRoute();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const getPersonalDetails = async (id) => {
    setLoading(true);

    const data = await fetchPersonDetails(id);
    if (data) setPersonData(data);
    setLoading(false);
  };
  const getPersonalMovies = async (id) => {
    setLoading(true);

    const data = await fetchPersonMovies(id);
    if (data) SetMovies(data.cast);
    setLoading(false);
  };
  useEffect(() => {
    getPersonalDetails(person.id);
    getPersonalMovies(person.id);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900  "
    >
      <View className="w-full mt-5">
        <SafeAreaView
          className={
            "w-full   items-center flex-row justify-between px-4 top-0 right-0 " +
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
      </View>
      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="rounded-full h-72 w-72 overflow-hidden items-center border-2 border-neutral-400">
            <Image
              className="w-72 h-72"
              source={
                personData
                  ? { uri: image342(personData.profile_path) }
                  : require("../assets/images/mh-9-22-wick-650dcf0aeb656.jpg")
              }
            />
          </View>
        </View>
        <View className="justify-center items-center ">
          <Text className="text-white text-center text-3xl font-bold tracking-wide mt-5">
            {personData.name}
          </Text>
          <Text className=" text-lg text-semibold mt-1 text-neutral-400">
            {personData.place_of_birth}
          </Text>
          {/* actor details */}
          <View className="mx-4 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className=" text-neutral-300 text-sm">
                {personData.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className=" text-neutral-300 text-sm">
                {personData.birthday}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className=" text-neutral-300 text-sm">
                {personData.known_for_department}
              </Text>
            </View>
            <View className="items-center px-2 ">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className=" text-neutral-300 text-sm">
                {personData.popularity.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
        {/* descriotion */}
        <View className="mx-4 space-y-2 my-6">
          <Text className="text-white text-lg   ">Biography</Text>
          <Text className="text-neutral-400 tracking-wide ">
            {personData.biography || "N/A"}
          </Text>
        </View>
        {/* mives */}
        <MovieList title={"Movies"} data={movies} />
      </View>
      <StatusBar barStyle={"light-content"} />
    </ScrollView>
  );
};

export default personScreen;

const styles = StyleSheet.create({});
