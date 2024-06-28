import GradientItem from "@/components/GradientItem";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  Button,
  TouchableOpacity,
  View,
} from "react-native";

type GradientDirection =
  | "topToBottom"
  | "bottomToTop"
  | "leftToRight"
  | "rightToLeft";

interface GradientDirections {
  [key: string]: {
    start: LinearGradientPoint;
    end: LinearGradientPoint;
  };
}

const gradientDirections: GradientDirections = {
  topToBottom: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  bottomToTop: { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
  leftToRight: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  rightToLeft: { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
};
export default function GradientDetails() {
  const [direction, setDirection] = useState<GradientDirection>("topToBottom");

  const params = useLocalSearchParams<{
    gradientName: string;
    colors: string;
  }>();

  if (!params.gradientName || !params.colors)
    return <Redirect href={"+not-found"} />;

  return (
    <>
      <Stack.Screen
        options={{
          title: params.gradientName,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={params.colors.split(",")}
          start={gradientDirections[direction].start}
          end={gradientDirections[direction].end}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            position: "absolute",
            bottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 12,
              alignSelf: "center",
            }}
          >
            <ThemedText>{direction}</ThemedText>
            <ThemedText>{params.colors.replace(",", " - ")}</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity onPress={() => setDirection("topToBottom")}>
              <Ionicons name="chevron-down-circle" size={40} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDirection("bottomToTop")}>
              <Ionicons name="chevron-up-circle" size={40} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDirection("leftToRight")}>
              <Ionicons
                name="chevron-forward-circle"
                size={40}
                color={"white"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDirection("rightToLeft")}>
              <Ionicons name="chevron-back-circle" size={40} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS == "ios" ? 150 : 0,
  },
  row: {
    flexDirection: "row",
  },
});
