import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../config/themeContext';
import { Ionicons } from "@expo/vector-icons";

const TopCard = (prop) => {

    const { navigation } = prop;

    const theme = useContext(themeContext);

	const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
		setRatings({ ...ratings, [id] : rating })
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
		readReviews();
	  }, []);

	  useEffect(() => {
		saveReviews();
	  }, [ratings]);


    return (
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    rating: {
        width: '80%',
        marginTop: 15,
        marginBottom: 15
    },
});


export default TopCard;