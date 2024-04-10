import React, { useState } from 'react'
import style from './style.module.css'

export default function Drag() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

	const handleMouseDown = (e) => {
		setIsDragging(true);
		setStartPosition({
			x: e.clientX - position.x,
			y: e.clientY - position.y
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		setPosition({
			x: e.clientX - startPosition.x,
			y: e.clientY - startPosition.y
		});
	};

	return (
		<div
			id="container"
			style={{ minHeight: '100vh', backgroundColor: '#3b3b3b' }}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<div
				id="card"
				style={{
					width: '400px',
					height: '400px',
					backgroundColor: 'rgb(34, 192, 13)',
					borderRadius: '10px',
					cursor: isDragging ? 'grabbing' : 'grab',
					position: 'absolute',
					top: `${position.y}px`,
					left: `${position.x}px`
				}}
				onMouseDown={handleMouseDown}
			></div>
		</div>
	);
};