import { SET_SELECTED_OPTION } from "./actionTypes";

export const setSelectedOption = (payload) => {
	return {
		type: SET_SELECTED_OPTION,
		payload
	}
};