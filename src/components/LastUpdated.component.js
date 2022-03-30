import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { timeConvert } from "../../utilities/timeConvert";

export const LastUpdatedComponent = ({
  weather,
  getWeatherData,
  setIsLoading,
  query,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 15 }}>
        Last Updated: {weather.current.last_updated.split(" ")[0]}{" "}
        {timeConvert(weather.current.last_updated.split(" ")[1])}
      </Text>
      <IconButton
        color="#fff"
        icon="refresh"
        animated={true}
        onPress={() => {
          getWeatherData(query);
          setIsLoading(true);
        }}
      />
    </View>
  );
};
