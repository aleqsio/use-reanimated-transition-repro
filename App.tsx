import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ReanimatedScreenProvider,
  useReanimatedTransitionProgress,
} from "react-native-screens/reanimated";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { Button } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <ReanimatedScreenProvider>
        <RootNavigator />
      </ReanimatedScreenProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  );
}

function RootScreen() {
  const { navigate } = useNavigation();
  const reaProgress = useReanimatedTransitionProgress();
  const sv = useDerivedValue(
    () =>
      (reaProgress.progress.value < 0.5
        ? reaProgress.progress.value * 50
        : (1 - reaProgress.progress.value) * 50) + 50
  );
  const reaStyle = useAnimatedStyle(() => {
    return {
      width: sv.value,
      height: sv.value,
      backgroundColor: "blue",
    };
  });

  return (
    <>
      <Animated.View style={reaStyle} />
      <Button title="Navigate to second screen" onPress={() => navigate("Second")} />
    </>
  );
}
function SecondScreen() {
  return <></>;
}
