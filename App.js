import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { timeConvert } from "./utilities/timeConvert";
import { Searchbar, Divider } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  ScrollView,
  BackHandler,
  Alert,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  rainConditions,
  snowConditions,
  thunderConditions,
  possibleWeatherConditions,
} from "./utilities/weatherConditions";

import { HourlyDataComponent } from "./src/components/HourlyData.component";
import { PrecipitationandUVComponent } from "./src/components/PrecipitationandUV.component";
import { TemparatureDetailComponent } from "./src/components/TemparatureDetail.component";
import { LastUpdatedComponent } from "./src/components/LastUpdated.component";
import { DailyDataComponent } from "./src/components/DailyData.component";

import { FullHomeScreenBeforeWeather } from "./src/components/FullHomeScreenBeforeWeather";
import { DailyDataDetails } from "./src/components/DailyDataDetails.component";
import { AirQualityComponent } from "./src/components/AirQuality.component";
import {
  FollowUsComponent,
  PoweredByComponent,
} from "./src/components/PoweredBy.component";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [isDay, setIsDay] = useState(null);
  const [condition, setCondition] = useState("");

  const getWeatherData = async (query) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3471dc80414141b9ac2222948222403&q=${query}&days=7&aqi=yes&alerts=no`
    );
    const data = await response.json();
    if (data.location) {
      setIsDay(data.current.is_day);
      setCondition(data.current.condition.text);
      setWeather(data);

      setIsLoading(false);
    } else if (data.error.code === 1003) {
      Alert.alert("Error", "Please enter a location !");
      setIsLoading(false);
    } else {
      Alert.alert("Error", data.error.message);
      setIsLoading(false);
    }
  };

  const loadWeatherHistory = async () => {
    try {
      const weatherData_A = await AsyncStorage.getItem("weatherHistory");
      const isDay_A = await AsyncStorage.getItem("isDay");
      const condition_A = await AsyncStorage.getItem("condition");
      const query_A = await AsyncStorage.getItem("query");
      if (
        weatherData_A &&
        JSON.parse(weatherData_A).hasOwnProperty("location")
      ) {
        setIsLoading(true);
        setIsDay(JSON.parse(isDay_A));
        setCondition(JSON.parse(condition_A));
        setQuery(JSON.parse(query_A));
        setWeather(JSON.parse(weatherData_A));
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveWeatherHistory = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("isDay", JSON.stringify(isDay));
      await AsyncStorage.setItem("condition", JSON.stringify(condition));
      await AsyncStorage.setItem("query", JSON.stringify(query));
      await AsyncStorage.setItem("weatherHistory", JSON.stringify(weather));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const showToast = () => {
    ToastAndroid.show(
      "Weather is restored from last search !",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    getWeatherData(weather.location.name);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const backAction = () => {
    Alert.alert("Hold on !", "Are you sure you want to close this app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    loadWeatherHistory();
    showToast();

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    saveWeatherHistory();
  }, [weather]);

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
        ) : weather.location ? (
          <>
            <View style={styles.searchplusbackgroundimagecontainer}>
              <ImageBackground
                opacity={0.7}
                style={{ flex: 1, resizeMode: "cover" }}
                source={
                  (condition === "Clear" || condition === "Sunny") &&
                  isDay === 1
                    ? require("./assets/Weathers/DayClear-min.jpg")
                    : condition === "Clear" && isDay === 0
                    ? require("./assets/Weathers/NightClear-min.jpg")
                    : (condition === "Partly cloudy" ||
                        condition === "Cloudy") &&
                      isDay === 1
                    ? require("./assets/Weathers/DayPartlyCloudy-min.jpg")
                    : (condition === "Partly cloudy" ||
                        condition === "Cloudy") &&
                      isDay === 0
                    ? require("./assets/Weathers/NightCloudy-min.jpg")
                    : condition === "Overcast" && isDay === 1
                    ? require("./assets/Weathers/DayOvercast-min.jpg")
                    : condition === "Overcast" && isDay === 0
                    ? require("./assets/Weathers/NightOvercast-min.jpg")
                    : condition === "Mist"
                    ? require("./assets/Weathers/DayMist-min.jpg")
                    : condition === "Blizzard"
                    ? require("./assets/Weathers/Blizzard-min.jpg")
                    : condition === "Fog" || condition === "Freezing fog"
                    ? require("./assets/Weathers/Fog-min.jpg")
                    : rainConditions.includes(condition)
                    ? require("./assets/Weathers/Rain-min.jpg")
                    : snowConditions.includes(condition)
                    ? require("./assets/Weathers/DaySnow-min.jpg")
                    : thunderConditions.includes(condition)
                    ? require("./assets/Weathers/Thunder-min.jpg")
                    : possibleWeatherConditions.includes(condition)
                    ? require("./assets/Weathers/PossibleOvercast-min.jpg")
                    : null
                }
              >
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
                  <Text style={styles.locationName}>
                    {weather.location.name}
                  </Text>
                  <Text style={styles.locationCountry}>
                    {weather.location.country}
                  </Text>

                  <Text style={styles.weatherDateAndTime}>
                    {`${weather.location.localtime.split(" ")[0]} ${timeConvert(
                      weather.location.localtime.split(" ")[1]
                    )}`}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.weatherDetailsContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ flex: 1 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#fff"]}
                    progressBackgroundColor="#34afaf"
                    tintColor="#34afaf"
                    title="Refresh"
                    titleColor="#34afaf"
                    enabled={true}
                  />
                }
              >
                <TemparatureDetailComponent weather={weather} />
                <LastUpdatedComponent
                  weather={weather}
                  getWeatherData={getWeatherData}
                  setIsLoading={setIsLoading}
                  query={query}
                />
                <PrecipitationandUVComponent weather={weather} />

                <Text style={styles.weatherTimeStampText}>Hourly</Text>
                <HourlyDataComponent weather={weather} />

                <Text style={styles.weatherTimeStampText}>Daily</Text>
                <DailyDataComponent weather={weather} />
                <Text style={styles.weatherTimeStampText}>Details</Text>

                <DailyDataDetails weather={weather} />
                <Text style={styles.weatherTimeStampText}>Air Quality</Text>

                <AirQualityComponent weather={weather} />
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 10,
                  }}
                >
                  <Divider style={{ height: 2, backgroundColor: "#fff" }} />
                </View>
                <PoweredByComponent
                  textToShow={"Developed By : "}
                  nameToShow={"Rehan Khalil"}
                  siteURL={"https://rehankhalilportfolio.netlify.app"}
                />
                <PoweredByComponent
                  textToShow={"Data Provided By  : "}
                  nameToShow={"WeatherAPI.com"}
                  siteURL={"https://www.weatherapi.com"}
                />
                <FollowUsComponent />
              </ScrollView>
            </View>
          </>
        ) : (
          <FullHomeScreenBeforeWeather
            getWeatherData={getWeatherData}
            query={query}
            setQuery={setQuery}
            setIsLoading={setIsLoading}
          />
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

  searchplusbackgroundimagecontainer: {
    flex: 0.3,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,
    padding: 15,
    flex: 1,
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
    flex: 0.7,
    // backgroundColor: "pink",
  },
  searchplusbackgroundimagecontainer: {
    flex: 0.3,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,
    padding: 15,
    flex: 1,
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
  mainScreenBeforeWeatherDataSearchContainer: {
    flex: 0.3,
    padding: 15,
    alignItems: "center",
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,
  },
  mainScreenBeforeWeatherDataTextContainer: {
    flex: 0.6,
    alignItems: "center",
  },
});
