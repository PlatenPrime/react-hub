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
	const saveContentToMongoDB = async () => {
		try {
			const contentState = editorState.getCurrentContent();
			const rawContent = convertToRaw(contentState);
			console.log(rawContent);
			console.log(JSON.stringify(rawContent));


			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.post('/api/saveContent', {
				content: JSON.stringify(rawContent),
			});

			if (response.data.success) {
				console.log('Содержимое успешно сохранено в базу MongoDB.');
			} else {
				console.error('Ошибка при сохранении содержимого в базу MongoDB:', response.data.error);
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	// Функция для загрузки содержимого из базы MongoDB в редактор
	const loadContentFromMongoDB = async () => {
		try {
			// Получаем данные из сервера, содержащие сохраненное содержимое
			const response = await axios.get('/api/getContent');
			const { content } = response.data;

			// Преобразуем полученное содержимое из JSON в объект Draft.js и устанавливаем его в редактор
			const contentState = convertFromRaw(JSON.parse(content));
			const newEditorState = EditorState.createWithContent(contentState);
			setEditorState(newEditorState);

			console.log('Содержимое успешно загружено из базы MongoDB.');
		} catch (error) {
			console.error('Произошла ошибка:', error);
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
			<button onClick={saveContentToMongoDB}>Сохранить содержимое в MongoDB</button>
			<button onClick={loadContentFromMongoDB}>Загрузить содержимое из MongoDB</button>
		</div>
	);
};

export default MyEditorComponent;
