import React from 'react';

function MentorDashboardPage({ setCurrentView }) { // Receive setCurrentView prop
  return (
    <div className="gap-1 px-4 md:px-6 flex flex-1 justify-center py-5 flex-col md:flex-row">
      {/* Mentor Tools Sidebar */}
      <div className="layout-content-container flex flex-col w-full md:w-80">
        <div className="flex h-full min-h-[500px] md:min-h-[700px] flex-col justify-between bg-white p-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#121516] text-base font-medium leading-normal">Mentor Tools</h1>
            <div className="flex flex-col gap-2">
              {/* Dashboard Link */}
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#f1f2f4] cursor-pointer"
                onClick={() => setCurrentView('mentorDashboard')} // Stay on dashboard
              >
                <div className="text-[#121516]" data-icon="House" data-size="24px" data-weight="fill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-[#121516] text-sm font-medium leading-normal">Dashboard</p>
              </div>
              {/* Profile Link */}
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                // onClick={() => setCurrentView('mentorProfile')} {/* Navigate to mentor profile page */}
              >
                <div className="text-[#121516]" data-icon="User" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-[#121516] text-sm font-medium leading-normal">Profile</p>
              </div>
              {/* Availability Link */}
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('availability')} // Navigate to availability page
              >
                <div className="text-[#121516]" data-icon="Calendar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-[#121516] text-sm font-medium leading-normal">Availability</p>
              </div>
              {/* Sessions Link */}
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('sessions')} // Navigate to sessions page
              >
                <div className="text-[#121516]" data-icon="Video" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l25.58,17ZM216,40H40A16,16,0,0,0,24,56V168a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,128H40V56H216V168Zm16,40a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-[#121516] text-sm font-medium leading-normal">Sessions</p>
              </div>
              {/* Earnings Link */}
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('earnings')} // Navigate to earnings page
              >
                <div className="text-[#121516]" data-icon="CurrencyDollar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-[#121516] text-sm font-medium leading-normal">Earnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Dashboard Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Dashboard</p>
            <p className="text-[#6a7781] text-sm font-normal leading-normal">Welcome back, Alex</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f1f2f4]">
            <p className="text-[#121516] text-base font-medium leading-normal">Total Earnings</p>
            <p className="text-[#121516] tracking-light text-2xl font-bold leading-tight">$5,250</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f1f2f4]">
            <p className="text-[#121516] text-base font-medium leading-normal">Average Rating</p>
            <p className="text-[#121516] tracking-light text-2xl font-bold leading-tight">4.9 ★</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Quick Actions</h2>
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => console.log("View Mentees clicked")} // Placeholder
            >
              <span className="truncate">View Mentees</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => console.log("Performance Insights clicked")} // Placeholder
            >
              <span className="truncate">Performance Insights</span>
            </button>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Upcoming Sessions</h2>
        <div className="flex flex-col px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            <div
              className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrfVY-lTIrXy_iaOcrjdA6CBVQ8_29vS7H_ibR4-f7dJ2vPv3X_k2BnNZ3MoRZFMvsQshxJE5cs6uch4dMz7SzCzjruLV6Zs2oHmntGVYjIDJ570f4qY64l9ft4l6K33PjQ7HinmkLB-8eiP1IsrphhjMY6EyNv73g39frCL4oBUXKYN22uvpM9r4qyo9ESSq8NNBPojnWKcOd5q4p695ksJWgjeU77jTIS4osIzf_ftGoq5LeNMyo7vrvailhIny2gf1HPZhO5D4")' }}
            ></div>
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-[#121516] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">No upcoming sessions</p>
              <p className="text-[#121516] text-sm font-normal leading-normal max-w-[480px] text-center">
                You have no sessions scheduled for the next 7 days. Check your availability settings to attract more mentees.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => setCurrentView('availability')} // Navigate to availability page
            >
              <span className="truncate">Update Availability</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboardPage;
