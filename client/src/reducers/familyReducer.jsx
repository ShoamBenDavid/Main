import { actionTypes } from "../types"; // Adjust the import path

const initialState = {
    familyMembers: [],
};

export const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAMILY_MEMBER_SUCCESS:
            return {
                ...state,
                familyMembers: [...state.familyMembers, action.payload],
            };
        default:
            return state;
    }
};