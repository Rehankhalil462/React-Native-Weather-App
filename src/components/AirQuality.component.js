import React from "react";
import { IconButton, Divider } from "react-native-paper";
import { StyleSheet, Text, View, Platform } from "react-native";

export const AirQualityComponent = ({ weather }) => {
  return (
    <View style={styles.hourlyWeatherContainer}>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>CO</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.co)} (μg/m3)
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>O3</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.o3)} (μg/m3)
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>NO2</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.no2)} (μg/m3)
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>SO2</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.so2)} (μg/m3)
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>PM 2.5</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.pm2_5)} (μg/m3)
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="air-filter" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>PM 10</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.current.air_quality.pm10)} (μg/m3)
          </Text>
        </View>
      </View>
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
  listDataContainer: {
    marginVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
  },
  iconandnamecontainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
  },
  valuecontainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  timeStamp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  precipitation: {
    color: "#fff",
  },
});
