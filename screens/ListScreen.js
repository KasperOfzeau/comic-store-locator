import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Share, Text, View, Button, Dimensions, Image,SafeAreaView, ScrollView, StatusBar } from 'react-native'
import StarRating from 'react-native-star-rating';
import themeContext from '../config/themeContext';
import { Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../config/theme";

const List  = ({ navigation }) => {

	const theme = useContext(themeContext);
	const [stores , setStores] = useState([]);
	const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
		setRatings({ ...ratings, [id] : rating })
	}

	const getStoreData=()=>{
		fetch('https://stud.hosted.hr.nl/1009357/stores.json'
		,{
		  headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		   }
		}
		)
		.then(function(response){
			// console.log(response)
			return response.json();
		})
		.then(function(myJson) {
			setStores(myJson);
		});
	}

	let STORAGE_KEY = '@reviews';

	const saveReviews = async () => {
		try {
		  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
		} catch (e) {
		  console.log('Failed to save the data to the storage ' + e)
		}
	  }

	  const readReviews = async () => {
		try {
		  const value = await AsyncStorage.getItem(STORAGE_KEY);
	  
		  if (value !== null) {
			setRatings(JSON.parse(value));
		  }
		} catch (e) {
			console.log('Failed to save the data to the storage ' + e)
		}
	  };

	  useEffect(() => {
		getStoreData();
		readReviews();
	  }, []);

	  useEffect(() => {
		saveReviews();
	  }, [ratings]);

	  const onShare = async (text) => {
		try {
		  const result = await Share.share({
			message: text,
		  });
		  if (result.action === Share.sharedAction) {
			if (result.activityType) {
			  // shared with activity type of result.activityType
			} else {
			  // shared
			}
		  } else if (result.action === Share.dismissedAction) {
			// dismissed
		  }
		} catch (error) {
		  alert(error.message);
		}
	  };

	return (
      	<ScrollView>
				<View style={[ styles.container, {backgroundColor: theme.background }]}>
					{stores.map((prop, key) => {
						// console.log(prop)
						return (
							<View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.secondBackground }]}>
								<Text style={{color: theme.color}}>{prop.name}</Text>
								<Text style={{color: theme.color}}>Adres: {prop.address}, {prop.city}</Text>
								<Text style={{color: theme.color}}>Telefoon: {prop.telephone}</Text>
								<Text style={{color: theme.color}} onPress={() => Linking.openURL('https://' + prop.website)}>{prop.website ? prop.website : "Geen website"}</Text>
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
									style={styles.buttonStyle}
									title="Bekijk op de kaart"
									onPress={() => {
									navigation.navigate('Kaart', {
										latitude: prop.latitude,
										longitude: prop.longitude,
									});
									}}
								/>
								<View style={styles.bottomCard}>
									<Text style={[styles.link, {color: theme.link}]}
											onPress={() => Linking.openURL(prop.googleMaps)}>
											<Ionicons name="map" size={14}/> Google Maps
									</Text>
									<Button title="Share" style={styles.shareButton} onPress={() => {
										onShare("Ken je de stripwinkel " + prop.name + " al? Ik wel! Ik heb deze gevonden met de Stripwinkel zoeker." )
									} 
									}/>
								</View>
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
		  marginTop: 15,
		  marginBottom: 15
	  },
	  bottomCard: {
		flexWrap: 'wrap',
        flexDirection: 'row',
		alignItems: "space-around"
	  },
	  link: {
		marginTop: 15
	  }, 
	  shareButton: {
		  marginLeft: 20
	  }
  });

export default List;
