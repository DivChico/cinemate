import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { Button, IconButton, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, changeTime } from "../../store/history/historySlice";
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Home = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.schedule);
  const { history } = useSelector((state) => state.history);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  let currentDate = new Date().toLocaleDateString();
  let currentDay = weekdays[moment().day()];
  const [toDaySchedule, setToDaySchedule] = useState({
    ...records[currentDay],
  });

  useEffect(() => {
    if (history[currentDate]) {
      setToDaySchedule(history[currentDate]);
    }
  }, [currentDate]);

  const [text, setText] = useState(toDaySchedule.time);

  let handleAddToHistory = (id) => {
    let editable = { ...toDaySchedule };
    editable.subjects = editable.subjects.map((subject) => {
      if (subject.id == id) {
        return { ...subject, isDone: !subject.isDone };
      } else {
        return subject;
      }
    });
    setToDaySchedule(editable);
    dispatch(
      addToHistory({
        date: currentDate,
        subjectsAndTime: toDaySchedule,
      })
    );
    console.log(history);
  };
  let handleTimeChange = (status) => {
    let editable = { ...toDaySchedule };
    if (status == "increse") {
      editable.time = editable.time + 1 / 4;
    } else {
      editable.time = editable.time - 1 / 4;
    }
    setToDaySchedule(editable);
    dispatch(
      changeTime({
        time: editable.time,
        date: currentDate,
      })
    );
    console.log(history);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-xl font-bold text-center mt-5 mb-5">
          Dashboard
        </Text>
        <View className="pl-5 pr-5 mb-2 flex-row justify-center gap-2  ">
          <View className="bg-gray-100 w-1/2 h-[100px] rounded-2xl p-3">
            <Text className="font-psemibold">Day</Text>
            <Text className="font-bold text-xl">{currentDay}</Text>
          </View>
          <View className="bg-gray-100 w-1/2 h-[100px] rounded-2xl p-3">
            <Text className="font-psemibold">Date</Text>
            <Text className="font-bold text-xl">{currentDate}</Text>
          </View>
        </View>
        <View className="pl-5 pr-5 mb-2 flex-row justify-center gap-2  ">
          <View className="bg-gray-100 w-1/2 h-[100px] rounded-2xl p-3">
            <Text className="font-psemibold">Weekly goal</Text>
            <Text className="font-bold text-xl">30 h</Text>
          </View>
          <View className="bg-gray-100 w-1/2 h-[100px] rounded-2xl p-3">
            <Text className="font-psemibold">Tasks completed</Text>
            <Text className="font-bold text-xl">{`0 / ${toDaySchedule.subjects.length}`}</Text>
          </View>
        </View>
        <View className="justify-center pl-3 pr-3 items-center ">
          <View className="bg-gray-100 w-full h-[100px] rounded-2xl p-3 flex-row ">
            <View className="flex-1">
              <Text className="font-psemibold">Hours studied </Text>
              <Text className="font-bold text-xl">{toDaySchedule.time} h</Text>
            </View>

            <View className="gap-1">
              <Button
                mode="contained"
                className="w-1/2"
                onPress={() => {
                  handleTimeChange("increse");
                }}
              >
                +
              </Button>
              <Button
                mode="contained"
                className="w-1/2"
                onPress={() => {
                  handleTimeChange("decrese");
                }}
              >
                -
              </Button>
            </View>
          </View>
        </View>
        <View className="pl-5 pr-5">
          <Text className="text-xl font-bold  mt-5 mb-5">Today's Plan</Text>
          {toDaySchedule.subjects.map((item) => {
            return (
              <View key={item.id}>
                <Pressable
                  className="items-center  flex-row  mb-2 "
                  onPress={() => {
                    handleAddToHistory(item.id);
                  }}
                >
                  <View className="bg-gray-100 rounded-xl  mr-2 ">
                    <IconButton icon="home" size={20} style={{}} />
                  </View>
                  <View className="flex-row justify-between items-center flex-1">
                    <Text
                      className={`text-xl font-psemibold ${
                        item.isDone ? "line-through" : ""
                      }`}
                    >
                      {item.title}
                    </Text>
                    <Checkbox
                      status={item.isDone ? "checked" : "unchecked"}
                    ></Checkbox>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  // return (
  //   <SafeAreaView>
  //     <View>
  //       {/* header */}
  //       {/* show schedule by day*/}
  //       <View>
  //         <View className="flex-row">
  //           <Text className="text-xl">Day : </Text>

  //           <Text className="text-xl">{currentDay}</Text>
  //         </View>
  //         <View className="flex-row">
  //           <Text className="text-xl">Date : </Text>

  //           <Text className="text-xl">{currentDate}</Text>
  //         </View>
  //         <View className="flex-row">
  //           <Text className="text-xl">Study time : </Text>

  //           <Text className="text-xl">{toDaySchedule.time}</Text>
  //         </View>
  //         <Text className="text-xl">Tasks : </Text>

  //         <View>
  //           <FlatList
  //             data={toDaySchedule.subjects}
  //             renderItem={({ item }) => {
  //               return (
  //                 <View className="flex-row items-center justify-between">
  //                   <Text className="text-lg">{item.title}</Text>
  //                   <Text>{item.isDone ? "Done" : "UnDone"}</Text>

  //                   <Button
  //                     mode="contained"
  //                     onPress={() => {
  //                       handleAddToHistory(item.id);
  //                     }}
  //                   >
  //                     Done
  //                   </Button>
  //                 </View>
  //               );
  //             }}
  //           />
  //           <Text className="text-xl">
  //             {toDaySchedule.subjects.length ? "" : "no tasks today"}
  //           </Text>
  //         </View>
  //         <View className="flex-row items-center">
  //           <TextInput
  //             label="ساعات الدراسة"
  //             value={text}
  //             keyboardType="numeric"
  //             onChangeText={(text) => setText(text)}
  //             onBlur={handleTimeChange}
  //             className="flex-1"
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
};

export default Home;
