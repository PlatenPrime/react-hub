import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ImageUpload = Quill.import('formats/image');

class CustomImageBlot extends ImageUpload {
	static create(value) {
		let node = super.create(value);
		node.setAttribute('alt', value.alt);
		node.setAttribute('title', value.title);
		return node;
	}
}

Quill.register(CustomImageBlot);

const QuillEditor = () => {
	const [editorHtml, setEditorHtml] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const handleImageUpload = async (file) => {
		try {
			const formData = new FormData();
			formData.append('image', file);

			const response = await fetch('https://api.imgur.com/3/image', {
				method: 'POST',
				headers: {
					Authorization: 'Client-ID 1db65d3bddf681a', // Replace YOUR_IMGUR_CLIENT_ID with your actual Imgur client ID
				},
				body: formData,
			});

			const data = await response.json();
			const imageUrl = data.data.link;
			setImgUrl(imageUrl);
			insertToEditor(imageUrl);
		} catch (error) {
			console.error('Error uploading image to Imgur:', error);
		}
	};

	const insertToEditor = (imageUrl) => {
		const range = quillRef.getEditor().getSelection();
		quillRef.getEditor().insertEmbed(range ? range.index : 0, 'image', imageUrl, 'user');
	};

	const modules = {
		toolbar: {
			container: [
				[{ 'header': [1, 2, false] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ 'color': [] }, { 'background': [] }],
				[{ 'align': [] }],
				[{ 'list': 'ordered' }, { 'list': 'bullet' }],
				['link', 'image'],
				['clean']
			],
			handlers: {
				image: () => {
					const input = document.createElement('input');
					input.setAttribute('type', 'file');
					input.setAttribute('accept', 'image/*');
					input.click();
					input.onchange = async () => {
						const file = input.files[0];
						handleImageUpload(file);
					};
				},
			},
		},
	};

	const formats = [
		'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
		'color', 'background',
		'align',
		'list', 'bullet',
		'link', 'image'
	];

	const handleChange = (html) => {
		setEditorHtml(html);
	};

	let quillRef;

	const handleQuillRef = (ref) => {
		if (ref) {
			quillRef = ref;
		}
	};

	return (
		<div>
			<ReactQuill
				ref={handleQuillRef}
				theme="snow"
				value={editorHtml}
				onChange={handleChange}
				modules={modules}
				formats={formats}
			/>
			{imgUrl && <img src={imgUrl} alt="Uploaded" />}
		</div>
	);
};

export default QuillEditor;
