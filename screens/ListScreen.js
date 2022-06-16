import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Dimensions, Image,SafeAreaView, ScrollView, StatusBar } from 'react-native'
import jsonData from '../stores.json';
import StarRating from 'react-native-star-rating';
import themeContext from '../config/themeContext';
import { Ionicons } from "@expo/vector-icons";
import theme from "../config/theme";

const List  = ({ navigation }) => {

	const theme = useContext(themeContext);
	const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
		setRatings({ ...ratings, [id] : rating })
		console.log(ratings)
	}

	return (
      	<ScrollView>
				<View style={[ styles.container, {backgroundColor: theme.background }]}>
					{jsonData.map((prop, key) => {
						// console.log(prop)
						return (
							<View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.secondBackground }]}>
								<Text style={{color: theme.color}}>{prop.name}</Text>
								<Text style={{color: theme.color}}>Adres: {prop.address}, {prop.city}</Text>
								<Text style={{color: theme.color}}>Telefoon: {prop.telephone}</Text>
								<Text style={{color: theme.color}}>{prop.website ? "Website: " + prop.website : "Geen website"}</Text>
								<View style={styles.rating}>
									<StarRating
										disabled={false}
										maxStars={5}
										rating={ratings.hasOwnProperty(prop.name) ? ratings[prop.name] : 0}
										selectedStar={(rating) => onStarRatingPress(prop.name, rating)}
										fullStarColor={'#FDCC0D'}
										starSize={35}
									/>
								</View>
								<Button
									title="Bekijk op de kaart"
									onPress={() => {
									navigation.navigate('Kaart', {
										latitude: prop.latitude,
										longitude: prop.longitude,
									});
									}}
								/>
							</View>
						);
					})}
				</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
		marginBottom: 20
	  },
	  card: {
		  borderRadius: 6,
		  borderWidth: 0.5,
		  padding: 15,
		  width: '80%',
		  marginTop: 15 
	  },
	  rating: {
		  width: '80%',
		  marginTop: 15
	  }
  });

export default List;
