import React from 'react';

function MenteeDashboardPage({ setCurrentView, userProfile }) {
  const displayProfileImage = userProfile?.userProfileImage || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=User';

  return (
    <div className="gap-1 px-4 md:px-6 flex flex-1 justify-center py-5 flex-col md:flex-row">
      {/* Sidebar for navigation (Mentee Tools) */}
      <div className="layout-content-container flex flex-col w-full md:w-80">
        <div className="flex h-full min-h-[500px] md:min-h-[700px] flex-col justify-between bg-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: `url("${displayProfileImage}")` }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-[#111518] text-base font-medium leading-normal">{userProfile?.fullName || 'Mentee'}</h1>
                <p className="text-[#637888] text-sm font-normal leading-normal">Mentee</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#f0f3f4] cursor-pointer"
                onClick={() => setCurrentView('menteeDashboard')}
              >
                <div className="text-[#111518]" data-icon="House" data-size="24px" data-weight="fill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Home</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('explore')}
              >
                <div className="text-[#111518]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Explore</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('menteeSessions')}
              >
                <div className="text-[#111518]" data-icon="Calendar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">My Sessions</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('community')}
              >
                <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Community</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('viewMenteeProfile')} // Assuming mentee can view their own profile
              >
                <div className="text-[#111518]" data-icon="UserCircle" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 py-5">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Mentee Dashboard</p>
            <p className="text-[#6a7781] text-sm font-normal leading-normal">
              Welcome to your mentee dashboard.
            </p>
          </div>
        </div>
        {/* Placeholder for dashboard content */}
        <div className="p-4 bg-[#f1f2f4] rounded-xl flex items-center justify-center h-48 text-[#6a7781]">
          Dashboard content coming soon!
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboardPage;
