import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MatchList from './components/ui/MatchList';

function App() {
	return (
		<Router>
			<div className="flex flex-col items-center justify-center min-h-screen space-y-6">
				<h1 className="text-3xl font-bold text-center">Fan Zone</h1>
				<Routes>
					<Route path="/" element={<MatchList />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
