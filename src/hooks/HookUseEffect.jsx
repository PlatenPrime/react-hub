import React, { useEffect, useState } from 'react';

const HookUseEffect = () => {

	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(prev => prev + 1)


	}, [count])

	if (count == 100000) {
		setCount(0)
	}


	return (
		<div>
			<h2>{count}</h2>
		</div>
	);
};

export default HookUseEffect;