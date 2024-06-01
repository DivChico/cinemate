import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation } from "expo-router";
import { image185 } from "../api/tmdb";
var { width, height } = Dimensions.get("window");

const Cast = ({ cast }) => {
  const navigation = useNavigation();
  const arr = [1, 2, 6, 8, 58, 9, 9, 8];
  const actorMovieName = "alksmdlksandlkasndlkansdlkasndaslkdn";
  const actorRealname = "johan wick";
  return (
    <View className="my-5">
      <Text className="text-white text-xl mx-5 my-5 ">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {cast.map((person, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              className="mr-4 items-center space-y-1"
              onPress={() => {
                navigation.navigate("personScreen", person);
              }}
            >
              <View className="h-20 w-20 rounded-full overflow-hidden items-center border border-neutral-400 ">
                <Image
                  className="rounded-2xl h-24 w-20 "
                  source={
                    person
                      ? { uri: image185(person.profile_path) }
                      : require("../assets/images/mh-9-22-wick-650dcf0aeb656.jpg")
                  }
                ></Image>
              </View>
              <Text className="text-xs mt-1 text-white">
                {person.character.length > 10
                  ? person.character.slice(0, 10)
                  : person.character}
              </Text>
              <Text className="text-xs mt-1 text-neutral-400">
                {person.original_name.length > 14
                  ? person.original_name.slice(0, 14)
                  : person.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
