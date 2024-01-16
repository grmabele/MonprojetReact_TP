import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import SmallButtonPerso from "../components/SmallButtonPerso";
import { connect } from "react-redux";
// import orangeImage from '../assets/orange.jpg';
// import kiwiImage from '../assets/kiwi.jpg';
// import pommeImage from '../assets/pomme.jpg';




class Produit_Item extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            produit: "",
            // addedToCart: false, // État pour le feedback de l'ajout au panier
        }
    }
    showImage(id){
        switch (id) {
            case 1:
                return require('../assets/orange.png')
            case 2:
                return require('../assets/pomme.png')
            case 3:
                return require('../assets/kiwi.png')
        }
    }

    addTocart = (produit) => {
        console.log('Ajout au panier:', produit);
        this.props.dispatch({
            type: 'ADD_TO_CART',
            payload: produit
        });

        // Logé l'état du panier après la mise à jour
        setTimeout( () => {
            console.log('État du panier:', this.props.cart);
        },500) // temps d'attente pour que le store Redux soit mis à jour
    }
    
    render () {
        // const { produit, addedToCart } = this.state;
        const produit = this.props.produit;
        // const addedToCart = this.props.addedToCart;
        console.log(produit);

        
        return (
            <View style={styles.main_container}>
                <View>
                    <Image
                        Style={styles.image}
                        source={this.showImage(produit.id)}
                    />
                    <Text style={styles.textStyle}>{produit.id}</Text>
                </View>

                <View>

                </View>
                
                <View style={styles.PriceItem}>
                    <Text > {produit.title} </Text>
                    <Text > {produit.prix} </Text>
                </View>
                <View >
                    <Text numberOfLines={6}> {produit.description} </Text>
                </View>

                <SmallButtonPerso texte="Ajouter au panier"
                    typeButtonStyle="dark"
                    onPress={() => this.addTocart(produit)}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // flexDirection: 'column',
        // backgroundColor: '#f5f5f5', // couleur de fond
        // padding: 10, // espacement autour des éléments
    },
    item : {
        flex : 1,
        justifyContent : 'center',
        alignItems: 'center',
       },
       imageAndNameItem : {
        flex : 1,
        flexDirection : "column",
        justifyContent : 'center',
        alignItems: 'center',
       },
       textStyle : {
        fontSize : 15,
        fontWeight : 'bold'
       },
       imageStyle : {
        width: 120,
        height: 120,
        borderRadius: 50,
       },
       TitleAndPriceItem : {
        
       }
    
});

const mapStateToprops = (state) => {
    console.log("État Redux:", state);
    return {
        cart: state.cartReducer.cart
    }
    
};
export default connect(mapStateToprops)(Produit_Item);

