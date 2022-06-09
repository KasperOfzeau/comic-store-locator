import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image,SafeAreaView, ScrollView, StatusBar } from 'react-native'
import jsonData from '../stores.json';
import StarRating from 'react-native-star-rating';
import { Ionicons } from "@expo/vector-icons";

const List  = () => {

	const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
		setRatings({ ...ratings, [id] : rating })
		console.log(ratings)
	}

	return (
      	<ScrollView>
			  <View style={styles.container}>
				{jsonData.map((prop, key) => {
					// console.log(prop)
					return (
						<View key={key} style={styles.card}>
							<Text>{prop.name}</Text>
							<Text>Adres: {prop.adress}, {prop.city}</Text>
							<Text>Telefoon: {prop.telephone}</Text>
							<StarRating
								disabled={false}
								maxStars={5}
								rating={ratings.hasOwnProperty(prop.name) ? ratings[prop.name] : 0}
								selectedStar={(rating) => onStarRatingPress(prop.name, rating)}
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
		  backgroundColor: '#fff',
		  borderRadius: 6,
		  borderColor: "#ccc",
		  borderWidth: 0.5,
		  padding: 15,
		  width: '80%',
		  marginTop: 15 
	  }
  });

export default List;
