import React, { useState } from 'react';

import './App.css';

import MyEditor from "./components/Editor"
import ImageUploader from './components/ImageUploader';
import Editor from './components/QuillEditor/Editor';
import AspectRatio from './components/Tailwind/Layout/AspectRatio';
import Columns from './components/Tailwind/Layout/Columns';
import Break from './components/Tailwind/Layout/Break';
import Drag from './components/Drag/Drag';



function App() {


	return (
		<div className="App">

			<Drag />

		</div>
	)
}

export default App;