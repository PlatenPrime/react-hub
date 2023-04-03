
import './App.css';
import Counter from './hooks/contextapi/Counter.js';
import RingComponent from './RingComponent';
import { StoreProvider } from './store';
import TestComponent from './TestComponent';



function App() {
	return (
		// <StoreProvider>
		// 	<Counter />
		// </StoreProvider>

		<>
			<TestComponent />
			<RingComponent />
		</>
	);
}

export default App;
