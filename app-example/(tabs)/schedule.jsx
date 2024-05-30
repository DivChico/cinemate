import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput, IconButton, MD3Colors } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { SafeAreaView } from "react-native-safe-area-context";
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
import {
  addSubjectToDay,
  removeSubjectFromDay,
} from "../../store/schedule/scheduleSlice";
const Schedule = () => {
  let currentDay = weekdays[moment().day()];

  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.schedule);

  const [SelectedDay, setSelectedDay] = useState(currentDay);
  const [text, setText] = useState("");
  const handleAdd = () => {
    dispatch(
      addSubjectToDay({
        day: SelectedDay,
        title: text,
      })
    );
    setText("");
  };
  const handleRemove = (day, id) => {
    dispatch(removeSubjectFromDay({ id, day }));
  };
  const renderList = weekdays.map((item) => {
    let day = item;

    return (
      <View>
        <View className="items-center flex-row justify-between mb-5 mt-5">
          <Text className="text-xl font-bold">{item} </Text>
        </View>
        <View className="">
          {records[item].subjects.map((item) => {
            return (
              <View className="items-center  flex-row  mb-2 ">
                <View className="bg-gray-100 rounded-xl  mr-2 ">
                  <IconButton icon="home" size={20} style={{}} />
                </View>
                <View className="flex-row justify-between items-center flex-1">
                  <Text className="text-xl font-psemibold">{item.title}</Text>
                  <Button
                    mode="contained"
                    onPress={() => {
                      handleRemove(day, item.id);
                    }}
                  >
                    Del
                  </Button>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  });
  // redux
  return (
    <SafeAreaView>
      <ScrollView>
        {/* add task */}
        <View className="p-5">
          <Text className="text-xl font-bold mb-2">Add new task </Text>

          <View className="items-center flex-row ">
            <TextInput
              label="Subject Title"
              value={text}
              onChangeText={(text) => setText(text)}
              className="w-full mb-2  "
            />
          </View>
          <View className="flex-row justify-around items-center flex-wrap">
            {weekdays.map((item) => {
              return (
                <Button
                  style={{}}
                  mode={SelectedDay == item ? "contained" : ""}
                  onPress={() => {
                    setSelectedDay(item);
                  }}
                >
                  {item.slice(0, 2)}
                </Button>
              );
            })}
            {/* <FlatList
              data={weekdays}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              renderItem={({ item }) => {
                return (
                  <Button
                    style={{}}
                    mode={SelectedDay == item ? "contained" : ""}
                    onPress={() => {
                      setSelectedDay(item);
                    }}
                  >
                    {item.slice(0, 2)}
                  </Button>
                );
              }}
            /> */}
          </View>
          <Button
            mode={"contained"}
            onPress={handleAdd}
            className="mt-2 rounded-3xl"
          >
            Add Task
          </Button>
        </View>
        {/* view schedule */}
        <View className="p-5">
          {renderList}
          {/* <FlatList
          data={weekdays}
          renderItem={({ item }) => {
            let day = item;
            return (
              <View>
                <View className="items-center flex-row justify-between mb-5 mt-5">
                  <Text className="text-xl font-bold">{item} </Text>
                </View>
                <View className="">
                  <FlatList
                    data={records[item].subjects}
                    renderItem={({ item }) => {
                      return (
                        <View className="items-center  flex-row  mb-2 ">
                          <View className="bg-gray-100 rounded-xl  mr-2 ">
                            <IconButton icon="home" size={20} style={{}} />
                          </View>
                          <View className="flex-row justify-between items-center flex-1">
                            <Text className="text-xl font-psemibold">
                              {item.title}
                            </Text>
                            <Button
                              mode="contained"
                              onPress={() => {
                                handleRemove(day, item.id);
                              }}
                            >
                              Del
                            </Button>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            );
          }}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
