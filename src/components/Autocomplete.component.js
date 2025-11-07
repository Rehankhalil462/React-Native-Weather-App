import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY ;

export const AutocompleteComponent = ({
  query,
  visible,
  onSelectLocation,
  onClose,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If query is empty or too short, clear suggestions
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Debounce API call
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setSuggestions(data.slice(0, 8)); // Limit to 8 suggestions
        } else {
          setSuggestions([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Autocomplete error:", error);
        setSuggestions([]);
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleSelectLocation = (location) => {
    const locationQuery = `${location.name}, ${location.region}, ${location.country}`;
    onSelectLocation(locationQuery);
    setSuggestions([]);
    onClose();
  };

  if (!visible || (!isLoading && suggestions.length === 0 && (!query || query.trim().length < 2))) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(102, 126, 234, 0.98)", "rgba(118, 75, 162, 0.98)", "rgba(240, 147, 251, 0.98)"]}
        style={styles.suggestionsContainer}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${item.id || index}-${item.name}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectLocation(item)}
              >
                <View style={styles.suggestionContent}>
                  <IconButton
                    icon="map-marker"
                    iconColor="#fff"
                    size={20}
                    style={{ margin: 0, marginRight: 12 }}
                  />
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationDetails}>
                      {item.region && `${item.region}, `}
                      {item.country}
                    </Text>
                  </View>
                </View>
                <IconButton
                  icon="chevron-right"
                  iconColor="rgba(255,255,255,0.6)"
                  size={20}
                  style={{ margin: 0 }}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
          />
        ) : query && query.trim().length >= 2 ? (
          <View style={styles.emptyContainer}>
            <IconButton
              icon="map-search-outline"
              iconColor="rgba(255,255,255,0.5)"
              size={40}
              style={{ margin: 0 }}
            />
            <Text style={styles.emptyText}>No locations found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 999,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
  },
  suggestionsContainer: {
    borderRadius: 20,
    maxHeight: 400,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
  list: {
    maxHeight: 400,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  suggestionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationDetails: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    opacity: 0.9,
  },
  emptySubtext: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
  },
});

