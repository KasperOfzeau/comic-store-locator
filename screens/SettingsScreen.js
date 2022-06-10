import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext';
import theme from "../config/theme";

const Settings = () => {

	const theme = useContext(themeContext);
	const [mode, setMode] = useState(false);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
			<View style={[styles.settingRow, {	backgroundColor: theme.secondBackground, borderColor: theme.borderColor }]}>
				<Text style={{ color: theme.color}}>Licht / donker thema</Text>
				<Switch 
					style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
					trackColor={{ false: "#3d3d3d", true: "#3d3d3d" }}
					thumbColor={mode ? "#767577" : "#f5dd4b"}
					value={mode} 
					onValueChange={(value) => {		
						setMode((value) => !value);
						EventRegister.emit("changeTheme", value);
					}} 
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 18
	},
	settingRow: {
		borderRadius: 6,
		borderWidth: 0.5,
		paddingLeft: 18,
		paddingRight: 18,
	  	width: '100%',
	  	flexDirection: "row",
      	flexWrap: "wrap",
	  	alignItems: 'center',
		justifyContent: 'space-between'
	},
  });

export default Settings;
