import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function () {
  const collection = useLocalSearchParams();
  return (
    <View>
      <Text>{collection.name}</Text>
    </View>
  );
}
