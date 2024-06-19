import React, { useState } from 'react';

import './App.css';


// import Index from './components/DndKIT/Index';



function App() {




	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const [error, setError] = useState('');

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value);
	};

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleAddOption = () => {
		if (options.length >= 10) {
			setError('Максимум 10 вариантов.');
			return;
		}
		setOptions([...options, '']);
		setError('');
	};

	const handleRemoveOption = (index) => {
		const newOptions = options.filter((_, i) => i !== index);
		setOptions(newOptions);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!question.trim()) {
			setError('Вопрос не может быть пустым.');
			return;
		}
		if (options.some(option => !option.trim())) {
			setError('Все варианты должны быть заполнены.');
			return;
		}
		// Логика отправки данных на сервер или обработка
		console.log({ question, options });
	};





	return (
		<div className="App">

			<div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4 text-center">Создать опрос</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2">Вопрос</label>
						<input
							type="text"
							value={question}
							onChange={handleQuestionChange}
							placeholder="Введите ваш вопрос"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-4">
						{options.map((option, index) => (
							<div key={index} className="flex items-center mb-2">
								<input
									type="text"
									value={option}
									onChange={(e) => handleOptionChange(index, e.target.value)}
									placeholder={`Вариант ${index + 1}`}
									className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								{options.length > 2 && (
									<button
										type="button"
										onClick={() => handleRemoveOption(index)}
										className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
									>
										Удалить
									</button>
								)}
							</div>
						))}
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="button"
						onClick={handleAddOption}
						className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						Добавить вариант
					</button>
					<button
						type="submit"
						className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Создать опрос
					</button>
				</form>
			</div>

		</div>
	)
}

export default App;