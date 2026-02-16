import { useEffect, useState } from 'react';
import { wishesAPI } from '../services/api';
import CountdownTimer from '../components/CountdownTimer';
import NewYearMessage from '../components/NewYearMessage';
import WishForm from '../components/WishForm';

const Home = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchWishes();
  }, []);

  const targetDate = new Date('2026-02-17T00:00:00').getTime();
  const now = new Date().getTime();
  const isAfterNewYear = now >= targetDate;

  return (
    <div className="min-h-screen">
      {/* Countdown or New Year Message */}
      <div className="py-12 px-4">
        {isAfterNewYear ? <NewYearMessage /> : <CountdownTimer />}
      </div>

      {/* Wish Form */}
      <WishForm onWishCreated={fetchWishes} />

      {/* Public Wishes Preview */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-secondary">
            💫 心愿墙 💫
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : wishes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            暂无心愿，快来抢占沙发！
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishes.slice(0, 6).map((wish) => (
              <div
                key={wish.id}
                className="p-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-secondary transition-colors"
              >
                <p className="text-gray-200 mb-3">{wish.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="text-secondary font-semibold">
                    {wish.nickname || '匿名'}
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

export default Home;
