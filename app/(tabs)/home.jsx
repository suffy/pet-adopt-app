import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListCategory from "../../components/Home/PetListCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <View style={{ padding: 20 }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/*Pet list +  Category */}
      <PetListCategory />

      {/* Add new pet option */}
      <TouchableOpacity
        style={styles.addNewPetContainer}
        onPress={() => router.push("/add-new-pet")}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
            color: Colors.PRIMARY,
          }}
        >
          Add New Pet
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    padding: 20,
    marginTop: 20,
  },
});
