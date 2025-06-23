import React from 'react';

function Header({ isAuthenticated, setCurrentView, onLogout, userProfile, userProfileImage }) {
  const isMentor = userProfile?.role === 'mentor';

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 text-[#111518]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SkillHive</h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <div className="flex items-center gap-4 md:gap-9">
          <a
            className="text-[#111518] text-sm font-medium leading-normal cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            Home
          </a>
          <a
            className="text-[#111518] text-sm font-medium leading-normal cursor-pointer"
            onClick={() => setCurrentView('explore')}
          >
            Explore
          </a>
          {isAuthenticated && (
            <>
              <a
                className="text-[#111518] text-sm font-medium leading-normal cursor-pointer"
                onClick={() => setCurrentView('myNetwork')}
              >
                My Network
              </a>
              <a
                className="text-[#111518] text-sm font-medium leading-normal cursor-pointer"
                onClick={() => setCurrentView('community')}
              >
                Community
              </a>
            </>
          )}
          {isMentor && (
            <>
              <a
                className="text-[#111518] text-sm font-medium leading-normal cursor-pointer"
                onClick={() => setCurrentView('sessions')}
              >
                Sessions
              </a>
              <a className="text-[#111518] text-sm font-medium leading-normal cursor-pointer" onClick={() => setCurrentView('earnings')}>
                Earnings
              </a>
            </>
          )}
        </div>
        {isAuthenticated ? (
          <>
            {/* Notification Bell Button */}
            <button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
              onClick={() => console.log("Notification bell clicked")} // Placeholder for notification logic
            >
              <div className="text-[#111518]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                  ></path>
                </svg>
              </div>
            </button>
            {/* Profile Image (clickable to Mentor Profile Page) */}
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
              style={{ backgroundImage: `url("${userProfileImage}")` }}
              onClick={() => {
                if (isMentor) {
                  setCurrentView('mentorProfile');
                } else {
                  // Future: navigate to a mentee profile page or general settings
                  console.log('Profile icon clicked for non-mentor user.');
                }
              }}
              title={isMentor ? 'Go to Mentor Profile' : 'View Profile'}
            ></div>
          </>
        ) : (
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => setCurrentView('login')}
          >
            <span className="truncate">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
