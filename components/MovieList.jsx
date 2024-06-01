import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Loading from "../components/Loading";
import { useNavigation } from "expo-router";
import { image185, image500 } from "@/api/tmdb";
var { width, height } = Dimensions.get("window");

const MovieList = ({ data, title, loading }) => {
  const navigation = useNavigation();
  const movieName = "the avengers endgameoasd";
  return (
    <View className="mb-3 mt-3 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl ">{title}</Text>

        <TouchableOpacity>
          <Text className="text-xl text-red-500">See All</Text>
        </TouchableOpacity>
      </View>
      <Loading loading={loading}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="mt-3"
        >
          {data.map((item, idx) => {
            return (
              <TouchableWithoutFeedback
                key={idx}
                onPress={() => navigation.navigate("movieScreen", item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={
                      item
                        ? { uri: image185(item.poster_path) }
                        : require(`../assets/images/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg`)
                    }
                    style={{
                      width: width * 0.3,
                      height: height * 0.22,
                    }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </Loading>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({});
