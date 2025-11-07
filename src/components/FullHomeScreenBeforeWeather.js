import React, { useState } from "react";
import { StyleSheet, Text, View, Image, StatusBar, Platform, TouchableOpacity } from "react-native";
import { Searchbar, IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AutocompleteComponent } from "./Autocomplete.component";

export const FullHomeScreenBeforeWeather = ({
  getWeatherData,
  setIsLoading,
  query,
  setQuery,
  onOpenSavedLocations,
  onOpenSearchHistory,
}) => {
  const insets = useSafeAreaInsets();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.mainScreenBeforeWeatherDataSearchContainer}>
        <View style={[styles.searchBarRow,{paddingTop:insets.top+8}]}>
          <View style={[styles.searchBarWrapper, { flex: 1, marginRight: 10 }]}>
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
                setTimeout(() => setShowAutocomplete(false), 200);
              }}
              placeholder="Search Location"
              style={styles.searchBar}
              inputStyle={styles.searchBarInput}
              iconColor="#fff"
              placeholderTextColor="rgba(255,255,255,0.7)"
            />
          </View>
          {onOpenSearchHistory && (
            <TouchableOpacity
              style={styles.historyButton}
              onPress={onOpenSearchHistory}
            >
              <IconButton
                icon="history"
                iconColor="#fff"
                size={24}
                style={{ margin: 0 }}
              />
            </TouchableOpacity>
          )}
          {onOpenSavedLocations && (
            <TouchableOpacity
              style={styles.locationsButton}
              onPress={onOpenSavedLocations}
            >
              <IconButton
                icon="bookmark-multiple"
                iconColor="#fff"
                size={24}
                style={{ margin: 0 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.mainScreenBeforeWeatherDataTextContainer}>
        <Image
          source={require("../../assets/Weathers/weather.png")}
          style={styles.weatherImage}
        />
        <Text style={styles.welcomeText}>
          Weather Forecast
        </Text>
        <Text style={styles.subtitleText}>
          Search for any location to get started
        </Text>
      </View>
      <View style={[styles.autocompleteWrapper, { top: insets.top + 70 }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  mainScreenBeforeWeatherDataSearchContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBarWrapper: {
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
  mainScreenBeforeWeatherDataTextContainer: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  weatherImage: {
    width: 240,
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 38,
    color: "#fff",
    marginTop: 10,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 12,
    opacity: 0.85,
    fontWeight: "400",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  autocompleteWrapper: {
    position: "absolute",
    left: 10,
    right: 10,
    zIndex: 1000,
  },
});
