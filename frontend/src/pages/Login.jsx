import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          登录
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
              placeholder="请输入用户名"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
              placeholder="请输入密码"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-colors"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          还没有账号？{' '}
          <Link to="/register" className="text-secondary hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
