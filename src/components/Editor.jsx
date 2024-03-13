import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

const MyEditorComponent = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	// Функция для обновления состояния редактора при вводе текста
	const handleEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
	};

	// Функция для сохранения содержимого редактора в базу данных MongoDB
	const createContentToMongoDB = async () => {
		try {
			const contentState = editorState.getCurrentContent();
			const rawContent = convertToRaw(contentState);



			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.post('https://btw-server.up.railway.app/api/ins', {
				title: "Test instruction",
				body: JSON.stringify(rawContent),
				category: "reglament",
				department: "Truba"

			});


		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};



	const saveInsToMongoDB = async () => {
		try {

			const contentState = editorState.getCurrentContent();
			const rawContent = convertToRaw(contentState);


			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.put('https://btw-server.up.railway.app/api/ins/65efdbf0eaaf0c8dea5fdd33', {
				body: JSON.stringify(rawContent),
			});
			console.log(response);





		} catch (error) {
			console.error('Произошла ошибка:', error);

		}
	}





	// Функция для загрузки содержимого из базы MongoDB в редактор
	const loadContentFromMongoDB = async () => {
		try {
			// Получаем данные из сервера, содержащие сохраненное содержимое
			const response = await axios.get('https://btw-server.up.railway.app/api/ins/65efdbf0eaaf0c8dea5fdd33');
			console.log(response.data);

			const { body } = response.data;

			console.log(body);


			// Преобразуем полученное содержимое из JSON в объект Draft.js и устанавливаем его в редактор
			const contentState = convertFromRaw(JSON.parse(body));
			const newEditorState = EditorState.createWithContent(contentState);
			setEditorState(newEditorState);

			console.log('Содержимое успешно загружено из базы MongoDB.');
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};









	const uploadImageCallback = async (file) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await fetch('https://api.imgur.com/3/image', {
				method: 'POST',
				headers: {
					Authorization: 'Client-ID 1db65d3bddf681a', // Вставьте ваш Client ID Imgur
				},
				body: formData,
			});

			if (!response.ok) {
				throw Error(response.statusText);
			}

			console.log(response);
			

			const data = await response.json();
			return { data: { link: data.data.link } };
		} catch (error) {
			console.error('Error uploading image to Imgur:', error);
			return { error: 'Failed to upload image' };
		}
	};














	return (
		<div>
			<Editor
				editorState={editorState}
				onEditorStateChange={handleEditorStateChange}
				wrapperClassName="wrapper-class"
				editorClassName="editor-class"
				toolbarClassName="toolbar-class"
				toolbar={{
					// image: {
					// 	uploadCallback: uploadImageCallback,
					// 	alt: { present: true, mandatory: true },
					// },
					options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
					inline: {
						options: ['bold', 'italic', 'underline', 'strikethrough'],
					},
					blockType: {
						inDropdown: true,
						options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
					},
					fontSize: {
						options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
					},
					fontFamily: {
						options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
					},
					textAlign: {
						inDropdown: true,
					},
					list: {
						inDropdown: true,
					},
					history: {
						inDropdown: true,
					},
				}}
			/>

			<div
				className="flex flex-col items-center space-y-2 p-2"
			>
				<button onClick={createContentToMongoDB} className="bg-green-500 rounded " >Создать новую инструкцию в MongoDB</button>
				<button onClick={loadContentFromMongoDB} className="bg-sky-500 rounded " >Загрузить содержимое из MongoDB</button>
				<button onClick={saveInsToMongoDB} className="bg-emerald-500 rounded " > Сохранить изменения в MongoDB</button>
			</div>
		</div>
	);
};

export default MyEditorComponent;
