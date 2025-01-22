import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function PetSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 10,
        flex: 1,
      }}
    >
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View>
        <Text style={{ fontFamily: "outfit-regular", fontSize: 16 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
