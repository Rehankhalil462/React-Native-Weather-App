import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export const TemparatureDetailComponent = ({ weather }) => {
  return (
    <View style={styles.temparatureDetailContainer}>
      <View style={styles.temparatureValueandIconContainer}>
        <Image
          style={{ width: 100, height: 100 }}
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
    // backgroundColor: "grey",
    alignItems: "center",
  },
  temparatureValueandIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temparature: {
    // marginTop: 15,
    color: "#fff",
    fontSize: 100,
  },
  feelslikeTemparature: {
    color: "#fff",
    fontSize: 22,
    marginTop: 5,
    opacity: 0.8,
  },
  temparatureCondition: {
    color: "#fff",
    fontSize: 22,

    marginTop: 5,
  },
});
