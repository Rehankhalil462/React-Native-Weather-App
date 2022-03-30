import React from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { SocialMediaFooter } from "../../utilities/SocialMediaFooter";

export const FullHomeScreenBeforeWeather = ({
  getWeatherData,
  setIsLoading,
  query,
  setQuery,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainScreenBeforeWeatherDataSearchContainer}>
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
      </View>
      <View style={styles.mainScreenBeforeWeatherDataTextContainer}>
        <Image
          source={require("../../assets/Weathers/weather.png")}
          style={{ width: 220, height: 150, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 35, color: "#fff", marginTop: 15 }}>
          A Minimal Weather App
        </Text>
      </View>
      <SocialMediaFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
