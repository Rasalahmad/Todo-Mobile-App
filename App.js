import { StatusBar, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import Registration from "./src/screens/Registration";
import Login from "./src/screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import { auth } from "./firebase.config";

const Stack = createStackNavigator();

// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     backgroundColor: "#fff",
//   },
// };

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return authSubscription;
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Registration">
                {(props) => <Registration {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {(props) => <Login {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home">
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create">
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="update">
                {(props) => <Update {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position={"top"} />
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
