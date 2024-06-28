import { StyleSheet, ScrollView, View, Platform } from "react-native";

import { gradients } from "@/gradients";
import GradientItem from "@/components/GradientItem";

export default function HomeScreen() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {gradients.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(({ name, colors }, index) => (
              <GradientItem
                key={index}
                colors={[colors[0], colors[1]]}
                gradientName={name}
                // style={StyleSheet.absoluteFill}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 130 : 0,
  },
  row: {
    flexDirection: "row",
  },
});
