import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { query, set } from "firebase/database";
import { collection, where, getDocs } from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../components/Inbox/UserItem";
import Colors from "../../constants/Colors";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get user list depends on current user emails
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setUserList((userList) => [...userList, doc.data()]);
    });

    setLoader(false);
  };

  // filter the list of other user in one state
  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((item) => {
      const otherUser = item.users?.filter(
        (user) => user?.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: item.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View
      style={{ padding: 20, backgroundColor: Colors.WHITE, height: "100%" }}
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        showsVerticalScrollIndicator={false}
        refreshing={loader}
        onRefresh={GetUserList}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  );
}
