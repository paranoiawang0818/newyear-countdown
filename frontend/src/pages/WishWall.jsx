import { useEffect, useState } from 'react';
import { wishesAPI } from '../services/api';

const WishWall = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await wishesAPI.getPublicWishes();
      setWishes(response.data.wishes);
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-secondary">
          💫 心愿墙 💫
        </h1>

        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : wishes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            暂无公开心愿，快来抢占沙发！
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-secondary transition-all hover:shadow-xl"
              >
                <p className="text-gray-200 mb-4 text-lg leading-relaxed">
                  {wish.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-700 pt-4">
                  <span className="text-secondary font-semibold">
                    {wish.user.username}
                  </span>
                  <span>
                    {new Date(wish.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishWall;
