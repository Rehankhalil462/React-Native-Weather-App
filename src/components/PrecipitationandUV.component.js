import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

export const PrecipitationandUVComponent = ({ weather }) => {
  return (
    <View style={styles.hourlyWeatherContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            style={{ margin: 0 }}
            icon="water-outline"
            color="#fff"
            size={30}
          />
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={styles.weatherDateAndTime}>Precipitation</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {Math.round(weather.current.precip_in)}%
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderLeftWidth: 1,
            borderLeftColor: "white",
          }}
        >
          <IconButton icon="white-balance-sunny" color="#fff" size={30} />
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={styles.weatherDateAndTime}>UV Index</Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {weather.current.uv <= 2
                ? "Low"
                : weather.current.uv <= 5
                ? "Medium"
                : weather.current.uv <= 7
                ? "High"
                : weather.current.uv <= 10
                ? "Very High"
                : "Extremely High"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hourlyWeatherContainer: {
    backgroundColor: "#6CB4EE",
    borderRadius: 25,
    paddingTop: 5,
    marginBottom: 10,

    alignItems: "center",
  },
  timeStamp: {
    color: "#fff",
    fontSize: 15,
  },
  precipitation: {
    color: "#fff",
  },
  weatherDateAndTime: {
    fontSize: 20,
    marginTop: 5,
    color: "#fff",
    // opacity: 0.7,
  },
});
