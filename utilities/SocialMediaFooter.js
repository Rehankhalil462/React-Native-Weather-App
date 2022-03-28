import React from "react";
import { Linking, TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const socialMediaHandler = (link) => {
  Linking.openURL(link);
};

export const SocialMediaFooter = () => (
  <View style={styles.socialMediaIconsContainer}>
    <TouchableOpacity
      onPress={() =>
        socialMediaHandler(
          "https://www.youtube.com/devtechcare?sub_confirmation=1"
        )
      }
    >
      <Avatar.Icon icon="youtube" style={{ backgroundColor: "#c4302b" }} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => socialMediaHandler("https://www.facebook.com/devtechcare")}
    >
      <Avatar.Icon icon="facebook" style={{ backgroundColor: "#3b5998" }} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => socialMediaHandler("https://github.com/rehankhalil462")}
    >
      <Avatar.Icon
        icon="github"
        color="white"
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
        color="white"
        style={{ backgroundColor: "#0e76a8" }}
      />
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  socialMediaIconsContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
