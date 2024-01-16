import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'


export default class HomePage extends React.Component {

  
    constructor(props){
        super(props);
    }

    handlePress = () => {
        this.props.navigation.navigate("Connexion")
        
    }

    handle = () => {
        this.props.navigation.navigate("Inscription")
    }

    componentDidMount() {
      const db = SQLite.openDatabase("database.db");
      db.transaction(tx => {
        tx.executeSql("create table if not exists user (id integer primary key not null, name text, mail text, mdp text);");
      });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connexion/inscription</Text>

                <TouchableOpacity style={styles.button1} onPress={this.handlePress}>
                    <Text style={styles.text1}>CONNEXION</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button2} onPress={this.handle}>
                    <Text style={styles.text2}>INSCRIPTION</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#560bad'
    },
  
    text1 : {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
  
    text2 : {
      color : '#560bad',
      fontSize: 16,
      fontWeight: '700',
    },
  
    button1: {
      alignItems: 'center',
      backgroundColor: '#4361EE',
      paddingLeft: 60,
      paddingRight: 60,
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 20,
      borderRadius: 3,
    },
  
    button2 : {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderColor: '#000',
      borderWidth: 2,
      paddingLeft: 60,
      paddingRight: 60,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 3,
      
    }
  
    
  });
  