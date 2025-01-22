import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontFamily: "outfit-regular", fontSize: 18 }}>
          Welcome,
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 24 }}>
          {user?.fullName}
        </Text>
      </View>
      <View>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
    </View>
  );
}
