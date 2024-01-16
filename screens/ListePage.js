import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Produit_Item from './Produit_Item.js';
import { connect } from 'react-redux';

class ListePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produits: [],
            isLoading: true, // Ajout d'un état pour gérer l'indicateur de chargement
        };
    }

    handlePressProfil = () => {
        this.props.navigation.navigate('Monprofil');
    };
    

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        const formData = new FormData();
        formData.append('type', 1);

        fetch('http://jdevalik.fr/api/getProducts.php', {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => response.json())
        .then((data) => {
            this.setState({ produits: data, isLoading: false }); // Met à jour les produits et désactive l'indicateur de chargement
            this.props.addProduct(data); // Dispatcher l'action avec les données
            // const action = { type: 'ADD_PRODUCT', value: data };
            // this.props.dispatch(action);
        }).catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
            this.setState({ isLoading: false }); // Désactive l'indicateur de chargement même en cas d'erreur
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if (this.state.produits.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>Aucun produit trouvé</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <View style={styles.titlePageItem}>
                    <Text style={styles.textTitlePageItem}>Liste des Produits disponibles</Text>
                </View>

                <View style={styles.ItemsView}>
                    <FlatList
                        data={this.state.produits}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => 
                            <View style ={styles.ItemView}>
                                <Produit_Item produit={item} />
                            </View>
                        }
                        onEndReachedThreshold={0.5}
                    />
                </View>

                <View style={styles.buttonProfile}>
                    <TouchableOpacity style={styles.button} onPress={this.handlePressProfil}>
                        <Text style={styles.textDecon}>MON PROFIL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  titlePageItem : {
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center',
    marginBottom : 30
},
   textTitlePageItem : {
    fontSize : 20,
    fontWeight : 'bold',
    color : '#7071E8'
},
ItemView : {
     
    borderWidth : 2,
    borderColor: "#7071E8",
    borderRadius : 20,
    padding: 10,
    marginBottom : 10,
    width: "95%"

},
ItemsView : {
    flex : 9,
    justifyContent : 'center',
    alignItems: 'center',
    
},

textDecon: {
    color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },

    button : {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#560bad',
        borderColor: '#000',
        borderWidth: 2,
        paddingHorizontal: 88,
        height: 40, 
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 3,
      },

      buttonProfile :  {
        justifyContent: 'center',
        alignItems: 'center',
      }
//   image: {
//     width: '80%', // 80% de la largeur du conteneur
//     height: 200, // Hauteur fixe, vous pouvez la modifier selon vos besoins
//     resizeMode: 'contain',
//   },
//   text: {
//     marginTop: 10,
//     // Pas besoin de définir une largeur/hauteur spécifique pour le texte
//   },
});


const mapDispatchToProps = dispatch => {
    return {
        addProduct: (data) => dispatch({ type: 'ADD_PRODUCT', value: data }),
    };
};

export default connect(null, mapDispatchToProps)(ListePage);
