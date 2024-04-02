import React from 'react'

export default function Columns() {
	return (
		<div className="columns-xs p-8">
			<div className="bg-blue-500 aspect-video hover:aspect-square w-[500px]" ></div>
			<div className="bg-red-500 aspect-[17/3] w-[500px]" ></div>
			<div className="bg-green-500 aspect-square w-[500px]" ></div>
			<div className="bg-yellow-500 aspect-video w-[500px]" ></div>
		</div>
	)
}
