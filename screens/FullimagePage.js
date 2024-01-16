import React from "react";
import { View, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';


export default class FullimagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            uri: null,
            source: null
        };

    }

    render () {
        console.log(this.props.route.params.uri);
        return (
            <View style={styles.buttonContainer}>
                <Image style={{flex: 1}} source={{ uri: this.props.route.params.uri}}/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
      
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonSnap: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },

    fullButton: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    }
});
  
    
 
  

