
import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { emailValidator, passwordValidator } from '../core/utils';
import {connect} from "react-redux";
import * as SQLite from 'expo-sqlite'
//import DeconnexionPage from "./DeconnexionPage";


class ConnexionPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            text: '',
            password: ''
        };
    };


    handleTextChange = (text) => {
        this.setState({ text });
    };

    handleNumberChange = (password) => {
        this.setState({ password });
    };

    handle = () => {
        this.props.navigation.navigate("Inscription")
    }

    alerte(){
        Alert.alert(
            'Erreur',
            'Veuillez rentrer un email ou mot de passe correct',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }


    // onLoginPressed () {
    //     const emailError = emailValidator(this.state.email);
    //     const passwordError = passwordValidator(this.state.password);
    //     if (emailError || passwordError) {
    //         // alert()
    //         return;
    //     }
    //     const {users} = this.props
    //     var userConnect = false
    //     for(var i=0; i<users.length; i++){
    //         if(users[i].email == this.state.email && users[i].password == this.state.password) {
    //             userConnect = true
    //             this.props.navigation.navigate('Liste', {username: users[i].name});
    //         }
    //     }
    //     if(userConnect == false){
    //         Alert.alert(
    //             "Erreur",
    //             'L\'email ou le mot de passe est incorrect',
    //             [
    //                 {text: 'OK', onPress: () => console.log('OK Pressed')},
    //             ],
    //             {cancelable: false},
    //         );
    //     }
    // }

onLoginPressed() {
    const emailError = emailValidator(this.state.text);
    const passwordError = passwordValidator(this.state.password);
    console.log(emailError)
    console.log(passwordError)
    if (emailError || passwordError) {
        alert('Email ou mot de passe invalide');
        return;
    } else {
        const formData = new FormData();
            
            formData.append('mail', this.state.text);
            formData.append("password", this.state.password);

            fetch('http://jdevalik.fr/api/getuser.php', {
                method: 'POST', //Request Types
                body: formData, // post data
                headers: {
                    "content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json == false) {
                    Alert.alert(
                        'Erreur',
                        'L\'email ou le mot de passe est incorrect',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                } else {
                    const action = { type: "ADD_USER", value: json}
                    this.props.dispatch(action);
                    this.props.navigation.navigate('Liste', {username:json.name});
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    // const db = SQLite.openDatabase("database.db");
    // db.transaction(
    //     tx => {
    //         tx.executeSql("SELECT * FROM user", [], (_, { rows: { _array } }) => {
    //             console.log("login");
    //             console.log(_array);
    //             let userConnect = false;
    //             for (let i = 0; i < _array.length; i++) {
    //                 if (_array[i].mail === this.state.text && _array[i].mdp === this.state.password) {
    //                     userConnect = true;
    //                     this.props.navigation.navigate('Deconnexion', { username: _array[i].name });
    //                     break; // Sortir de la boucle si l'utilisateur est trouvé
    //                 }
    //             }

    //             if (!userConnect) {
    //                 Alert.alert(
    //                     'Erreur',
    //                     'L\'email ou le mot de passe est incorrect',
    //                     [
    //                         { text: 'OK', onPress: () => console.log('OK Pressed') },
    //                     ],
    //                     { cancelable: false },
    //                 );
    //             }
    //         });
    //     }
    // );



    // Reste du composant (render, etc.)
    render () {
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={this.handleTextChange}
            value={this.state.text}

            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
            />

            <TextInput
            style={styles.TextInput}
            
            onChangeText={this.handleNumberChange}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry={true}

            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
           />

            <SafeAreaView>
                <TouchableOpacity style={styles.button} onPress={() => this.onLoginPressed()}>
                    <Text style={styles.text2}>CONNEXION</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <TouchableOpacity style={styles.buttonSup} onPress={ () => {this.props.navigation.navigate('Inscription')}}>
                <Text style={styles.titleSup}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSup} onPress={ () => {this.props.navigation.navigate('Modification')}}>
                <Text style={styles.titleSup}>Mot de passe oublié</Text>
            </TouchableOpacity>
            
           
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
        width: "62%",
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
    title2: {
        fontSize: 16,
        color: '#000', 
    },

    text2 : {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
      },

      button : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#560bad',
        paddingHorizontal: 88,
        height: 35, 
        marginTop: 40,
        marginBottom: 10,
        borderRadius: 3,
      },

      buttonSup : {
        justifyContent: 'center',
        alignItems: 'center',
      },

      titleSup : {
        color: '#560bad',
        fontSize: 16,
        fontWeight: '400',
      }
});

const mapStateToProps = (state) => {
    console.log(state)
    return state.userReducer
}
export default connect(mapStateToProps)(ConnexionPage);

