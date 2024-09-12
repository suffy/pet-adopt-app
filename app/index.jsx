import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    console.log("sudah login");
    return <Redirect href={"/(tabs)/home"} />;
  } else {
    console.log("belum login");
    return <Redirect href={"/login"} />;
    console.log("gas");
    // onPress();
  }

  // const onPress = useCallback(async () => {
  //   try {
  //     console.log("halo world new");
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow({
  //         redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
  //         // redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
  //       });

  //     if (createdSessionId) {
  //       setActive({ session: createdSessionId });
  //     } else {
  //       // Use signIn or signUp for next steps such as MFA
  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //     // Handle error
  //     // return <Redirect href={"/"} />;
  //   }
  // }, []);

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //     }}
  //   >
  //     <Text>sudah login ?</Text>
  //     <Text>{user?.fullName}</Text>
  //     {/* {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />} */}
  //   </View>
  // );
}
