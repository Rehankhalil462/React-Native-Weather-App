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
    backgroundColor: "#6CB4EE",
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  linkandnamecontainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  socialmediaiconscontainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  texttoshow: {
    opacity: 0.8,
    color: "#fff",
    fontSize: 20,
  },
  nametoshow: {
    opacity: 0.8,
    color: "#00008B",
    fontSize: 20,
    fontWeight: "bold",
  },
});
