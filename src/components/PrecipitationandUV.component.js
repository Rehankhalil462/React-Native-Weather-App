import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, Text, View, Platform } from "react-native";

export const PrecipitationandUVComponent = ({ weather }) => {
  return (
    <View style={styles.hourlyWeatherContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <IconButton
            style={{ margin: 0 }}
            icon="water-outline"
            color="#fff"
            size={28}
          />
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={styles.weatherDateAndTime}>Precipitation</Text>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
              {Math.round(weather.current.precip_in)}%
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 1,
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            marginHorizontal: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <IconButton icon="white-balance-sunny" color="#fff" size={28} style={{ margin: 0 }} />
          <View
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={styles.weatherDateAndTime}>UV Index</Text>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  timeStamp: {
    color: "#fff",
    fontSize: 15,
  },
  precipitation: {
    color: "#fff",
  },
  weatherDateAndTime: {
    fontSize: 16,
    marginTop: 5,
    color: "#fff",
    opacity: 0.85,
    fontWeight: "500",
  },
});
