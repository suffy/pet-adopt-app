import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <PetSubInfoCard
          icon={require("./../../assets/images/calendar.png")}
          title="Age"
          value={pet?.age + " years"}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/bone.png")}
          title="Breed"
          value={pet?.breed}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <PetSubInfoCard
          icon={require("./../../assets/images/sex.png")}
          title="Sex"
          value={pet?.sex}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/weight.png")}
          title="Weight"
          value={pet?.weight + " kg"}
        />
      </View>
    </View>
  );
}
