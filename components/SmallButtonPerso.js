import React from "react";
import { View, StyleSheet, TouchableOpacity, Text  } from "react-native";

export default class ButtonPerso extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.props.onPress} 
                    style={this.props.typeButtonStyle === "dark" ? styles.appButtonContainerDark : styles.appButtonContainerLight}
                >
                    <Text style={this.props.typeButtonStyle === "dark" ? styles.appButtonTextDark : styles.appButtonTextLight}>{this.props.texte} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appButtonContainerDark: {
        elevation: 8,
        backgroundColor: "#7071E8",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: 150,
        marginBottom: 1,
        marginTop : 10
    },
    appButtonTextDark: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonContainerLight: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: 150,
        marginBottom: 1,
        marginTop : 10

    },
    appButtonTextLight: {
        fontSize: 12,
        color: "#7071E8",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})
