import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { emailValidator, passwordValidator } from '../core/utils';
import { connect } from "react-redux";

class ConnexionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    navigateToSignUp = () => {
        this.props.navigation.navigate("Inscription");
    };

    onLoginPressed = () => {
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);

        if (emailError || passwordError) {
            Alert.alert('Erreur', 'Email ou mot de passe invalide');
            return;
        } else { 

        const formData = new FormData();
        formData.append('mail', this.state.email);
        formData.append("password", this.state.password);

        fetch('http://jdevalik.fr/api/getuser.php', {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
        .then((response) => response.json())
        .then((json) => {
            if (json === false) {
                Alert.alert(
                    'Erreur',
                    'L\'email ou le mot de passe est incorrect',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            } else {
                const action = { type: "ADD_USER", value: json }
                this.props.dispatch(action);
                this.props.navigation.navigate('Deconnexion', { username: json.name });
            }
        })
        .catch((error) => {
            console.error(error);
            Alert.alert('Erreur', 'Un problème est survenu lors de la connexion');
        });
     }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Connexion</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={this.handleEmailChange}
                    value={this.state.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    maxLength={40}
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    maxLength={40}
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={this.onLoginPressed}>
                    <Text style={styles.buttonText}>CONNEXION</Text>
                </TouchableOpacity>

                <View style={styles.footerButtons}>
                    <TouchableOpacity onPress={this.navigateToSignUp}>
                        <Text style={styles.footerText}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Modification')}>
                        <Text style={styles.footerText}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        width: "80%",
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#560bad'
    },
    button: {
        backgroundColor: '#560bad',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 88,
        height: 35,
        marginTop: 40,
        marginBottom: 10,
        borderRadius: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    footerButtons: {
        marginTop: 20,
    },
    footerText: {
        color: '#560bad',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 10,
    }
});

const mapStateToProps = (state) => {
    return state.userReducer;
}

export default connect(mapStateToProps)(ConnexionPage);
