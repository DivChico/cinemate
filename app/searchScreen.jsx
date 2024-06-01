import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

import React, { useCallback, useState } from "react";
import { useNavigation } from "expo-router";
var { width, height } = Dimensions.get("window");
import { searchMovies } from "../api/tmdb";

const searchScreen = () => {
  const navigation = useNavigation();
  const movieName = "the avengers endgameoasd";
  const [loading, setLoading] = useState(false);

  const [search, SetSearch] = useState();
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data) {
          SetSearch(data.results);
        }
      });
    } else {
      setLoading(false);
      SetSearch([]);
    }
  };
  // lodech kibrary
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="flex-1 bg-neutral-900 space-y-3 ">
      <View className="mx-5 flex-row items-center border border-neutral-500 rounded-full mt-5">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Saerch movie"
          placeholderTextColor={"lightgray"}
          className="flex-1 text-base font-semibold text-white tracking-wider pb-1 pl-6"
        />
        <TouchableOpacity
          className="rounded-full bg-neutral-500 p-3 m-1"
          onPress={() => {
            navigation.navigate("index");
          }}
        >
          <XMarkIcon size={"25"} color={"white"} />
        </TouchableOpacity>
      </View>
      {search.length > 0 ? (
        <ScrollView className="mx-5">
          <Text className="text-white text-sm font-semibold mb-5">
            Results ({search.length})
          </Text>
          <View className="flex-wrap flex-row justify-between">
            {search.map(({ item, idx }) => {
              return (
                <TouchableWithoutFeedback key={idx}>
                  <View className="space-y-2 mb-4 items-center">
                    <Image
                      className="rounded-3xl"
                      style={{ width: width * 0.42, height: height * 0.3 }}
                      source={
                        item
                          ? { uri: item.poster_path }
                          : require("../assets/images/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg")
                      }
                    />
                    <Text
                      className="text-neutral-300 ml-4
                  "
                    >
                      {item.title.length > 14
                        ? item.title.slice(0, 14) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center items-center">
          <Image
            source={require("../assets/images/empty.png")}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default searchScreen;

const styles = StyleSheet.create({});
