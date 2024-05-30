import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Button } from "react-native-paper";

export default function Index() {
  return <Redirect href={"/schedule"}></Redirect>;
  // return (
  //   <SafeAreaView className="bg-primary h-full">
  //     <ScrollView contentContainerStyle={{ height: "100%" }}>
  //       <Pressable
  //         className="w-full justify-center items-center h-full px-4"
  //         onPress={() => {
  //           console.log("pressing");
  //         }}
  //       >
  //         <Image
  //           source={images.logo}
  //           className="w-[130px] h-[84px]"
  //           resizeMode="contain"
  //         />
  //         <Image
  //           source={images.cards}
  //           className="max-w--[380px] w-full h-[300px]"
  //           resizeMode="contain"
  //         />
  //         <View className="relative mt-5">
  //           <Text className="text-3xl text-white font-bold text-center">
  //             Discover Endless{"\n"}
  //             Possibilities with{" "}
  //             <Text className="text-secondary-200">Aora</Text>
  //           </Text>
  //         </View>
  //         <Text className="text-gray-100 mt-7 text-center text-sm font-pregular ">
  //           Where Creativity Meets Innovation: Embark on a Journey of Limitless
  //           Exploration with Aora
  //         </Text>
  //         <Button
  //           icon="camera"
  //           mode="contained"
  //           onPress={() => {
  //             console.log("press");
  //           }}
  //         >
  //           <Link href={"/home"}>hijjjjjjjjj</Link>
  //         </Button>
  //       </Pressable>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}
