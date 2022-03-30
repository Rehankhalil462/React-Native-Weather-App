import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export const DailyDataComponent = ({ weather }) => {
  const {
    forecast: { forecastday },
  } = weather;
  return (
    <View style={styles.hourlyWeatherContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={forecastday}
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
            <Text style={styles.timeStamp}>{item.date}</Text>
            <Text style={styles.timeStamp}>{item.day.condition.text}</Text>
            <Image
              style={{ width: 60, height: 60 }}
              source={{
                uri: `https:${item.day.condition.icon}`,
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
                item.day.totalprecip_in
              )}%`}</Text>
            </View>

            <Text style={styles.timeStamp}>
              {`${Math.round(item.day.maxtemp_c)}°`}/
              {`${Math.round(item.day.mintemp_c)}°`}
            </Text>
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
