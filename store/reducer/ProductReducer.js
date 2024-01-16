const InitialState = {
    products : [],
    produit: null
}

function productReducer(state = InitialState, action) {
    let nextState
    switch (action.type) {
        case "ADD_PRODUCT":
            nextState = {
                ...state,
                products: [...state.products, action.value ]
            } 
            return nextState;
        case "UPDATE_PRODUCT":
                // Supposons que action.value contient le produit mis à jour avec un identifiant unique
            nextState = {
                ...state,
                products: state.products.map(product => 
                    product.id === action.value.id ? action.value : product)
            } 
        default:
            return state

    }
}

export default productReducer;