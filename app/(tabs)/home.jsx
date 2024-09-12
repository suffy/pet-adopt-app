import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { Link, Redirect } from "expo-router";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";

export default function Home() {
  // const { isSignedIn } = useAuth();

  // useEffect(async () => {
  //   console.log("halo");
  //   if (isSignedIn) {
  //   } else {
  //     // return <Redirect href={"/login"} />;
  //     console.log("belum login");
  //     // reloadAppAsync({ url: Linking.createURL("/", { scheme: "myapp" }) });
  //     // await Updates.reloadAsync();
  //     // reload();
  //   }
  // }, []);

  // // const reload = async () => {
  // //   await Updates.reloadAsync();
  // // };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Pet List + Category */}
      <PetListByCategory />

      {/* Add new pet option */}
      <Link href={"/add-new-pet"} style={styles.addNewPetContainer}>
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
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    padding: 20,
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    textAlign: "center",
  },
});
