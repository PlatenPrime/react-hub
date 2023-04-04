import React, { useState } from 'react';



const TestComponent = () => {

	const [numRedParts, setNumRedParts] = useState(1);
	const [numParts, setNumParts] = useState(2);


	const sectorAngle = 360 / numParts;
	const ratio = numRedParts / numParts;
	const ratioAngle = 360 * ratio;



	function handleChangeNumParts(event) {
		setNumParts(Number(event.target.value));
	}

	function handleChangeNumRedParts(event) {
		setNumRedParts(Number(event.target.value));
	}



	const parts = [];
	for (let i = 0; i < numParts; i++) {
		const isRed = i < numRedParts;
		const color = isRed ? 'bg-blue-500' : 'bg-yellow-500';
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
				className=" px-2 py-1 text-center text-5xl w-96 bg-blue-200  "
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
				className=" px-2 py-1 text-center text-5xl w-96 bg-orange-200"
				placeholder='Знаменник'
			/>

			<div className="relative w-96 h-96">


				<svg viewBox="0 0 100 100" className="absolute w-full h-full">
					{[...Array(numParts)].map((_, i) => {
						const startAngle = sectorAngle * i;
						const endAngle = startAngle + sectorAngle;
						const isRed = i < numRedParts;

						return (
							<path
								key={i}
								d={describeSector(50, 50, 40, startAngle, endAngle)}
								fill={isRed ? 'green' : 'orange'}
							/>
						);
					})}

				</svg>


				<svg viewBox="0 0 100 100" className="absolute w-full h-full">
					<path
						d={describeSector(50, 50, 40, 0, ratioAngle)}
						fill="blue"
					/>
				</svg>


				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-gray-300">

					<span className="text-xl">{`${(ratio * 100).toFixed()}%`}</span>

				</div>
			</div>





			<div className=" w-2/3  flex justify-center flex-wrap mt-4 border-2 ">
				{parts}
			</div>



		</div>
	);
}



function describeSector(x, y, radius, startAngle, endAngle) {
	const start = polarToCartesian(x, y, radius, endAngle);
	const end = polarToCartesian(x, y, radius, startAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

	return [
		`M ${start.x} ${start.y}`,
		`A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
		'L 50 50',
		`L ${start.x} ${start.y}`,
		'Z',
	].join(' ');
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians)),
	};
}









export default TestComponent;