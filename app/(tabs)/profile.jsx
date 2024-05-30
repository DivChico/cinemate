import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-xl font-bold text-center mt-5 mb-5">Profile</Text>
        <Text className="text-xl font-bold text-center mt-5 mb-5 text-red-500">
          working on it
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
