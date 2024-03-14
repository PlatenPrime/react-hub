import React, { useState } from 'react';

import './App.css';

import MyEditor from "./components/Editor"



function App() {


	return (
		<div className="App">
			<header className="App-header">
				Rich Text Editor Example
			</header>

			<div
			className="w-1/2 flex justify-center mx-auto"
			>
				<MyEditor />
			</div>

		</div>
	)
}

export default App;