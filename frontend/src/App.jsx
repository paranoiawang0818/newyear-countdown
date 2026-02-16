import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WishWall from './pages/WishWall';
import MyWishes from './pages/MyWishes';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wish-wall" element={<WishWall />} />
          <Route
            path="/login"
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/register"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />
          <Route
            path="/my-wishes"
            element={
              <AuthGuard requireAuth>
                <MyWishes />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard requireAuth requireAdmin>
                <Admin />
              </AuthGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
