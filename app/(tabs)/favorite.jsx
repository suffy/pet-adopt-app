import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Shared from "./../../shared/Shared";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import PetListItem from "./../../components/Home/PetListItem.jsx";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // console.log("aa");
    user && GetFavPetIds();
  }, [user]);

  //  Fav Ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    GetFavPetList(result?.favorites);
    setLoader(false);
  };

  // Fetch Related Pet List
  const GetFavPetList = async (favId_) => {
    setFavPetList([]);
    // console.log("GetFavPetList : ", favIds);
    const q = query(collection(db, "Pets"), where("id", "in", favId_));
    // console.log("q", q);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setFavPetList((favPetList) => [...favPetList, doc.data()]);
    });
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>Favorite</Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        refreshing={loader}
        onRefresh={() => GetFavPetIds()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PetListItem key={item?.id} pet={item} />}
      />
    </View>
  );
}
