import React, { useState } from 'react';

const RingComponent = () => {
	const [sectorCount, setSectorCount] = useState(4);
	const [blueSectorCount, setBlueSectorCount] = useState(2);

	const sectorAngle = 360 / sectorCount;
	const blueRatio = blueSectorCount / sectorCount;
	const blueRatioAngle = 360 * blueRatio;

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-96 h-96">
				<svg viewBox="0 0 100 100" className="absolute w-full h-full">
					{[...Array(sectorCount)].map((_, i) => {
						const startAngle = sectorAngle * i;
						const endAngle = startAngle + sectorAngle;
						const isBlue = i < blueSectorCount;

						return (
							<path
								key={i}
								d={describeSector(50, 50, 40, startAngle, endAngle)}
								fill={isBlue ? 'blue' : 'gray'}
							/>
						);
					})}
				</svg>
				<svg viewBox="0 0 100 100" className="absolute w-full h-full">
					<path
						d={describeSector(50, 50, 40, 0, blueRatioAngle)}
						fill="blue"
					/>
				</svg>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-gray-300">
					<span className="text-xl">{`${(blueRatio * 100).toFixed()}%`}</span>
				</div>
			</div>
			<div className="mt-4 flex space-x-4">
				<label htmlFor="sectorCountInput">Number of Sectors:</label>
				<input
					id="sectorCountInput"
					type="number"
					min="1"
					max="100"
					value={sectorCount}
					onChange={(e) => setSectorCount(parseInt(e.target.value))}
					className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
				/>
				<label htmlFor="blueSectorCountInput">Number of Blue Sectors:</label>
				<input
					id="blueSectorCountInput"
					type="number"
					min="0"
					max={sectorCount}
					value={blueSectorCount}
					onChange={(e) => setBlueSectorCount(parseInt(e.target.value))}
					className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
				/>
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

export default RingComponent;