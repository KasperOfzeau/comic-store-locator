import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
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
=======
import { StyleSheet, Text, View, Button, Dimensions, Image,SafeAreaView, ScrollView, StatusBar } from 'react-native'
import jsonData from '../stores.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

const List  = ({ navigation }) => {

	const [favorites, setFavorites] = useState({});

	useEffect(() => {
		(async () => {
			setFavorites(getData());
			console.log(favorites['_W'])
		  })();
	  }, []);

	const storeData = async (value) => {
		try {
		  const jsonValue = JSON.stringify(favorites)
		  await AsyncStorage.setItem('favorites', jsonValue)
		  console.log('succes')
		  console.log(favorites)
		} catch (e) {
		  console.log(e)
		}
	  }

	  
	const getData = async () => {
		try {
		const jsonValue = await AsyncStorage.getItem('favorites')
		return result != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
		// error reading value
		}
	}
  
>>>>>>> Stashed changes

	return (
      	<ScrollView>
			  <View style={styles.container}>
				{jsonData.map((prop, key) => {
					// console.log(prop)
					return (
						<View key={key} style={styles.card}>
							<Text>{prop.name}</Text>
<<<<<<< Updated upstream
							<Text>Adres: {prop.adress}, {prop.city}</Text>
							<Text>Telefoon: {prop.telephone}</Text>
							<Text>{prop.website ? "Website: " + prop.website : "Geen website"}</Text>
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
=======
							<Text>Adres: {prop.address}, {prop.city}</Text>
							<Text>Telefoon: {prop.telephone}</Text>	
							<Button
								title="Voeg toe aan favorieten"
								onPress={() => {
									storeData(prop.name);
							    }}	
							/>		
>>>>>>> Stashed changes
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
	  },
	  rating: {
		  width: '80%',
		  marginTop: 15
	  }
  });

export default List;
