import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Loading = ({ children, loading }) => {
  return (
    <>
      {loading == true ? (
        <Text className="text-white text-center font-bold">Loading...</Text>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({});
