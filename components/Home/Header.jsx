import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser(); // inisialisasi user clerk

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        {/* cara panggil fullName dari user */}
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99 }}
      />
    </View>
  );
}
