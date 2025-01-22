import { View, Text, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MarkFav from "../MarkFav";

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 27 }}>
            {pet?.name}
          </Text>
          <Text>{pet?.address}</Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
