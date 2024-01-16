const InitialState = {
    cart: [],
};

function cartReducer(state = InitialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_TO_CART':
            // On vas trouver si le produit existe déjà dans le panier
            const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (existingProductIndex >= 0) {
                //Produit existe, j'augmente la quantité
                const cart = [...state.cart];
                const existingProduct = { ...cart[existingProductIndex]};
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
                cart[existingProductIndex] = existingProduct;
                return { ...state, cart }; // Retourne l'état global mis à jour
            } else {
                //Ajout d'un nouveau produit au panier
                nextState = {
                    ...state,
                    cart: [...state.cart, { ...action.payload}]
                }
            }
            return nextState;
        default:
            return state;
    }
}

export default cartReducer;