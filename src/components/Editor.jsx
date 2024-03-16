import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';


const MyEditorComponent = () => {

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const [loadedContent, setLoadedContent] = useState('');
	const [loadedEditorState, setLoadedEditorState] = useState(EditorState.createEmpty());



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



	const loadArticleFromMongoDB = async () => {
		try {
			// Получаем данные из сервера, содержащие сохраненное содержимое
			const response = await axios.get('https://btw-server.up.railway.app/api/ins/65efdbf0eaaf0c8dea5fdd33');
			console.log(response.data);

			const { body } = response.data;

			console.log(body);

			// Просто устанавливаем содержимое в состояние вашего компонента как текст
			setLoadedContent(body);

			const contentState = convertFromRaw(JSON.parse(body));
			const newEditorState = EditorState.createWithContent(contentState);
			setLoadedEditorState(newEditorState);

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
				localization={{
					locale: 'ru',
				}}
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
					colorPicker: {
						// icon:  <AiFillAlipayCircle />,
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						colors: ['rgb(239 68 68)', 'rgb(0 0 0)', 'rgb(255 255 255)', 'rgb(248 250 252)'],
					},



				}}
			/>

			<div
				className="grid grid-cols-4 gap-2 p-2"
			>
				<button onClick={createContentToMongoDB} className="bg-green-500 rounded p-2 text-white hover:bg-green-400" >Создать</button>
				<button onClick={loadContentFromMongoDB} className="bg-sky-500 rounded p-2 text-white hover:bg-sky-400 " >Загрузить</button>
				<button onClick={saveInsToMongoDB} className="bg-emerald-500 rounded p-2 text-white hover:bg-emerald-400 " > Сохранить</button>
				<button onClick={loadArticleFromMongoDB} className="bg-pink-500 rounded p-2 text-white hover:bg-pink-400 " > Статья</button>
			</div>
			<div>
				{/* Здесь выводим загруженный текст в виде статьи */}
				<article
					className="text-white"
				>
					<h1>Заголовок статьи</h1>


					<Editor
						editorState={loadedEditorState}
						wrapperClassName="wrapper-class"
						editorClassName="editor-class"
						toolbarClassName="toolbar-class"
						readOnly
						toolbarHidden
					/>
				</article>
			</div>





		</div>
	);
};

export default MyEditorComponent;
