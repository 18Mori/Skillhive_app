import React from 'react';

function Header({ isAuthenticated, setCurrentView }) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 text-[#121516]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-[#121516] text-lg font-bold leading-tight tracking-[-0.015em]">SkillHive</h2>
      </div>
      {!isAuthenticated && (
        <div className="flex flex-1 justify-end gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-4 md:gap-9">
            <a className="text-[#121516] text-sm font-medium leading-normal hover:underline" href="#">Home</a>
            <a className="text-[#121516] text-sm font-medium leading-normal hover:underline" href="#">About</a>
            <a className="text-[#121516] text-sm font-medium leading-normal hover:underline" href="#">Contact</a>
          </div>
          <button
            onClick={() => setCurrentView('login')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e0e2e5] transition-colors duration-200"
          >
            <span className="truncate">Log In</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
