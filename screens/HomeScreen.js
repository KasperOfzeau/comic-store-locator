import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import themeContext from '../config/themeContext';
import { Ionicons } from "@expo/vector-icons";

const Home = () => {

	const theme = useContext(themeContext);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
			<Text style={{ color: theme.color, fontSize: 40 }}>Home Screen!</Text>
			<Ionicons name="md-home" size={80} color={theme.color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
});

export default Home;
