import React, { createContext, useContext } from 'react';


const HookUseContext = () => {

	// 1. создаем контекст в который обернем верхнюю компоненту

	const ComponentsContext = createContext("default value");



	function HookUseContextChild(props) {

		// 3. промежуточный компонент через который мы ничего не передаем через пропсы

		return (
			<div>
				<HookUseContexGrandChild />
			</div>
		);
	}



	function HookUseContexGrandChild() {

		// 4. компонент, который использует значение передаваемое в контексте


		const value = useContext(ComponentsContext);


		return (
			<div >
				I am context value {value}!
			</div>
		);
	}



	return (

		// 2. Заворачиваем в общий верхний контекст

		<ComponentsContext.Provider value="current value">


			<div>
				<HookUseContextChild />
			</div>

		</ComponentsContext.Provider>

	);
};

export default HookUseContext;