import { useEffect, useState } from 'react';
import { wishesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyWishes = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await wishesAPI.getMyWishes();
      setWishes(response.data.wishes);
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定要删除这条心愿吗？')) return;

    setDeleting(id);
    try {
      await wishesAPI.delete(id);
      setWishes(wishes.filter((wish) => wish.id !== id));
    } catch (err) {
      alert('删除失败：' + (err.response?.data?.error || '请重试'));
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (isVisible) => {
    return isVisible ? (
      <span className="px-3 py-1 bg-green-900 bg-opacity-30 border border-green-600 text-green-400 rounded-full text-sm">
        已公开
      </span>
    ) : (
      <span className="px-3 py-1 bg-yellow-900 bg-opacity-30 border border-yellow-600 text-yellow-400 rounded-full text-sm">
        待审核
      </span>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          我的心愿
        </h1>

        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : wishes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            您还没有提交心愿，去首页写下您的新年愿望吧！
          </div>
        ) : (
          <div className="space-y-6">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-primary transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  {getStatusBadge(wish.isVisible)}
                  <button
                    onClick={() => handleDelete(wish.id)}
                    disabled={deleting === wish.id}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg transition-colors"
                  >
                    {deleting === wish.id ? '删除中...' : '删除'}
                  </button>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  {wish.content}
                </p>
                <div className="text-sm text-gray-500">
                  提交时间：{new Date(wish.createdAt).toLocaleString('zh-CN')}
                  {wish.updatedAt !== wish.createdAt && (
                    <span className="ml-4">
                      更新时间：{new Date(wish.updatedAt).toLocaleString('zh-CN')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishes;
