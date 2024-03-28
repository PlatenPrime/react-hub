import React, { useState } from 'react';

const ImageUploader = () => {
	const [imageUrl, setImageUrl] = useState('');

	const uploadImage = async (file) => {
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

			console.log(response);
			

			// if (!response.ok) {
			// 	throw new Error('Failed to upload image');
			// }

			const data = await response.json();
			setImageUrl(data.data.link);
		} catch (error) {
			console.error('Error uploading image to Imgur:', error);
		}
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			uploadImage(file);
		}
	};

	return (
		<div
		className="text-white"
		>
			<input type="file" onChange={handleFileInputChange} />
			<br />
			<label>Ссылка на загруженное изображение:</label>
			<p>{imageUrl} </p>
			<br />
			{imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />}
		</div>
	);
};

export default ImageUploader;
