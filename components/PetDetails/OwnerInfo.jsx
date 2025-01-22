import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
            {pet?.username}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 14,
              color: Colors.GRAY,
            }}
          >
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
    paddingHorizontal: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    justifyContent: "space-between",
    borderColor: Colors.PRIMARY,
    marginBottom: 80,
  },
});
