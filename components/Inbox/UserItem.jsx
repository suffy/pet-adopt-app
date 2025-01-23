import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <Link href={"/chat?id=" + userInfo?.docId}>
      <View
        style={{
          marginVertical: 10,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userInfo?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
          {userInfo?.name}
        </Text>
      </View>
    </Link>
  );
}
