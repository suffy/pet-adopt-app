import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50 }}
        />
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
            {pet?.username}
          </Text>
          <Text style={{ fontFamily: "outfit-regular", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
});
