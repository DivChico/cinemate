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
import React, { useState } from "react";
const ios = Platform.OS == "ios";
export default function Index() {
  const [trending, setTrending] = useState([1, 1, 1, 1, 3, 5, 5, 5, 5, 5]);
  const [upcoming, setupcoming] = useState([1, 1, 1, 1, 3, 5, 5, 5, 5, 5]);
  const [topRated, setTopRated] = useState([1, 1, 3, 5, 5, 5, 5, 5]);

  return (
    <View className="flex-1 bg-neutral-900">
      {/* searchbar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <View className="flex-row items-center justify-between mx-4 ">
          <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-red-500">C</Text>inemate
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carosuel */}
        <TrendingMoviesSnapCarosuel data={trending} />
        {/* upcoming movies */}
        <MovieList title={"Upcoming Movies"} data={upcoming} />
        {/* to rated */}
        <MovieList title={"toRated Movies"} data={topRated} />
      </ScrollView>
    </View>
  );
}
