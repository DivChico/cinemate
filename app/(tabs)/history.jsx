import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
const History = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.history);
  const allPreviousDaysDate = Object.keys(history);
  let months = ["jan", "feb", "mar", "apr", "may", "jun"];
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-xl font-bold text-center mt-5 mb-5">History</Text>

        <View className="pl-5 pr-5 flex-row gap-1 items-center flex-wrap  justify-around">
          {allPreviousDaysDate.map((day, idx) => {
            const indexEnd = day.indexOf("/");
            const month = day.slice(indexEnd + 1, day.length);
            const monthIndex = month.indexOf("/");
            return (
              <View
                key={day}
                className="bg-gray-100 w-1/5 h-[100px] rounded-2xl p-1 items-center"
              >
                <Text className="font-psemibold">{day.slice(0, indexEnd)}</Text>
                <Text className="font-psemibold">
                  {months[month.slice(0, monthIndex) - 1]}
                </Text>

                <Text className="font-bold text-xl">{history[day].time}h</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({});
