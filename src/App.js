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
import FetchingDataInReact from './components/Cosden/FetchingDataInReact';



function App() {

	return (
		<div className="App">

			<FetchingDataInReact />

		</div>
	)
}

export default App;