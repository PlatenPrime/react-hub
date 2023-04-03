import React, { useState } from 'react';
import { useEffect } from 'react';
import Draggable from 'react-draggable';


const TestComponent = () => {
	const [numParts, setNumParts] = useState(0);
	const [numRedParts, setNumRedParts] = useState(0);
	const [floatNum, setFloatNum] = useState(0);

	const [width, setWidth] = useState(800);
	const [height, setHeight] = useState(400);

	const handleResize = (event, { node, deltaX, deltaY }) => {
		setWidth(prevWidth => prevWidth + deltaX);
		setHeight(prevHeight => prevHeight + deltaY);
	};



	function handleChangeNumParts(event) {
		setNumParts(Number(event.target.value));
	}

	function handleChangeNumRedParts(event) {
		setNumRedParts(Number(event.target.value));
	}



	const parts = [];
	for (let i = 0; i < numParts; i++) {
		const isRed = i < numRedParts;
		const color = isRed ? 'bg-red-500' : 'bg-white';
		parts.push(<div key={i} className={`w-8 h-8 m-1 ${color} border-2 border-gray-500`}>{i + 1}</div>);
	}

	return (
		<div className="flex flex-col items-center mt-16">






			<input
				type="number"
				id="numRedParts"
				name="numRedParts"
				value={numRedParts}
				onChange={handleChangeNumRedParts}
				className=" px-2 py-1 text-center text-5xl w-96" 
				placeholder='Чисельник'
				
				/>

			<div className='w-96 h-1 bg-black'>

			</div>


			<input
				type="number"
				id="numParts"
				name="numParts"
				value={numParts}
				onChange={handleChangeNumParts}
				className=" px-2 py-1 text-center text-5xl w-96" 
				placeholder='Знаменник' 
				/>



			<Draggable
				position={{ x: 0, y: 0 }}
				handle=".handle"
				onDrag={handleResize}
			>
				<div className="box  overflow-hidden mt-16 p-4 shadow-2xl  " style={{ width: `${width}px`, height: `${height}px` }}>
					<div className="handle w-8 h-8 bg-blue-200 cursor-pointer p-2 mx-auto"></div>
					<div className="flex justify-center flex-wrap mt-4 border-2 ">{parts}</div>
				</div>
			</Draggable>


		</div>
	);
}




export default TestComponent;