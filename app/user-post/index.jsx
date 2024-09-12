import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { db } from "./../../config/FirebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPetList, setUserPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  const GetUserPost = async () => {
    setLoader(true);
    setUserPetList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserPetList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });

    user && GetUserPost();
  }, [user]);

  const OnDeletePost = (docId) => {
    Alert.alert(
      "Do you want to delete this post ?",
      "Do you really want to delete this post ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Click"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        User Post
      </Text>

      <FlatList
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        data={userPetList}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem key={index} pet={item} />
            <Pressable
              onPress={() => OnDeletePost(item?.id)}
              style={styles.deleteButton}
            >
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
      {userPetList?.length == 0 && <Text>No data found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 10,
    marginRight: 10,
  },
});
