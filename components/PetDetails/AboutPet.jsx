import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : null}
        style={{
          fontFamily: "outfit-regular",
          fontSize: 17,
          color: Colors.GRAY,
        }}
      >
        {pet?.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
              color: Colors.SECONDARY,
            }}
          >
            Read more
          </Text>
        </Pressable>
      )}
    </View>
  );
}
