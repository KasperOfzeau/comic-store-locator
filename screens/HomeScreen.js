import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import themeContext from '../config/themeContext';

const Home = ({ navigation }) => {

	// Loading theme
	const theme = useContext(themeContext);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
			{/* Logo */}
			<View style={styles.imageContainer}>
				<Image
					style={styles.logo}
					source={require('../assets/logo.png')}
				/>
			</View>
			<View style={styles.contentHolder}>
				<Text style={[styles.title,{ color: theme.color}]}>Stripwinkel zoeker</Text>
				<Text style={[styles.text,{ color: theme.color}]}>Vind alle stripboekwinkels bij jou in de buurt! Wanneer je de winkel hebt bezocht sla een review van de winkel voor je zelf op. Zodat je weet of je deze winkel vaker moet bezoeken of niet!</Text>
				{/* Button to map screen */}
				<Button
					style={styles.buttonStyle}
					title="Begin met zoeken"
					onPress={() => {
						navigation.navigate('Kaart');
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		marginTop: 20,
	},
	logo: {
		width: 200,
		height: 200,
	},
	contentHolder: {
		width: "90%"
	},
	title: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 20
	},
	text: {
		textAlign: "center",
		marginBottom: 20
	}
});

export default Home;
