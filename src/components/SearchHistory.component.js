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

export const SearchHistoryComponent = ({
  visible,
  onClose,
  onSelectLocation,
  onClearHistory,
}) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (visible) {
      loadSearchHistory();
    }
  }, [visible]);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory([]);
      if (onClearHistory) {
        onClearHistory();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromHistory = async (locationToRemove) => {
    try {
      const updatedHistory = searchHistory.filter(
        (item) => item !== locationToRemove
      );
      await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectLocation = (location) => {
    onSelectLocation(location);
    onClose();
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
            <Text style={styles.modalTitle}>Recent Searches</Text>
            <View style={styles.headerActions}>
              {searchHistory.length > 0 && (
                <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              )}
              <IconButton
                icon="close"
                iconColor="#fff"
                size={24}
                onPress={onClose}
                style={styles.closeButton}
              />
            </View>
          </View>

          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => handleSelectLocation(item)}
              >
                <View style={styles.historyItemContent}>
                  <IconButton
                    icon="clock-outline"
                    iconColor="#fff"
                    size={20}
                    style={{ margin: 0, marginRight: 8 }}
                  />
                  <Text style={styles.historyItemText}>{item}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromHistory(item)}
                  style={styles.deleteButton}
                >
                  <IconButton
                    icon="close-circle-outline"
                    iconColor="rgba(255,255,255,0.7)"
                    size={20}
                    style={{ margin: 0 }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <IconButton
                  icon="history"
                  iconColor="rgba(255,255,255,0.5)"
                  size={60}
                  style={{ margin: 0 }}
                />
                <Text style={styles.emptyText}>No search history</Text>
                <Text style={styles.emptySubtext}>
                  Your recent searches will appear here
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
    flex: 0.7,
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    margin: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  historyItemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  historyItemText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
  },
  deleteButton: {
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    opacity: 0.9,
  },
  emptySubtext: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.7,
    marginTop: 8,
    textAlign: "center",
  },
});

