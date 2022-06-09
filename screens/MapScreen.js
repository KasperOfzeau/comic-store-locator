import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import jsonData from '../stores.json';
import SafeViewAndroid from "../components/SafeAreaViewAndroid";
import { Ionicons } from "@expo/vector-icons";

const Map  = ({ route, navigation }) => {
	if(typeof route.params !== 'undefined'){
		const { paramLatitude, paramLongitude } = route.params;
		// console.log(route.params)
	}

	const [currentLocation, setCurrentLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	useEffect(() => {
		(async () => {
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync({});
		  if(typeof location !== 'undefined') {
			setCurrentLocation({
			  latitude: location.coords.latitude,
			  longitude: location.coords.longitude
		  	});
		  }
		})();
	}, []);

	return (
			<View style={SafeViewAndroid.AndroidSafeArea}>
			<MapView 
				style={styles.map}
				region={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation={true}
				>
				{jsonData.map((prop, key) => {
					// console.log(prop)
					return (
						<Marker  
							key={key}
							coordinate={{latitude: parseFloat(prop.latitude), longitude: parseFloat(prop.longitude)}}
							title= {prop.name}
							description={prop.telephone}
						>
						<Image source={require('../assets/pin.png')} style={{height: 35, width:35 }} />
						<Callout tooltip>
							<View>
								<View style={styles.bubble}>
									<Text style={styles.name}>{prop.name}</Text>
									<Text>Adres: {prop.address}, {prop.city}</Text>
									<Text>Telefoon: {prop.telephone}</Text>			
									<Text>{prop.website ? "Website: " + prop.website : "Geen website"}</Text>	
								</View>
								<View style={styles.arrowBorder}/>
								<View style={styles.arrow}/>
							</View>
						</Callout>
						</Marker>
					);
				})}
				</MapView>
			</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	map: {
	  width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height,
	},
	bubble: {
		flexDirection: 'column',
		alignSelf: 'flex-start',
		backgroundColor: '#fff',
		borderRadius: 6,
		borderColor: "#ccc",
		borderWidth: 0.5,
		padding: 15,
		width: 250,
	},
	arrow: {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderTopColor: '#fff',
		borderWidth: 16,
		alignSelf: 'center',
		marginTop: -32,
	},
	arrowBorder: {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderTopColor: '#007a87',
		borderWidth: 16,
		alignSelf: 'center',
		marginTop: -0.5,
	},
	name: {
		fontSize: 16,
		marginBottom: 5
	}
  });

export default Map;
