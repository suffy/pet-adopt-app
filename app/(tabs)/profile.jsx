import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "./../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-react";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];

  const onPressMenu = (item) => {
    if (item.path === "logout") {
      signOut();
      router.push("/login/index");
    } else {
      router.push(item.path);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Profile</Text>
      <View
        style={{ display: "flex", marginVertical: 20, alignItems: "center" }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}
        >
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 16,
            color: Colors.GRAY,
          }}
        >
          {user?.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={index}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item.icon}
              size={35}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
