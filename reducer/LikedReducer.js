import { types } from "./likedreducertypes";

const LikedReducer = (state, action) => {
    switch (action.type) {
        case types.ADD_ITEM:
            if (!state.find(item => item.id === action.payload.id)) {
                return [...state, {...action.payload}]
            }
            return state.filter(item => item.id !== action.payload)
        case types.SET_ITEMS:
            return action.payload
        case types.REMOVE_ITEM:
            return state.filter(item => item.id !== action.payload)
        default:
            return state
    }
}

export default LikedReducer