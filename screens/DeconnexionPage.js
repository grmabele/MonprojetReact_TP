import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


export default class DeconnexionPage extends React.Component {
    constructor(props){
        super(props);
    }

    handlePress = () => {
        this.props.navigation.navigate("Home");
    }

    handlePressProfil = () => {
        this.props.navigation.navigate("Monprofil");
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Vous êtes connecté</Text>

                <Text style={styles.text}>Bienvenu {this.props.route.params.username} sur notre application{'\n'} d'inscription connexion</Text>

                <TouchableOpacity style={styles.button} onPress={this.handlePressProfil} >
                    <Text style={styles.textDecon}>MON PROFIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={ () => {this.props.navigation.navigate('Modification')}} >
                    <Text style={styles.textDecon}>MODIFICATION DU MOT DE PASSE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.handlePress} >
                    <Text style={styles.textDecon}>DÉCONNEXION</Text>
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

      text: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        },

        textDecon: {
        color:'#560bad',
        fontSize: 16,
        fontWeight: '700',
        },

        button : {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderColor: '#000',
            borderWidth: 2,
            paddingHorizontal: 88,
            height: 40, 
            marginTop: 20,
            borderRadius: 3,
          },
})