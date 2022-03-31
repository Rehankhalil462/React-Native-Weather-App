import React from "react";
import { IconButton, Divider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { validateStyleProp } from "react-native/Libraries/StyleSheet/StyleSheetValidation";

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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
    backgroundColor: "#6CB4EE",
    borderRadius: 25,
    paddingTop: 10,
    marginBottom: 10,
  },
  listDataContainer: {
    marginVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,

    width: "100%",
  },
  iconandnamecontainer: {
    alignItems: "center",
    flexDirection: "row",

    justifyContent: "space-between",
  },
  valuecontainer: {},
  timeStamp: {
    color: "#fff",
    fontSize: 18,
  },
  precipitation: {
    color: "#fff",
  },
});
