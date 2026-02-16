import { useEffect, useState } from 'react';
import { wishesAPI } from '../services/api';

const Admin = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState('all'); // all, visible, hidden

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await wishesAPI.getAllWishes();
      setWishes(response.data.wishes);
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    setUpdating(id);
    try {
      await wishesAPI.updateVisibility(id, !currentVisibility);
      setWishes(
        wishes.map((wish) =>
          wish.id === id ? { ...wish, isVisible: !wish.isVisible } : wish
        )
      );
    } catch (err) {
      alert('更新失败：' + (err.response?.data?.error || '请重试'));
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定要删除这条心愿吗？')) return;

    setUpdating(id);
    try {
      await wishesAPI.delete(id);
      setWishes(wishes.filter((wish) => wish.id !== id));
    } catch (err) {
      alert('删除失败：' + (err.response?.data?.error || '请重试'));
    } finally {
      setUpdating(null);
    }
  };

  const filteredWishes = wishes.filter((wish) => {
    if (filter === 'visible') return wish.isVisible;
    if (filter === 'hidden') return !wish.isVisible;
    return true;
  });

  const stats = {
    total: wishes.length,
    visible: wishes.filter((w) => w.isVisible).length,
    hidden: wishes.filter((w) => !w.isVisible).length,
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-accent">
          ⭐ 管理后台 ⭐
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
            <div className="text-gray-400">总心愿数</div>
          </div>
          <div className="p-6 bg-green-900 bg-opacity-30 backdrop-blur-sm rounded-xl border border-green-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{stats.visible}</div>
            <div className="text-gray-400">已公开</div>
          </div>
          <div className="p-6 bg-yellow-900 bg-opacity-30 backdrop-blur-sm rounded-xl border border-yellow-700 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.hidden}</div>
            <div className="text-gray-400">待审核</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-secondary text-gray-900'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            全部 ({stats.total})
          </button>
          <button
            onClick={() => setFilter('visible')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'visible'
                ? 'bg-green-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            已公开 ({stats.visible})
          </button>
          <button
            onClick={() => setFilter('hidden')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'hidden'
                ? 'bg-yellow-600 text-gray-900'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            待审核 ({stats.hidden})
          </button>
        </div>

        {/* Wishes List */}
        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : filteredWishes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">暂无数据</div>
        ) : (
          <div className="space-y-4">
            {filteredWishes.map((wish) => (
              <div
                key={wish.id}
                className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-accent transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-secondary font-semibold">
                      {wish.user.username}
                    </span>
                    {wish.isVisible ? (
                      <span className="px-3 py-1 bg-green-900 bg-opacity-30 border border-green-600 text-green-400 rounded-full text-sm">
                        已公开
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-900 bg-opacity-30 border border-yellow-600 text-yellow-400 rounded-full text-sm">
                        待审核
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(wish.createdAt).toLocaleString('zh-CN')}
                  </span>
                </div>

                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  {wish.content}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleToggleVisibility(wish.id, wish.isVisible)}
                    disabled={updating === wish.id}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      wish.isVisible
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-gray-900'
                        : 'bg-green-600 hover:bg-green-700'
                    } disabled:bg-gray-600`}
                  >
                    {updating === wish.id
                      ? '处理中...'
                      : wish.isVisible
                      ? '设为隐藏'
                      : '设为公开'}
                  </button>
                  <button
                    onClick={() => handleDelete(wish.id)}
                    disabled={updating === wish.id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
