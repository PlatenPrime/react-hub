
import React, { useState } from 'react';

const FetchArts = () => {

	const [quant, setQuant] = useState(null)
	const [responseString, setResponseString] = useState('');
	const [art, setArt] = useState("1102-0260")
	const [index, setIndex] = useState(null)

	const [rows, setRows] = useState("");



	const urlCA = 'https://corsproxy.io/?';


	const searchValue = "У наявності"

	const baseUrl = "https://sharik.ua/ua";
	const apiRequest = `/search/?q=${art}`


	const apiUrl = `${baseUrl}${apiRequest}`;

	const corsUrl = urlCA + apiUrl


	const getRows = () => {
		fetch("https://btw-server.up.railway.app/api/rows")
			.then(response => response.text())
			.then(data => {
				setRows(data); // set the response string in state
			})
			.catch(error => {
				console.error(error);
			});
	}







	const getResponseString = () => {
		fetch(corsUrl)
			.then(response => response.text())
			.then(data => {
				setResponseString(data); // set the response string in state
			})
			.catch(error => {
				console.error(error);
			});
	}



	const getIndex = () => {

		const findIndex = responseString.indexOf(searchValue);
		setIndex(findIndex)



	}


	const getQuant = () => {

		const stringOfQuant = responseString.slice(index, index + 50);

		const numbers = stringOfQuant.match(/\d+/g);

		setQuant(numbers[0])

	}





	return (
		<div className='mx-auto w-1/2 flex flex-col  mt-6 space-y-6 ' >

			<input className='border rounded-lg border-blue-800 p-2' value={art} type="text" onChange={(e) => { setArt(e.target.value) }} />

			<button onClick={getResponseString} className='text-white bg-rose-800 p-2 w-fit mx-auto' >Сделать запрос по артикулу</button>

			<button onClick={getIndex} className='text-white bg-teal-800 p-2 w-fit mx-auto' >Найти элемент "{searchValue}"</button>

			<button onClick={getQuant} className='text-white bg-blue-600 p-2 w-fit mx-auto' >Получить количество</button>


			<button onClick={getRows} className='text-white bg-blue-600 p-2 w-fit mx-auto' >Получить ряды</button>


			<p className='border border-rose-600 p-2' > Артикул:{art}</p>
			{/* <p>{responseString}</p> */}
			<p className='border border-rose-600 p-2' > Длина полученной строки HTTP:{responseString.length}</p>
			<p className='border border-teal-600 p-2' > Индекс элемента "В наявності":{index}</p>
			<p className='border border-blue-600 p-2' > Количество артикула на остатке:  {quant}</p>
			<p className='border border-blue-600 p-2' > Ряды:  {rows}</p>

		</div>
	);
};

export default FetchArts;