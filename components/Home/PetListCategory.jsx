import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Cats");

  useEffect(() => {
    GetPetList("Cats");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setSelectedCategory(category);
    setPetList([]);
    // console.log("category ", category);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setPetList((petList) => [...petList, doc.data()]);
    });

    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        horizontal
        refreshing={loader}
        onRefresh={() => GetPetList(selectedCategory)}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
