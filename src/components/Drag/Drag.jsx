import React, { useState } from 'react'
import style from './style.module.css'

export default function Drag() {





	const [state, setState] = useState(() => {
		return { startX: 0, startY: 0, newX: 0, newY: 0 }
	});




	function handleMouseMove(e) {
		setState((prev) => { return { ...prev, newX: prev.startX - e.clientX, newY: prev.startY - e.clientX, } })
	}


	function handleMouseUp(e) {

	}




	return (
		<div className={style.container} >
			<div
				className={style.card}

				onMouseDown={(e) => {
					setState((prev) => { return { ...prev, startX: e.clientX, startY: e.clientY } })
				}}

			></div>

		</div>
	)
}
