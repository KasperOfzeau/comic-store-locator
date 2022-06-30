import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from 'react-native'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../config/themeContext';

const TopCard = (prop) => {

	// Load theme
    const theme = useContext(themeContext);

	// Ratings
	const [ratings, setRatings] = useState({});

	// When rating is pressed
	function onStarRatingPress(id, rating) {
		setRatings({ ...ratings, [id] : rating })
        EventRegister.emit("updateReviewsPage", {
            review: {
                id: id,
                rating: rating,
            } 
        });
	}

	let STORAGE_KEY = '@reviews';

	// Save reviews in AsyncStorage
	const saveReviews = async () => {
		try {
		  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
		} catch (e) {
		  console.log('Failed to save the data to the storage ' + e)
		}
	  }

	  // Get reviews from AsyncStorage
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