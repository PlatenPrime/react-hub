import React, { useState } from 'react';
import { useEffect } from 'react';

const TestComponent = () => {
	const [numParts, setNumParts] = useState(0);
	const [floatNum, setFloatNum] = useState(0);

	function handleChangeNumParts(event) {
		setNumParts(Number(event.target.value));
	}

	function handleChangeFloatNum(event) {
		setFloatNum(Number(event.target.value));
	}

	const redParts = Math.floor(floatNum * numParts);
	const whiteParts = numParts - redParts;
	const parts = [];

	for (let i = 0; i < numParts; i++) {
		const isRed = i < redParts;
		const color = isRed ? 'bg-red-500' : 'bg-white';
		parts.push(<div key={i} className={`w-8 h-8 ${color} border border-gray-500`} />);
	}

	return (
		<div className="flex flex-col items-center">
			<label htmlFor="numParts" className="mr-2">Number of Parts:</label>
			<input type="number" id="numParts" name="numParts" value={numParts} onChange={handleChangeNumParts} className="border border-gray-500 px-2 py-1" />

			<label htmlFor="floatNum" className="ml-2 mr-2">Float Number:</label>
			<input type="number" id="floatNum" name="floatNum" step="0.001" value={floatNum} onChange={handleChangeFloatNum} className="border border-gray-500 px-2 py-1" />

			<div className="flex flex-wrap mt-4">{parts}</div>
		</div>
	);
}


export default TestComponent;