import React, { useState, useEffect, useCallback } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { timeConvert } from "./utilities/timeConvert";
import { Searchbar, Divider, IconButton } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Platform,
  StatusBar,
  ToastAndroid,
  ScrollView,
  BackHandler,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
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
import { SavedLocationsComponent } from "./src/components/SavedLocations.component";
import { SearchHistoryComponent } from "./src/components/SearchHistory.component";
import { AutocompleteComponent } from "./src/components/Autocomplete.component";

function AppContent() {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [isDay, setIsDay] = useState(null);
  const [condition, setCondition] = useState("");
  const [savedLocationsVisible, setSavedLocationsVisible] = useState(false);
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const insets = useSafeAreaInsets();
  const saveToSearchHistory = async (locationName) => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      const historyArray = history ? JSON.parse(history) : [];
      
      // Remove if already exists
      const filteredHistory = historyArray.filter(item => item !== locationName);
      
      // Add to beginning
      const updatedHistory = [locationName, ...filteredHistory].slice(0, 10); // Keep last 10
      
      await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const getWeatherData = async (query) => {
    if (!query || query.trim() === "") {
      Alert.alert("Error", "Please enter a location !");
      return;
    }
    setIsLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY ;
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes&alerts=no`
      );
      const data = await response.json();
      if (data.location) {
        setIsDay(data.current.is_day);
        setCondition(data.current.condition.text);
        setWeather(data);
        const locationName = data.location.name;
        setQuery(locationName);
        await saveToSearchHistory(locationName);
        setIsLoading(false);
      } else if (data.error) {
        if (data.error.code === 1003) {
          Alert.alert("Error", "Please enter a location !");
        } else {
          Alert.alert("Error", data.error.message || "Failed to fetch weather data");
        }
        setIsLoading(false);
      } else {
        Alert.alert("Error", "Failed to fetch weather data");
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data");
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

  const backAction = useCallback(() => {
    // If weather data is loaded, go back to home screen
    if (weather.location) {
      setWeather({});
      setQuery("");
      setIsDay(null);
      setCondition("");
      return true;
    }
    // If on home screen, ask to close app
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
  }, [weather]);
  useEffect(() => {
    loadWeatherHistory();
    showToast();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [weather]);

  useEffect(() => {
    saveWeatherHistory();
  }, [weather]);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={[]}>
      <LinearGradient
        style={styles.container}
        colors={["#667eea", "#764ba2", "#f093fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size={Platform.OS === "android" ? 80 : "large"}
              color="#fff"
            />
          </View>
        ) : weather.location ? (
          <>
            <View style={[styles.fixedSearchBar, { paddingTop: insets.top + 8 }]}>
              <View style={styles.searchBarRow}>
                      <View style={[styles.searchBarContainer, { flex: 1, marginRight: 10 }]}>
                        <Searchbar
                          value={query}
                          onChangeText={(txt) => {
                            setQuery(txt);
                            if (txt && txt.trim().length >= 2) {
                              setShowAutocomplete(true);
                            } else {
                              setShowAutocomplete(false);
                            }
                          }}
                          onSubmitEditing={() => {
                            if (query && query.trim() !== "") {
                              setShowAutocomplete(false);
                              getWeatherData(query);
                            }
                          }}
                          onIconPress={() => {
                            if (query && query.trim() !== "") {
                              setShowAutocomplete(false);
                              getWeatherData(query);
                            }
                          }}
                          onFocus={() => {
                            if (query && query.trim().length >= 2) {
                              setShowAutocomplete(true);
                            }
                          }}
                          onBlur={() => {
                            // Delay to allow tap on suggestion
                            setTimeout(() => setShowAutocomplete(false), 200);
                          }}
                          placeholder="Search Location"
                          style={styles.searchBar}
                          inputStyle={styles.searchBarInput}
                          iconColor="#fff"
                          placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.historyButton}
                        onPress={() => setSearchHistoryVisible(true)}
                      >
                        <IconButton
                          icon="history"
                          iconColor="#fff"
                          size={24}
                          style={{ margin: 0 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.locationsButton}
                        onPress={() => setSavedLocationsVisible(true)}
                      >
                        <IconButton
                          icon="bookmark-multiple"
                          iconColor="#fff"
                          size={24}
                          style={{ margin: 0 }}
                        />
                      </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#fff"]}
                  progressBackgroundColor="rgba(255,255,255,0.3)"
                  tintColor="#fff"
                  title="Pull to refresh"
                  titleColor="#fff"
                  enabled={true}
                />
              }
            >
              <View style={styles.searchplusbackgroundimagecontainer}>
                <ImageBackground
                  style={styles.backgroundImage}
                  imageStyle={styles.backgroundImageStyle}
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
                  <LinearGradient
                    colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.5)"]}
                    style={styles.overlayGradient}
                  >
                    <View style={styles.searchContainer}>
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
                  </LinearGradient>
                </ImageBackground>
              </View>

              <TemparatureDetailComponent weather={weather} />
              <LastUpdatedComponent
                weather={weather}
                getWeatherData={getWeatherData}
                setIsLoading={setIsLoading}
                query={query}
              />
              <PrecipitationandUVComponent weather={weather} />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Hourly Forecast</Text>
              </View>
              <HourlyDataComponent weather={weather} />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Daily Forecast</Text>
              </View>
              <DailyDataComponent weather={weather} />
              
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Weather Details</Text>
              </View>
              <DailyDataDetails weather={weather} />
              
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Air Quality</Text>
              </View>
              <AirQualityComponent weather={weather} />
              
              <View style={styles.footerDivider}>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.appVersionContainer}>
                <Text style={styles.appVersionText}>Version 0.0.2</Text>
              </View>
            </ScrollView>
          </>
        ) : (
          <FullHomeScreenBeforeWeather
            getWeatherData={getWeatherData}
            query={query}
            setQuery={setQuery}
            setIsLoading={setIsLoading}
            onOpenSavedLocations={() => setSavedLocationsVisible(true)}
            onOpenSearchHistory={() => setSearchHistoryVisible(true)}
          />
        )}
        <SavedLocationsComponent
          visible={savedLocationsVisible}
          onClose={() => setSavedLocationsVisible(false)}
          onSelectLocation={(locationName) => {
            getWeatherData(locationName);
          }}
          currentLocation={weather.location || null}
          getWeatherData={getWeatherData}
          setIsLoading={setIsLoading}
        />
        <SearchHistoryComponent
          visible={searchHistoryVisible}
          onClose={() => setSearchHistoryVisible(false)}
          onSelectLocation={(locationName) => {
            getWeatherData(locationName);
            setQuery(locationName);
          }}
        />
        {weather.location && (
          <View style={[styles.autocompleteWrapper, { top: insets.top+ 70 }]}>
            <AutocompleteComponent
              query={query}
              visible={showAutocomplete}
              onSelectLocation={(locationQuery) => {
                getWeatherData(locationQuery);
                setQuery(locationQuery);
                setShowAutocomplete(false);
              }}
              onClose={() => setShowAutocomplete(false)}
            />
          </View>
        )}
        <ExpoStatusBar style="light" />
      </LinearGradient>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fixedSearchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 10,
    paddingBottom: 12,
    backgroundColor: "transparent",
  },
  searchplusbackgroundimagecontainer: {
    overflow: "hidden",
    marginTop: 0,
    height: 280,


  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImageStyle: {
    opacity: 0.8,
  },
  overlayGradient: {
    flex: 1,
    justifyContent: "flex-start",
  },
  searchContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  searchBarContainer: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
  },
  historyButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginRight: 10,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
  },
  locationsButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
  },
  searchBar: {
    backgroundColor: "transparent",
    elevation: 0,
    borderRadius: 15,
  },
  searchBarInput: {
    color: "#fff",
  },
  locationName: {
    fontSize: 42,
    color: "#fff",
    marginTop: 10,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  locationCountry: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
    opacity: 0.9,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  weatherDateAndTime: {
    fontSize: 16,
    marginTop: 8,
    color: "#fff",
    opacity: 0.85,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footerDivider: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  appVersionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  appVersionText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  autocompleteWrapper: {
    position: "absolute",
    left: 10,
    right: 10,
    zIndex: 1000,
  },
});
