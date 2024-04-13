import React from 'react';
import './FolderCard.css'; // Подключаем файл стилей для карточек папок

const FolderCard = ({ color, text, onClick }) => {
	return (
		<div className="folder-card" style={{ backgroundColor: color }} onClick={onClick}>
			<div className="folder"></div>
			<p className="folder-text">{text}</p>
		</div>
	);
};

export default FolderCard;

