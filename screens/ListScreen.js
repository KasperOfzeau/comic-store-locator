import { StyleSheet, Text, View, Dimensions, Image,SafeAreaView, ScrollView, StatusBar } from 'react-native'
import jsonData from '../stores.json';
import { Ionicons } from "@expo/vector-icons";

const List  = () => {
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
