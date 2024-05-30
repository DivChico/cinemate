import { View, Image } from "react-native";
import React, { useState } from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "./home";
import Schedule from "./schedule";
import Profile from "./profile";
import History from "./history";
//routes
const HomeRoute = () => <Home />;
const ScheduleRoute = () => <Schedule />;
const ProfileRoute = () => <Profile />;
const HistoryRoute = () => <History />;

const TabsLayout = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "schedule",
      title: "Schedule",
      focusedIcon: "bookmark",
      unfocusedIcon: "bookmark-outline",
    },
    {
      key: "history",
      title: "History",
      focusedIcon: "pin",
      unfocusedIcon: "pin-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    schedule: ScheduleRoute,
    profile: ProfileRoute,
    history: HistoryRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default TabsLayout;
