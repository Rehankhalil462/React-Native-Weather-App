import React from "react";
import { timeConvert } from "../../utilities/timeConvert";
import { IconButton } from "react-native-paper";
import { StyleSheet, Text, View, FlatList, Image, Platform } from "react-native";

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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              width: 95,
              height: 240,
              marginHorizontal: 4,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <Text style={styles.timeStamp}>
              {timeConvert(item.time.split(" ")[1])}
            </Text>
            <Text 
              style={[styles.timeStamp, { fontSize: 11, opacity: 0.9 }]}
              numberOfLines={2}
            >
              {item.condition.text}
            </Text>
            <Image
              style={{ width: 55, height: 55, marginVertical: 8 }}
              source={{
                uri: `https:${item.condition.icon}`,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton 
                icon="water-outline" 
                color="#fff" 
                size={18}
                style={{ margin: 0 }}
              />
              <Text style={styles.precipitation}>{`${Math.round(
                item.precip_in
              )}%`}</Text>
            </View>
            <Text style={[styles.timeStamp, { fontSize: 18, fontWeight: "600" }]}>{`${Math.round(
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingVertical: 15,
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
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 4,
  },
  precipitation: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
