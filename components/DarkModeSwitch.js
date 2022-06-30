import React, { useState, useContext } from "react";
import { StyleSheet, Switch } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext';

const DarkModeSwitch = (prop) => {

    // Load theme
    const theme = useContext(themeContext);

    // Theme mode
    const [mode, setMode] = useState(false);

    return (
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
    )
}

const styles = StyleSheet.create({
	  
});


export default DarkModeSwitch;