import React from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";

const Map  = () => {
return (
	<View style={styles.container}>
      <MapView 
	  	style={styles.map}
	    initialRegion={{
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		  }}>
		  <Marker
			coordinate={{latitude: 51.5905468101903, longitude: 4.782533728835702}}
			title="De Stripspecialist"
			description="076-5284700"
		  />
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
  });

export default Map;
