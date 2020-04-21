import { SET_SELECTED_OPTION } from "../actions/actionTypes";

const initialState = {
	selectedOption: ''
};

export const dropDownReducer = (state = initialState, action) => {
	if (action.type === SET_SELECTED_OPTION) {
		return {
			...state,
			selectedOption: action.payload
		};
	}

	return state;
};