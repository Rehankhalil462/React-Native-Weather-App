import React from "react";
import { IconButton, Divider } from "react-native-paper";
import { StyleSheet, Text, View, Platform } from "react-native";

export const DailyDataDetails = ({ weather }) => {
  return (
    <View style={styles.hourlyWeatherContainer}>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-sunset-up"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Sunrise</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].astro.sunrise}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-sunset-down"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Sunset</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].astro.sunset}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="white-balance-sunny"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Humidity</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.humidity}%</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="water-outline" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Precipitation</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.precip_in}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="directions" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Wind Direction</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.wind_dir}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="weather-windy" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Wind (kph)</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.wind_kph}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="weather-windy" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Wind (mph)</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.wind_mph}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-celsius"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Current Temparature </Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.temp_c}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-fahrenheit"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Current Temparature</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.temp_f}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-celsius"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Max Temparature </Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-celsius"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Min Temparature </Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.forecast.forecastday[0].day.mintemp_c)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-fahrenheit"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Max Temparature</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.forecast.forecastday[0].day.maxtemp_f)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-fahrenheit"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Min Temparature</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {Math.round(weather.forecast.forecastday[0].day.mintemp_f)}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-lightning-rainy"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Chances Of Rain</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="weather-snowy" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Chances Of Snow</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].day.daily_chance_of_snow}%
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-sunset-up"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Moonrise</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].astro.moonrise}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-sunset-down"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Moonset</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].astro.moonset}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-sunset-up"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Moon Phase</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>
            {weather.forecast.forecastday[0].astro.moon_phase}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-cloudy"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Clouds</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.cloud}%</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Divider style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton color="#fff" icon="weather-windy" style={{ margin: 0 }} />
          <Text style={styles.timeStamp}>Wind Gust (kph) </Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.gust_kph}</Text>
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
