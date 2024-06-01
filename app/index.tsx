import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMoviesSnapCarosuel from "../components/TrendingMoviesSnapCarosuel";
import MovieList from "../components/MovieList";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/tmdb";
const ios = Platform.OS == "ios";

export default function Index() {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([1, 1, 1, 1, 3, 5, 5, 5, 5, 5]);
  const [upcoming, setupcoming] = useState([1, 1, 1, 1, 3, 5, 5, 5, 5, 5]);
  const [topRated, setTopRated] = useState([1, 1, 3, 5, 5, 5, 5, 5]);
  const [loading, setLoading] = useState(false);
  const getTrendingMovies = async () => {
    setLoading(true);
    const data = await fetchTrendingMovies();
    if (data && data.result) {
      setTrending(data.result);
    }
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies();
    if (data && data.result) {
      setupcoming(data.result);
    }
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    setLoading(true);
    const data = await fetchTopRatedMovies();
    if (data && data.result) {
      setTopRated(data.result);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      {/* searchbar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <View className="flex-row items-center justify-between mx-4 ">
          <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-red-500">C</Text>inemate
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("searchScreen");
            }}
          >
            <MagnifyingGlassIcon size="30" color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carosuel */}
        <TrendingMoviesSnapCarosuel data={trending} loading={loading} />
        {/* upcoming movies */}
        {upcoming.length > 0 && (
          <MovieList
            title={"Upcoming Movies"}
            data={upcoming}
            loading={loading}
          />
        )}

        {/* to rated */}
        {topRated.length > 0 && (
          <MovieList
            title={"toRated Movies"}
            data={topRated}
            loading={loading}
          />
        )}
      </ScrollView>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
}
