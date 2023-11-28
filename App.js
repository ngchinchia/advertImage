import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Carousel from "./components/AdBanner/Carousel";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Carousel />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}
