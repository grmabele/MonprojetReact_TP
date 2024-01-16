
const initialState = { 
    users: [],
    user: null // stockage d'un utilisateur
 }
function userReducer(state = initialState, action) {
    let nextState 
    switch (action.type) {
        case "ADD_USER":
            nextState = {
                ...state,
                user: action.value
            }
            return nextState
        case "SET_USER":
            nextState = {
                ...state, 
                user: action.value     
            }
            return nextState
        case "UPDATE_USER":
            nextState = {
                ...state,
                user: {...state.user, ...action.value}
            }
            return nextState
        case "DELETE_USER":
            nextState = {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export default userReducer;

