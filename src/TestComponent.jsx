import React, { useState } from 'react';
import { useEffect } from 'react';

const TestComponent = () => {

	const [count, setCount] = useState(1);



	function start() {
		let interval = setInterval(() => {
			setCount(count => {
				if (count < 11) {
					console.log(`Count change ${count}`)
					return count + 1;
				} else {
					clearInterval(interval);
					return count;
				}
			});
		}, 5000);
	}

	return (
		<div>
			<p>Counter: {count}</p>
			<button onClick={start}>Start</button>
		</div>
	);
}



export default TestComponent;