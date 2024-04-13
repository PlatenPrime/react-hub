import React, { useState } from 'react';

import './App.css';

import MyEditor from "./components/Editor"
import ImageUploader from './components/ImageUploader';
import Editor from './components/QuillEditor/Editor';
import AspectRatio from './components/Tailwind/Layout/AspectRatio';
import Columns from './components/Tailwind/Layout/Columns';
import Break from './components/Tailwind/Layout/Break';
import Drag from './components/Drag/Drag';
import FolderCard from './components/Folder/FolderCard';
import FolderIcon from './components/Folder/FolderIcon';



function App() {


	const handleFolderClick = (folderName) => {
		console.log(`Clicked on folder: ${folderName}`);
		// Здесь можно написать логику для перехода к определенной группе документов
	};


	return (
		<div className="App">

			<FolderCard color="blue" text="Folder 1" onClick={() => handleFolderClick("Folder 1")} />
			<FolderCard color="green" text="Folder 2" onClick={() => handleFolderClick("Folder 2")} />

			<FolderIcon color="blue" size={200} text="Fold" />

		</div>
	)
}

export default App;