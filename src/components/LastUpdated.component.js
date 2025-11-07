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
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 13, opacity: 0.85, fontWeight: "400" }}>
        Last Updated: {weather.current.last_updated.split(" ")[0]}{" "}
        {timeConvert(weather.current.last_updated.split(" ")[1])}
      </Text>
      <IconButton
        color="#fff"
        icon="refresh"
        size={22}
        animated={true}
        onPress={() => {
          getWeatherData(weather.location.name);
          setIsLoading(true);
        }}
        style={{ margin: 0 }}
      />
    </View>
  );
};
