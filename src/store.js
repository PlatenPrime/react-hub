import React from 'react';



const initialState = { count: 0 };


export const StoreContext = React.createContext(initialState);



export const StoreProvider = ({ children }) => {

	const [state, dispatch] = React.useReducer(reducer, initialState);


	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + 1 };
		case 'DECREMENT':
			return { count: state.count - 1 };
		default:
			return state;
	}
};
