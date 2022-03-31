import React from "react";
import { IconButton, Divider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-celsius"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Temparature </Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.temp_c}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="temperature-fahrenheit"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Temparature</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.temp_f}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
      </View>
      <View style={styles.listDataContainer}>
        <View style={styles.iconandnamecontainer}>
          <IconButton
            color="#fff"
            icon="weather-partly-cloudy"
            style={{ margin: 0 }}
          />
          <Text style={styles.timeStamp}>Clouds</Text>
        </View>
        <View style={styles.valuecontainer}>
          <Text style={styles.timeStamp}>{weather.current.cloud}%</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <Divider style={{ height: 2, backgroundColor: "#fff" }} />
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
