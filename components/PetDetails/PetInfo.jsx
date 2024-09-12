import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import MarkFav from "../MarkFav";

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{pet?.name}</Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-regular",
              color: Colors.GRAY,
            }}
          >
            {pet?.address}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
