import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeViewAndroid from "../components/SafeAreaViewAndroid";

const Home = () => {
return (
	<View style={SafeViewAndroid.AndroidSafeArea}>
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ color: "#006600", fontSize: 40 }}>Settings Screen!</Text>
			<Ionicons name="settings" size={80} color="#006600" />
		</View>
	</View>
);
};

export default Home;
