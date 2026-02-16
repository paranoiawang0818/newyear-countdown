import { useState } from 'react';
import { wishesAPI } from '../services/api';

const WishForm = ({ onWishCreated }) => {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!content.trim()) {
      setError('请输入您的心愿');
      return;
    }

    if (content.length > 500) {
      setError('心愿内容不能超过500字');
      return;
    }

    setLoading(true);

    try {
      await wishesAPI.create(content, nickname || undefined);
      setSuccess('心愿提交成功！已公开到心愿墙 ✨');
      setContent('');
      setNickname('');
      if (onWishCreated) {
        onWishCreated();
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || '提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
        ✨ 写下您的新年心愿 ✨
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-900 bg-opacity-30 border border-green-600 rounded-lg text-green-300">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">昵称（可选）</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="留空则为匿名"
            className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
            disabled={loading}
            maxLength={50}
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下您的新年愿望... (最多500字)"
          className="w-full p-4 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-secondary resize-none"
          rows="4"
          disabled={loading}
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">
            {content.length}/500
          </span>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {loading ? '提交中...' : '提交心愿'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WishForm;
