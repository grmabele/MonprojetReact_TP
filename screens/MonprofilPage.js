import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import {
    nameValidator,
    emailValidator,
} from '../core/utils';
import { connect } from "react-redux";
//import * as SQLite from 'expo-sqlite'

class MonprofilPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
           
            name: '',
            email: ''
        };
    };

    

    handleTextChange = (name) => {
        this.setState({ name });
    };
    
    handleEmailChange = (email) => {
        this.setState({ email });
    };


    handle = () => {
        this.props.navigation.navigate("Home");
    }

    showErrorAlert = () => {
        Alert.alert('Erreur', 'Veuillez entrez les infos correctes');
    };
    

    onSignUpPressed () {

        
        console.log("click");
        console.log(this.props)
        const nameError = nameValidator(this.state.name);
        const emailError = emailValidator(this.state.email);
        console.log(nameError);
        console.log(emailError);
        if ( nameError || emailError ) {
            this.showErrorAlert();
            return;
        } else {
            
            const formData = new FormData();
         
            formData.append('name', this.state.name);
            formData.append("mail", this.state.email);

            fetch('http://jdevalik.fr/api/userinfo.php', {
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
                        'Profil innexistant',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.props.navigation.navigate('Home');

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
            <Text style={styles.title}>MON PROFIL</Text>

            

            {/* <TextInput
            style={styles.TextInput}
            placeholder="E-mail"
            onChangeText={this.handleEmailChange}
            value={this.state.email}

            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
            /> */}


            <TextInput
            style={styles.TextInput}
            placeholder="Nom"
            onChangeText={this.handleTextChange}
            value={this.state.name}

            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}

            
            />

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

            <SafeAreaView>
                <TouchableOpacity style={styles.button} onPress = {() => this.onSignUpPressed()}>
                    <Text style={styles.text}>VALIDER</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        console.log(this.props)
                        if (!this.props.user || !this.props.user.id) {
                            Alert.alert('Erreur', 'Utilisateur non identifié');
                            return;
                        }

                        const formData = new FormData();
                        formData.append('id', this.props.user.id)
                        // formData.append('name', this.state.name);
                        // formData.append('mail', this.state.email);
                
                        fetch('http://jdevalik.fr/api/deleteuser.php', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                "content-Type": "multipart/form-data"
                            },
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            if (json == false) {
                                Alert.alert(
                                    'Erreur',
                                    'Compte innexistant',
                                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                                    { cancelable: false }
                                );
                            } else {
                                const action = { type: "DELETE_USER" }
                                this.props.dispatch(action);
                                this.props.navigation.navigate('Home');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    }}
                >

                    <Text style={styles.text} >SUPPRIMER VOTRE COMPTE</Text>
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


const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(MonprofilPage);



