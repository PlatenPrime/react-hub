
import './App.css';
import Counter from './hooks/contextapi/Counter.js';
import { StoreProvider } from './store';



function App() {
	return (
		<StoreProvider>
			<Counter />
		</StoreProvider>
	);
}

export default App;
