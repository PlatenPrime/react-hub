import React from 'react';

import { useReducer } from 'react';




// Редьюсер хранит сборище всех видов функций, которые мы можем применить к состоянию

function reducer(state, action) {

	switch (action.type) {
		case 'incremented_age': {
			return {
				age: state.age + 1
			};
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}


	}
}





const HookUseReducer = () => {


	// Мы выгружаем из хука  состояние, которое будет рендерится и куратора передаваемых запросов, отдав ему наше сборище функций и начальное состояние

	const [state, dispatch] = useReducer(reducer, { age: 42 });


	// в каждый диспетчер (куратор) передаем тип (внутреннее название функции)

	function handleClick() {
		dispatch({ type: 'incremented_age' });
	}



	return (
		<div>
			<button className='p-2 text-lg bg-sky-500' onClick={handleClick}>
				Increment age
			</button>
			<p className='text-2xl' >Hello! You are {state.age}.</p>
		</div>
	);
};

export default HookUseReducer;