import React from "react";
import {
  Linking,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Avatar } from "react-native-paper";

const socialMediaHandler = (link) => {
  Linking.openURL(link);
};

export const PoweredByComponent = ({ textToShow, nameToShow, siteURL }) => (
  <View style={styles.poweredByContainer}>
    <TouchableOpacity
      style={styles.linkandnamecontainer}
      onPress={() => socialMediaHandler(siteURL)}
    >
      <Text style={styles.texttoshow}>{textToShow}</Text>
      <Text style={styles.nametoshow}>{nameToShow}</Text>
    </TouchableOpacity>
  </View>
);

export const FollowUsComponent = () => (
  <View style={styles.poweredByContainer}>
    <View style={styles.socialmediaiconscontainer}>
      <Text style={styles.texttoshow}>Follow Us On :</Text>

      <TouchableOpacity
        onPress={() =>
          socialMediaHandler(
            "https://www.youtube.com/devtechcare?sub_confirmation=1"
          )
        }
      >
        <Avatar.Icon
          icon="youtube"
          size={50}
          style={{ backgroundColor: "#c4302b" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          socialMediaHandler("https://www.facebook.com/devtechcare")
        }
      >
        <Avatar.Icon
          icon="facebook"
          size={50}
          style={{ backgroundColor: "#3b5998" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => socialMediaHandler("https://github.com/rehankhalil462")}
      >
        <Avatar.Icon
          icon="github"
          size={50}
          style={{ backgroundColor: "black" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          socialMediaHandler("https://pk.linkedin.com/in/devtechcare")
        }
      >
        <Avatar.Icon
          icon="linkedin"
          size={50}
          style={{ backgroundColor: "#0e76a8" }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  poweredByContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  linkandnamecontainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  socialmediaiconscontainer: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  texttoshow: {
    opacity: 0.9,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  nametoshow: {
    opacity: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 5,
  },
});
