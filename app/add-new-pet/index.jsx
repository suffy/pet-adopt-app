import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import Colors from "../../constants/Colors";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState();
  const [gender, setGender] = useState("Male");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Cats");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, headerTitle: "Add New Pet" });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    // console.log("snapshot ", snapshot);

    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = () => {
    // console.log("formData", formData);

    if (!formData?.name) {
      Alert.alert("Please enter pet name");
      return;
    }

    if (!formData?.age) {
      Alert.alert("Please enter pet age");
      return;
    }

    if (!formData?.breed) {
      Alert.alert("Please enter pet breed");
      return;
    }

    if (!formData?.weight) {
      Alert.alert("Please enter pet weight");
      return;
    }

    if (!image) {
      Alert.alert("Please select pet image");
      return;
    }

    if (!formData?.address) {
      Alert.alert("Please enter pet address");
      return;
    }

    if (!formData?.about) {
      Alert.alert("Please enter pet about");
      return;
    }
    uploadGambar(image);
  };

  const url = process.env.EXPO_PUBLIC_API_URL;
  const uploadGambar = async (imageUri) => {
    setLoader(true);
    const response = await FileSystem.uploadAsync(`${url}`, imageUri, {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": `${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    });

    console.log("response", response);
    console.log(response.status);

    if (response.status == 200) {
      const imageUrl = JSON.parse(response.body)?.filename;
      console.log(imageUrl);
      //   SaveFormData(imageUrl);
    }

    setLoader(false);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet For Adoption
      </Text>
      <TouchableOpacity onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("./../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={[styles.input, { height: 55 }]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={[styles.input, { height: 50, marginVertical: 5 }]}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline
          textAlignVertical="top"
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: { marginVertical: 5 },
  input: { padding: 10, backgroundColor: Colors.WHITE, borderRadius: 7 },
  label: { marginVertical: 5, fontFamily: "outfit-regular" },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 20,
    marginBottom: 50,
  },
});
