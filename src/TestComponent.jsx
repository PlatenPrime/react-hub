import React, { useState } from 'react';
import { useEffect } from 'react';

const TestComponent = () => {

	const [count, setCount] = useState(0);
	const [fax, setFax] = useState(1);



	function start() {
		let interval = setInterval(() => {
			setCount(count => {
				if (count < 10) {
					console.log("Count change")
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