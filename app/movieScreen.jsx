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
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";
const MovieScreen = () => {
  const movieName = "the avengers enssoasd";

  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [IsFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    //fetch details movie
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900 "
    >
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
            source={require("../assets/images/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg")}
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
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wide ">
          {movieName}
        </Text>
        {/* mivie details */}
        <Text className="text-center text-neutral-400 font-semibold text-base ">
          Released - 2002 - 170 min
        </Text>
        {/* genras */}
        <View className="flex-row justify-center items-center space-x-2 mx-4">
          <Text className="text-center text-neutral-400 font-semibold text-base ">
            Action -
          </Text>
          <Text className="text-center text-neutral-400 font-semibold text-base ">
            Action -
          </Text>
          <Text className="text-center text-neutral-400 font-semibold text-base ">
            Action
          </Text>
        </View>
        <Text className="text-neutral-400 text-base tracking-wide mx-4">
          asdasdasdasd;las,fp'sodgkdmfgoinagojdn;flgisudfhnglisgna;ioerjgipauo;fgn;audfgn;isfudgn;isdhngufdshgsudfhgisfldhgiudfshglisdfhglisufdhgludfishgufsidhguidsfhgiufdhgilsdfughlsfidughlsidfhgliufdsghuifsldghlsiudfghiudfsghlidfsugnidfsngifsdn
        </Text>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
