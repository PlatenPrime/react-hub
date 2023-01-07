import React, { useRef, useState } from 'react';

const HookUseRef = () => {

	const [header, setHeader] = useState("");
	const [render, setRender] = useState(0);
	const [state, setState] = useState("");


	const input = useRef();









	return (
		<div className='space-y-5 bg-slate-400'>

			<input className='block mx-auto' placeholder='state' onChange={(e) => { setState(e.target.value); setRender(prev => prev + 1) }} />

			<h2>{state}</h2>

			<input className='block mx-auto' placeholder='ref' ref={input} type="text" />

			<h2>{header}</h2>

			<button className='bg-sky-600 p-2 hover:bg-sky-500' onClick={() => { setHeader(input.current.value); setRender(prev => prev + 1) }} >Присвоить значение рефа</button>

			<div className='flex justify-center items-center my-10' >

				<h2 className='text-xl'>Количество рендеров: {render} </h2>


			</div>



		</div>
	);
};

export default HookUseRef;