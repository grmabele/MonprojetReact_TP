import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import {
    emailValidator,
    passwordValidator,
} from '../core/utils';
//import * as SQLite from 'expo-sqlite'

export default class ModificationPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
           
            email: '',
            newPassword: '',
            confirmPassword: ''
        };
    };

    
    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handleNewPasswordChange = (newPassword) => {
        this.setState({ newPassword });
    };

    handleConfirmPasswordChange = (confirmPassword) => {
        this.setState({ confirmPassword });
    };

    handle = () => {
        this.props.navigation.navigate("Connexion")
    }

    showErrorAlert = () => {
        Alert.alert('Erreur', 'Veuillez entrez les infos correctes');
    };
    

    onSignUpPressed () {
        console.log("click");
        console.log(this.props)
        
        const emailError = emailValidator(this.state.email)
        const emailNewPassword = passwordValidator(this.state.newPassword);
        const emailConfirmPassword = passwordValidator(this.state.confirmPassword);
       
       
        console.log(emailNewPassword)
        console.log(emailConfirmPassword);
        if ( emailError || emailNewPassword || emailConfirmPassword ) {
            this. showErrorAlert();
            return;
        } else {
            const formData = new FormData();
         
            formData.append("password", this.state.newPassword);
            formData.append('mail', this.state.email);
            //formData.append("newPassword", this.state.newPassword);
            //formData.append("confirmPassword", this.state.confirmPassword);

            console.log(this.state.email);
            console.log(this.state.newPassword);
            console.log(this.state.confirmPassword);

            fetch('http://jdevalik.fr/api/updateuser.php', {
                method: 'POST', //Request Types
                body: formData, // post data
                headers: {
                    "content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
             .then((json) => {
                if (json == false) {
                    Alert.alert(
                        'Erreur',
                        'L\'email saisi existe pas',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.props.navigation.navigate('Connexion');

                }
            })
            .catch((error) => {
                console.error(error);
            })


        }
}

    render () {
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>MODIFICATION DU MOT DE PASSE</Text>

            

            <TextInput
            style={styles.TextInput}
            placeholder="E-mail"
            onChangeText={this.handleEmailChange}
            value={this.state.email}

            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
            />

            <TextInput
            style={styles.TextInput}
            
            onChangeText={this.handleNewPasswordChange}
            value={this.state.newPassword}
            placeholder="Nouveau mot de passe"
            secureTextEntry={true}

            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
           />

            <TextInput
            style={styles.TextInput}
            
            onChangeText={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
            placeholder="confirmation du mot de passe"
            secureTextEntry={true}

            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
           />

            <SafeAreaView>
                <TouchableOpacity style={styles.button} onPress = {() => this.onSignUpPressed()}>
                    <Text style={styles.text}>MODIFICATION DU MOT DE PASSE</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <Text style={styles.title2}>
                Déjà inscrit ?{' '} 
                <Text style={styles.linkText} onPress={() => this.props.navigation.navigate('Connexion')}>
                    Connectez-vous
                </Text>
            </Text> */}

            
        </SafeAreaView>
    )}         
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        height: 40,
        width: "60%",
        margin: 10,
        borderWidth: 1,
        paddingLeft: 60,
        paddingRight: 60,
        borderRadius: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#560bad'
    },

    text : {
        color: '#ffffff',
      },

    button : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#560bad',
        paddingLeft: 88,
        paddingRight: 88,
        height: 35, 
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 3,
      },

      title2: {
        fontSize: 16,
        color: '#000', 
        
    },
    linkText: {
        color: '#560bad', 
    },
});


