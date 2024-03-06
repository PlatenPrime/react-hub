import React, { useState } from 'react';

import './App.css';

import MyEditor from "./components/Editor"



function App() {


	return (
		<div className="App">
			<header className="App-header">
				Rich Text Editor Example
			</header>
			<MyEditor />
		</div>
	)
}

export default App;