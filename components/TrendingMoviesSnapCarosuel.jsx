import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

import { useNavigation } from "expo-router";
import Loading from "../components/Loading";
import { image500 } from "@/api/tmdb";
// import Carousel from "react-native-snap-carousel";
var { width, height } = Dimensions.get("window");
const TrendingMoviesSnapCarosuel = ({ data, loading }) => {
  const navigation = useNavigation();
  const handleClick = ({ item }) => {
    navigation.navigate("movieScreen", item);
  };
  return (
    <View calssName="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      {/* <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        sliderStyle={{ display: "flex", alignItems: "center" }}
      /> */}
      <Loading loading={loading}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            gap: 15,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, idx) => {
            return <MovieCard handleClick={handleClick} item={item} />;
          })}
        </ScrollView>
      </Loading>
    </View>
  );
};
const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClick(item);
      }}
    >
      <Image
        source={
          item
            ? { uri: image500(item.poster_path) }
            : require(`../assets/images/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg`)
        }
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMoviesSnapCarosuel;
