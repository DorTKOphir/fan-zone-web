import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MatchList from './pages/MatchList';
import Chat from './pages/Chat';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import PostComments from './pages/PostComments';
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
							<Route path="/:matchId" element={<MatchDetails />} />
							<Route path="/:matchId/:postId" element={<PostComments />} />
							<Route path="/chat" element={<Chat />} />
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
