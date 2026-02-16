import { useEffect, useState } from 'react';

const NewYearMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-02-17T00:00:00').getTime();
    const now = new Date().getTime();
    setShowMessage(now >= targetDate);
  }, []);

  if (!showMessage) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-bounce-slow bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          🎊 新年快乐! 🎊
        </h1>
        <p className="text-2xl md:text-4xl text-gray-300 mb-12">
          愿你新的一年充满快乐和幸福!
        </p>
        <div className="text-6xl md:text-8xl animate-pulse-slow">
          🎆 ✨ 🎇 🌟 🎆
        </div>
      </div>
    </div>
  );
};

export default NewYearMessage;
