import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (username.length < 3) {
      setError('用户名至少3个字符');
      return;
    }

    if (password.length < 6) {
      setError('密码至少6个字符');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setLoading(true);

    const result = await register(username, password);

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
        <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
          注册
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
              placeholder="至少3个字符"
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
              placeholder="至少6个字符"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
              placeholder="再次输入密码"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-secondary hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-lg text-gray-900 transition-colors"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          已有账号？{' '}
          <Link to="/login" className="text-primary hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
