import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import themeContext from '../config/themeContext';

// Import components
import TopCard from "../components/TopCard";
import BottomCard from "../components/BottomCard";

const List  = ({ navigation }) => {

	// Load theme
	const theme = useContext(themeContext);

	// Store data
	const [stores , setStores] = useState([]);

	// Get store data from server
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
			return response.json();
		})
		.then(function(myJson) {
			setStores(myJson);
		});
	}

	  useEffect(() => {
		getStoreData();
	  }, []);

	return (
      	<ScrollView>
				<View style={[ styles.container, {backgroundColor: theme.background }]}>
					{stores.map((prop, key) => {
						return (
							<View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.secondBackground }]}>
								{/* Store information and rating */}
								<TopCard
									name = {prop.name}
									address = {prop.address}
									city = {prop.city}
									telephone = {prop.telephone}
									website = {prop.website}
								/>
								{/* Button to map */}
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
								{/* Link to Google maps and share button */}
								<BottomCard
									name = {prop.name}
									googleMaps = {prop.googleMaps}
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
  });

export default List;
