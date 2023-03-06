
import './App.css';
import Counter from './hooks/contextapi/Counter.js';
import { StoreProvider } from './store';
import TestComponent from './TestComponent';



function App() {
	return (
		// <StoreProvider>
		// 	<Counter />
		// </StoreProvider>

		<TestComponent />

	);
}

export default App;
