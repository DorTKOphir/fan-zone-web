import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MatchList from './pages/MatchList';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import MatchDetails from './pages/MatchDetails';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route element={<Layout />}>
							<Route path="/" element={<MatchList />} />
							<Route path="/match/:matchId" element={<MatchDetails />} />
						</Route>
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
