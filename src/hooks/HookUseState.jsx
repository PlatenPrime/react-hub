import React, { useState } from 'react';

const HookUseState = () => {




	const [count, setCount] = useState(0)
	const [inputValue, setInputValue] = useState(0)


	return (



		<div  >

			<h2>{count}</h2>

			<button onClick={() => { setCount(prev => prev + 1) }}>
				PLUS
			</button>

			<button onClick={() => { setCount(prev => prev - 1) }} >
				MINUS
			</button>

			<div>
				<input
					type="number"
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					onClick={() => { setCount(prev => prev * inputValue) }}
				>
					MULTIPLY
				</button>

			</div>

			<div>
				<button
					onClick={() => {
						setCount(0)
					}}
				>
					RESET
				</button>
			</div>

		</div >
	);
};

export default HookUseState;