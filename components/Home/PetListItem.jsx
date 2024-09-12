import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "./../../components/MarkFav";

export default function PetListItem({ pet }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        backgroundColor: Colors.WHITE,
        padding: 10,
        marginRight: 15,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: 10,
          right: 10,
        }}
      >
        <MarkFav pet={pet} color={Colors.WHITE} />
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 15,
        }}
      />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
        {pet?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "outfit-regular", color: Colors.GRAY }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            color: Colors.PRIMARY,
            fontSize: 11,
            paddingHorizontal: 7,
            borderRadius: 10,
            backgroundColor: Colors.LIGHT_PRIMARY,
          }}
        >
          {pet?.age} years
        </Text>
      </View>
    </TouchableOpacity>
  );
}
