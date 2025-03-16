import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MatchList from './components/ui/MatchList';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<MatchList />} />
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
