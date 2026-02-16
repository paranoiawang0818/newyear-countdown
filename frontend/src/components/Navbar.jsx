import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            🎆 新年倒计时
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-300">
                  欢迎, {user?.username}
                  {isAdmin && <span className="ml-2 text-accent">⭐管理员</span>}
                </span>
                <Link
                  to="/my-wishes"
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-cyan-400 transition-colors"
                >
                  我的心愿
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-lg bg-accent text-gray-900 hover:bg-yellow-400 transition-colors"
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-pink-700 transition-colors"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
