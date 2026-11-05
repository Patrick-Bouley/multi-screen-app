/*
 * Account Screen
 *
 * Recreates the Crunchyroll profile/settings layout.
 *
 * useState stores temporary settings such as language
 * preferences, Profile Pin, and Closed Captions.
 *
 * These settings are for demonstration only. They are
 * not connected to real user accounts or video playback.
 */
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Switch, Text, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Account = () => {
  // Local state for the settings toggles.
  const [profilePin, setProfilePin] = useState(false);
  const [closedCaptions, setClosedCaptions] = useState(false);

  // Local state for the user's language preferences.
  const [audioLanguage, setAudioLanguage] = useState("English");
  const [subtitleLanguage, setSubtitleLanguage] = useState("English");
  const [contentRating, setContentRating] = useState("18+");

  // A simple selection dialog for choosing an audio language.
  const chooseAudioLanguage = () => {
    Alert.alert("Audio Language", "Choose a language", [
      { text: "English",
        onPress: () => setAudioLanguage("English"),
      },
      { text: "Japanese",
        onPress: () => setAudioLanguage("Japanese"),
      },
      { text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const chooseSubtitleLanguage = () => {
    Alert.alert("Subtitles/CC Language", "Choose a language", [
      { text: "English",
        onPress: () => setSubtitleLanguage("English"),
      },
      { text: "Japanese",
        onPress: () => setSubtitleLanguage("Japanese"),
      },
      { text: "Off",
        onPress: () => setSubtitleLanguage("Off"),
      },
      { text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const chooseContentRating = () => {
    Alert.alert("Content Restrictions", "Select a rating", [
      { text: "13+",
        onPress: () => setContentRating("13+"),
      },
      { text: "16+",
        onPress: () => setContentRating("16+"),
      },
      { text: "18+",
        onPress: () => setContentRating("18+"),
      },
      { text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile banner with an image behind the avatar */}
        <View style={styles.profileBanner}>
            {/* Absolute positioning makes the image fill the banner
                without affecting the layout of the profile information. */}
            <Image
                source={{
                uri: "https://picsum.photos/seed/anime-account/900/400",
                }}
                style={styles.bannerImage}/>

            {/* Profile picture with an edit icon in the corner */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Ionicons
                    name="person"
                    size={42}
                    color="#FFFFFF"
                    />
                </View>
                {/* Decorative edit icon - no functionality required */}
                <View style={styles.editIcon}>
                    <Ionicons
                    name="pencil"
                    size={14}
                    color="#000000"/>
                </View>
            </View>
            {/* Username displayed below the profile picture */}
            <Text style={styles.username}>Patrick Bouley</Text>
        </View>

        {/* Profile controls */}
        <Pressable
          style={styles.settingRow}
          onPress={() =>
            Alert.alert("Switch Profile", "No Other Profile Exists")
          }
        >
          <Text style={styles.settingText}>Switch Profile</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#AAAAAA"
          />
        </Pressable>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Profile Pin</Text>
          <Switch
            value={profilePin}
            onValueChange={setProfilePin}
            trackColor={{
              false: "#555555",
              true: "#FF640A",
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Settings grouped under the profile name */}
        <Text style={styles.sectionLabel}>Patrick Bouley</Text>

        <Pressable
          style={styles.settingRow}
          onPress={chooseContentRating}
        >
          <Text style={styles.settingText}>Content Restrictions</Text>
          <View style={styles.rowRight}>
            <Text style={styles.settingValue}>{contentRating}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#AAAAAA"
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.settingRow}
          onPress={chooseAudioLanguage}
        >
          <Text style={styles.settingText}>Audio Language</Text>
          <View style={styles.rowRight}>
            <Text style={styles.settingValue}>{audioLanguage}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#AAAAAA"
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.settingRow}
          onPress={() =>
            Alert.alert(
              "Audio Descriptions",
              "Audio description preferences."
            )
          }
        >
          <Text style={styles.settingText}>Audio Descriptions</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#AAAAAA"
          />
        </Pressable>

        <Pressable
          style={styles.settingRow}
          onPress={chooseSubtitleLanguage}
        >
          <Text style={styles.settingText}>
            Subtitles/CC Language
          </Text>
          <View style={styles.rowRight}>
            <Text style={styles.settingValue}>
              {subtitleLanguage}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#AAAAAA"
            />
          </View>
        </Pressable>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Closed Captions</Text>
          <Switch
            value={closedCaptions}
            onValueChange={setClosedCaptions}
            trackColor={{
              false: "#555555",
              true: "#FF640A",
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={styles.sectionLabel}>Membership</Text>

        <Pressable
          style={styles.settingRow}
          onPress={() =>
            Alert.alert(
              "Membership",
              "Membership information is not available."
            )
          }
        >
          <Text style={styles.settingText}>Membership Details</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#AAAAAA"
          />
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    profileBanner: {
        height: 290,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    bannerImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.5,
        resizeMode: "cover",
    },
    profileOverlay: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatarContainer: {
        position: "relative",
        paddingTop: 30,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#343434",
        justifyContent: "center",
        alignItems: "center",

    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#000000",
    },
    username: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    sectionLabel: {
        color: "#999999",
        fontSize: 13,
        marginTop: 20,
        marginHorizontal: 16,
        marginBottom: 4,
    },
    settingRow: {
        minHeight: 45,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#303030",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    settingText: {
        color: "#FFFFFF",
        fontSize: 14,
        flexShrink: 1,
    },
    settingValue: {
        color: "#AAAAAA",
        fontSize: 13,
    },
    rowRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginLeft: 12,
    },
});
