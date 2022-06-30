import React, { useContext } from "react";
import { StyleSheet, Share, Text, View, TouchableOpacity } from 'react-native'
import themeContext from '../config/themeContext';
import { Ionicons } from "@expo/vector-icons";
import { Linking } from 'react-native';

const BottomCard = (prop) => {

	// Load theme
    const theme = useContext(themeContext);

	// When share button is pressed
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
    <View style={styles.bottomCard}>
        <View style={styles.maps}>
			{/* Google Maps link */}
            <Text style={[styles.link, {color: theme.link}]}
                onPress={() => Linking.openURL(prop.googleMaps)}>
                <Ionicons name="map" size={14}/> Google Maps
            </Text>
        </View>
        <View style={styles.share}>
			{/* Share button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onShare("Ken je de stripwinkel " + prop.name + " al? Ik wel! Ik heb deze gevonden met de Stripwinkel zoeker." )
                }}
                >
                <Ionicons name="share-social" size={24}/>	
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
	  bottomCard: {
		flex: 1, 
		flexDirection: "row",
		alignItems: "stretch"
	  },
	  maps: {
		  width: "50%"
	  },
	  share: {
		marginTop: 15,
		width: "50%",
		flex: 1,
	    alignItems: "flex-end",
	    justifyContent: 'center',
	  },
	  link: {
		marginTop: 15
	  }, 
	  shareButton: {
		  marginLeft: 20,
	  }
  });


export default BottomCard;