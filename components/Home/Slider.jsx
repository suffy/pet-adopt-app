import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));

    snapshot.forEach((doc) => {
      //   console.log(doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  useEffect(() => {
    GetSliders();
  }, []);

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        horizontal
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.8,
    height: 170,
    borderRadius: 15,
    marginRight: 20,
  },
});
