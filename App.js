import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import React, { useState, useEffect } from "react";
import { Searchbar, List } from "react-native-paper";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [query, setQuery] = useState("");
  const getWeatherData = async (query = "Jhelum") => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3471dc80414141b9ac2222948222403&q=${query}&days=1&aqi=yes&alerts=no`
    );
    const data = await response.json();
    if (data.location) {
      setWeather(data);
      setHourlyData(data.forecast.forecastday[0].hour);
      // console.log(data.forecast.forecastday[0].hour);
      setIsLoading(false);
    } else {
      Alert.alert("Error", data.error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        style={styles.container}
        colors={["#5a69c9", "#34afaf"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {isLoading ? (
          <ActivityIndicator
            size={Platform.OS === "android" ? 80 : "large"}
            color="#34afaf"
            style={styles.weatherDetailsContainer}
          />
        ) : (
          <>
            <View style={styles.searchContainer}>
              <Searchbar
                value={query}
                onChangeText={(txt) => setQuery(txt)}
                onSubmitEditing={() => {
                  getWeatherData(query);
                  setIsLoading(true);
                }}
                onIconPress={() => {
                  getWeatherData(query);
                  setIsLoading(true);
                }}
                placeholder="Search Location"
              />

              <Text style={styles.locationName}>{weather.location.name}</Text>
              <Text style={styles.locationCountry}>
                {weather.location.country}
              </Text>

              <Text style={styles.weatherDateAndTime}>
                {weather.location.localtime}
              </Text>
            </View>

            <View style={styles.weatherDetailsContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ flex: 1 }}
              >
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
                  <Text
                    style={styles.feelslikeTemparature}
                  >{`Feels like ${Math.round(
                    weather.current.feelslike_c
                  )}°`}</Text>
                  <Text style={styles.temparatureCondition}>
                    {weather.current.condition.text}
                  </Text>
                </View>
                <Text style={styles.weatherTimeStampText}>Hourly</Text>
                <View style={styles.hourlyWeatherContainer}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={hourlyData}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                          width: 100,
                          height: 200,
                        }}
                      >
                        <Text style={styles.timeStamp}>
                          {item.time.split(" ")[1]}
                        </Text>
                        <Text style={styles.timeStamp}>
                          {item.condition.text}
                        </Text>
                        <Image
                          style={{ width: 60, height: 60 }}
                          source={{
                            uri: `https:${item.condition.icon}`,
                          }}
                        />
                        <Text style={styles.precipitation}>{`${Math.round(
                          item.precip_in
                        )}%`}</Text>
                        <Text style={styles.timeStamp}>{`${Math.round(
                          item.temp_c
                        )}°`}</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <Text style={styles.weatherTimeStampText}>Daily</Text>

                <View style={styles.hourlyWeatherContainer}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={hourlyData}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                          width: 100,
                          height: 200,
                        }}
                      >
                        <Text style={styles.timeStamp}>
                          {item.time.split(" ")[1]}
                        </Text>
                        <Text style={styles.timeStamp}>
                          {item.condition.text}
                        </Text>
                        <Image
                          style={{ width: 60, height: 60 }}
                          source={{
                            uri: `https:${item.condition.icon}`,
                          }}
                        />
                        <Text style={styles.precipitation}>{`${Math.round(
                          item.precip_in
                        )}%`}</Text>
                        <Text style={styles.timeStamp}>{`${Math.round(
                          item.temp_c
                        )}°`}</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <View style={styles.hourlyWeatherContainer}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={hourlyData}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                          width: 100,
                          height: 200,
                        }}
                      >
                        <Text style={styles.timeStamp}>
                          {item.time.split(" ")[1]}
                        </Text>
                        <Text style={styles.timeStamp}>
                          {item.condition.text}
                        </Text>
                        <Image
                          style={{ width: 60, height: 60 }}
                          source={{
                            uri: `https:${item.condition.icon}`,
                          }}
                        />
                        <Text style={styles.precipitation}>{`${Math.round(
                          item.precip_in
                        )}%`}</Text>
                        <Text style={styles.timeStamp}>{`${Math.round(
                          item.temp_c
                        )}°`}</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </ScrollView>
            </View>
          </>
        )}
        <ExpoStatusBar style="light" />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainer: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,
    padding: 15,
    flex: 0.23,
    // backgroundColor: "black",
  },
  locationName: {
    fontSize: 35,
    color: "#fff",
    marginTop: 15,
  },
  locationCountry: {
    fontSize: 15,
    color: "#fff",
  },
  weatherDateAndTime: {
    fontSize: 20,
    marginTop: 5,
    color: "#fff",
    opacity: 0.7,
  },

  weatherDetailsContainer: {
    flex: 0.77,
    // backgroundColor: "pink",
  },
  temparatureDetailContainer: {
    // backgroundColor: "grey",
    alignItems: "center",
  },
  temparatureValueandIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temparature: {
    marginTop: 15,
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
  weatherTimeStampText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    margin: 5,
    paddingLeft: 15,
  },
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
