import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getDocs, query } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("fishes");
  }, []);
  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    // console.log(category);
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
        refreshing={loader}
        onRefresh={() => GetPetList("fishes")}
        style={{ marginTop: 20 }}
        horizontal
        data={petList}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
