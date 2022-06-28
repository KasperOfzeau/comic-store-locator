import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import themeContext from '../config/themeContext';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons } from "@expo/vector-icons";

const Reviews = ({ navigation }) => {

	const theme = useContext(themeContext);

    const [ratings, setRatings] = useState({});

	function onStarRatingPress(id, rating) {
        EventRegister.emit("updateReviews", {
            review: {
                id: id,
                rating: rating,
            } 
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
              console.log(value)
			setRatings(JSON.parse(value));
		  }
		} catch (e) {
			console.log('Failed to save the data to the storage ' + e)
		}
	  };

      useEffect(() => {
        let eventListener = EventRegister.addEventListener("updateReviews",(data) => {
            setRatings({ ...ratings, [data.review.id] : data.review.rating })
        });
        return () => {
          EventRegister.removeEventListener(eventListener);
        }
      })

	  useEffect(() => {
		readReviews();
	  }, []);

	  useEffect(() => {
		saveReviews();
	  }, [ratings]);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
				{Object.entries(ratings).map(([key, val]) => 
                    <View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.secondBackground }]}>
                        <Text style={{color: theme.color}}>{key}</Text>
                        <View style={styles.rating}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={ratings.hasOwnProperty(key) ? ratings[key] : 0}
                                selectedStar={(rating) => onStarRatingPress(key, rating)}
                                fullStarColor={'#FDCC0D'}
                                starSize={35}
                            />
			            </View>
                    </View>
                )}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
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
});

export default Reviews;
