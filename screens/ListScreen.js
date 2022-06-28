import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import themeContext from '../config/themeContext';

import TopCard from "../components/TopCard";
import BottomCard from "../components/BottomCard";

const List  = ({ navigation }) => {

	const theme = useContext(themeContext);

	const [stores , setStores] = useState([]);

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

	  useEffect(() => {
		getStoreData();
	  }, []);

	return (
      	<ScrollView>
				<View style={[ styles.container, {backgroundColor: theme.background }]}>
					{stores.map((prop, key) => {
						return (
							<View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.secondBackground }]}>
								<TopCard
									name = {prop.name}
									address = {prop.address}
									city = {prop.city}
									telephone = {prop.telephone}
									website = {prop.website}
								/>
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
