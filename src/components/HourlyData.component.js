import React from "react";
import { timeConvert } from "../../utilities/timeConvert";
import { IconButton } from "react-native-paper";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export const HourlyDataComponent = ({ weather }) => {
  const {
    forecast: { forecastday },
  } = weather;
  const hourlyData = forecastday[0].hour;

  return (
    <View style={styles.hourlyWeatherContainer}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={hourlyData}
        keyExtractor={(item) => Math.random()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              width: 100,

              height: 250,
            }}
          >
            <Text style={styles.timeStamp}>
              {timeConvert(item.time.split(" ")[1])}
            </Text>
            <Text style={styles.timeStamp}>{item.condition.text}</Text>
            <Image
              style={{ width: 60, height: 60 }}
              source={{
                uri: `https:${item.condition.icon}`,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton icon="water-outline" color="#fff" />

              <Text style={styles.precipitation}>{`${Math.round(
                item.precip_in
              )}%`}</Text>
            </View>
            <Text style={styles.timeStamp}>{`${Math.round(
              item.temp_c
            )}°`}</Text>
          </View>
        )}
      />
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
});
