import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export const TemparatureDetailComponent = ({ weather }) => {
  return (
    <View style={styles.temparatureDetailContainer}>
      <View style={styles.temparatureValueandIconContainer}>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `https:${weather.current.condition.icon}`,
          }}
        />
        <Text style={styles.temparature}>
          {`${Math.round(weather.current.temp_c)}°`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.feelslikeTemparature}>
          {`${Math.round(
            weather.forecast.forecastday[0].day.maxtemp_c
          )}°/${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°   `}
        </Text>
        <Text style={styles.feelslikeTemparature}>{`Feels like ${Math.round(
          weather.current.feelslike_c
        )}°`}</Text>
      </View>

      <Text style={styles.temparatureCondition}>
        {weather.current.condition.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  temparatureDetailContainer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  temparatureValueandIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  weatherIcon: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  temparature: {
    color: "#fff",
    fontSize: 110,
    fontWeight: "300",
    letterSpacing: -2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  feelslikeTemparature: {
    color: "#fff",
    fontSize: 18,
    marginTop: 8,
    opacity: 0.9,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  temparatureCondition: {
    color: "#fff",
    fontSize: 24,
    marginTop: 8,
    fontWeight: "600",
    textTransform: "capitalize",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
});
