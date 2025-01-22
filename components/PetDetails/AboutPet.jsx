import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : undefined}
        style={{ fontFamily: "outfit-regular", fontSize: 14 }}
      >
        {pet?.about}
      </Text>
      {readMore && (
        <TouchableOpacity onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 14,
              color: Colors.SECONDARY,
              fontWeight: "bold",
            }}
          >
            Read more
          </Text>
        </TouchableOpacity>
      )}
      {!readMore && (
        <TouchableOpacity onPress={() => setReadMore(true)}>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 14,
              color: Colors.SECONDARY,
              fontWeight: "bold",
            }}
          >
            Read less
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
