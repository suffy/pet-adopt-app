import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const params = useLocalSearchParams();
  console.log("params", params);

  const { user } = useUser();

  const navigation = useNavigation();

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "Chat", params?.id, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log("result", result);
    const otherUser = result?.users?.find(
      (item) => item.email != user?.primaryEmailAddress?.emailAddress
    );
    console.log("otherUser", otherUser);
    navigation.setOptions({ headerTitle: otherUser?.name });
  };

  const onSend = async (newMessages) => {
    // console.log("messages", messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    newMessages[0].createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    await addDoc(collection(db, "Chat", params.id, "Messages"), newMessages[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
