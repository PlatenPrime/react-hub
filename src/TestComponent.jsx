import React, { useState } from 'react';
import { useEffect } from 'react';

const TestComponent = () => {

	const [numParts, setNumParts] = useState(0);
	const [numRedParts, setNumRedParts] = useState(0);
	const [floatNum, setFloatNum] = useState(0);

	function handleChangeNumParts(event) {
		setNumParts(Number(event.target.value));
	}

	function handleChangeNumRedParts(event) {
		setNumRedParts(Number(event.target.value));
	}

	function handleChangeFloatNum(event) {
		setFloatNum(Number(event.target.value));
	}

	const parts = [];
	for (let i = 0; i < numParts; i++) {
		const isRed = i < numRedParts;
		const color = isRed ? 'red' : 'white';
		parts.push(<div key={i} style={{ backgroundColor: color }}>{i}</div>);
	}

	return (
		<div>
			<label htmlFor="numParts">Number of Parts:</label>
			<input type="number" id="numParts" name="numParts" value={numParts} onChange={handleChangeNumParts} />

			<label htmlFor="numRedParts">Number of Red Parts:</label>
			<input type="number" id="numRedParts" name="numRedParts" value={numRedParts} onChange={handleChangeNumRedParts} />

			<label htmlFor="floatNum">Float Number:</label>
			<input type="number" id="floatNum" name="floatNum" step="0.01" value={floatNum} onChange={handleChangeFloatNum} />

			<div style={{ display: 'flex' }}>{parts}</div>
		</div>
	);
}



export default TestComponent;