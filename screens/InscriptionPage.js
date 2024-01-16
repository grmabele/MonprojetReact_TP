import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import {
    emailValidator,
    passwordValidator,
    nameValidator,
} from '../core/utils';
import { connect } from "react-redux";
//import * as SQLite from 'expo-sqlite'

class InscriptionPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        };
    };

    handleTextChange = (name) => {
        this.setState({ name });
    };
    
    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handle = () => {
        this.props.navigation.navigate("Connexion")
    }

    // alert = () => {
    //     Alert.alert('Erreur', 'Veuillez entrez les infos corrects')
    // }


    alerte(){
        Alert.alert(
            'Erreur',
            'Veuillez remplir correctement les champs',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    // onSignUpPressed (){
    //     console.log("click");
    //     console.log(this.props)
    //     const nameError = nameValidator(this.state.name);
    //     const emailError = emailValidator(this.state.email);
    //     const passwordError = passwordValidator(this.state.password);
    //     if (emailError || passwordError || nameError) {
    //         this.alerte()
    //         return;
    //     } else {
    //         const action = { type: "ADD_USER", value: {name: this.state.name, email: this.state.email, password: this.state.password} }
    //         this.props.dispatch(action)
    //         console.log(this.props)
    //         this.props.navigation.navigate('Connexion');
    //     }
    // };
    

    onSignUpPressed () {
        console.log("click");
        console.log(this.props)
        const nameError = nameValidator(this.state.name);
        const emailError = emailValidator(this.state.email)
        const emailpassword = passwordValidator(this.state.password);
        console.log(nameError);
        console.log(emailError)
        console.log(emailpassword);
        if (nameError || emailError || emailpassword ) {
            this.alerte();
            return;
        } else {
            const formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('mail', this.state.email);
            formData.append("password", this.state.password);

            fetch('http://jdevalik.fr/api/insertuser.php', {
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
                        'L\'email saisi existe déjà. Veuillez saisir une adresse mail ou récuperer votre',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.props.navigation.navigate('Deconnexion', {username:this.state.text});
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
            <Text style={styles.title}>INSCRIPTION</Text>

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

            <TextInput
            style={styles.TextInput}
            
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Mot de passe"
            secureTextEntry={true}

            autoCapitalize="none"
            maxLength={40}
            autoCorrect={false}
           />

            <SafeAreaView>
                <TouchableOpacity style={styles.button} onPress = {() => this.onSignUpPressed()}>
                    <Text style={styles.text}>INSCRIPTION</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <Text style={styles.title2}>
                Déjà inscrit ?{' '} 
                <Text style={styles.linkText}>
                    Connectez-vous
                </Text>
             </Text>
            
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
export default connect(mapStateToProps)(InscriptionPage);

