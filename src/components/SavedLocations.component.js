import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { IconButton, Divider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SavedLocationsComponent = ({
  visible,
  onClose,
  onSelectLocation,
  currentLocation,
  getWeatherData,
  setIsLoading,
}) => {
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    loadSavedLocations();
  }, [visible]);

  const loadSavedLocations = async () => {
    try {
      const locations = await AsyncStorage.getItem("savedLocations");
      if (locations) {
        setSavedLocations(JSON.parse(locations));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveLocation = async () => {
    if (!currentLocation) return;
    
    try {
      const locationKey = `${currentLocation.name}, ${currentLocation.country}`;
      const existingLocations = savedLocations || [];
      
      // Check if location already exists
      const exists = existingLocations.some(
        (loc) => loc.name === currentLocation.name && loc.country === currentLocation.country
      );
      
      if (exists) {
        return; // Already saved
      }

      const newLocation = {
        name: currentLocation.name,
        country: currentLocation.country,
        key: locationKey,
      };

      const updatedLocations = [...existingLocations, newLocation];
      await AsyncStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
      setSavedLocations(updatedLocations);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteLocation = async (locationToDelete) => {
    try {
      const updatedLocations = savedLocations.filter(
        (loc) => !(loc.name === locationToDelete.name && loc.country === locationToDelete.country)
      );
      await AsyncStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
      setSavedLocations(updatedLocations);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectLocation = (location) => {
    onSelectLocation(location.name);
    onClose();
  };

  const isCurrentLocationSaved = () => {
    if (!currentLocation) return false;
    return savedLocations.some(
      (loc) => loc.name === currentLocation.name && loc.country === currentLocation.country
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={["rgba(102, 126, 234, 0.95)", "rgba(118, 75, 162, 0.95)", "rgba(240, 147, 251, 0.95)"]}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Saved Locations</Text>
            <IconButton
              icon="close"
              iconColor="#fff"
              size={24}
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>

          {currentLocation && !isCurrentLocationSaved() && (
            <TouchableOpacity
              style={styles.addCurrentButton}
              onPress={saveLocation}
            >
              <IconButton icon="plus" iconColor="#fff" size={20} style={{ margin: 0 }} />
              <Text style={styles.addCurrentText}>
                Add {currentLocation.name}, {currentLocation.country}
              </Text>
            </TouchableOpacity>
          )}

          <FlatList
            data={savedLocations}
            keyExtractor={(item, index) => `${item.name}-${item.country}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.locationItem}>
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() => handleSelectLocation(item)}
                >
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationCountry}>{item.country}</Text>
                  </View>
                  <IconButton
                    icon="chevron-right"
                    iconColor="#fff"
                    size={20}
                    style={{ margin: 0 }}
                  />
                </TouchableOpacity>
                <IconButton
                  icon="delete-outline"
                  iconColor="#fff"
                  size={22}
                  onPress={() => deleteLocation(item)}
                  style={styles.deleteButton}
                />
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No saved locations</Text>
                <Text style={styles.emptySubtext}>
                  Add your current location to get started
                </Text>
              </View>
            }
            ItemSeparatorComponent={() => (
              <Divider style={styles.divider} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    flex: 0.85,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    }),
    ...(Platform.OS === "android" && {
      elevation: 0,
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  closeButton: {
    margin: 0,
  },
  addCurrentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  addCurrentText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  locationButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationCountry: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    fontWeight: "500",
  },
  deleteButton: {
    margin: 0,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    opacity: 0.9,
  },
  emptySubtext: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
  },
});

