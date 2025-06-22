import React, { useState } from 'react';

function SessionsPage({ setCurrentView }) {
  // State to manage which tab is active: 'upcoming' or 'past'
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Career Coaching",
      date: "July 15, 2024, 2:00 PM - 3:00 PM",
      mentee: "Sarah Chen",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs4lBlsvF_efK_0gpxYRpeEJtqcMrWvRz6EPGmy5aaQTIA67BeqdHWU63CYeeZvACy8tydsoKiOGcfb06IbLWsuiYCVPYNOo39tObDdflG2M8XpZew8JNSlwuSyVUiuAVZlUYgCgdOukf2jiohQhx_A_vG1roQepgCI8zd8OuITA-xk2GGBmwOvk5Owbf6ZeqVoOcf6YF9CdbP-kcuVShT0xjpUKEbTHAApx9-UV6XucpX1emXK8Zfb7TFZoR9Sl8tSRGOMDYrxSI",
      actions: [
        { text: "Join Session", handler: () => alert("Joining session for Career Coaching...") },
      ]
    },
    {
      id: 2,
      title: "Resume Review",
      date: "July 20, 2024, 10:00 AM - 11:00 AM",
      mentee: "Alex Johnson",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYjCGtPdzYvE8Fe63j7ww__YjJtLCFtfpQ_SqZ_L3UcGZhV-MXUGyydHETOwQi5zrCiD_ePehD7MaDg0SDUlhHKIBvh5OqPjq1TVmazS_TtMsSDnPtHPhhpBpTMFgRch1n-IDvKLqj3EZCWY2EvRUd2BUlKA0rUVUQQD1KzUMRDcU3MVPEBHgrgMwPsI_Vju7IGGogjGTWToO628GiWoS2RaxTJf8QzG4nGY4clWweBhJCx6-Pih_ZQz6xn_D5y1ZcpiJRHsitGiU",
      actions: [
        { text: "Reschedule", handler: () => alert("Rescheduling session for Resume Review...") },
      ]
    },
  ];

  // Mock data for past sessions
  const pastSessions = [
    {
      id: 3,
      title: "Interview Prep",
      date: "June 20, 2024, 3:00 PM - 4:00 PM",
      mentee: "Emily Davis",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuAuTyJRREIz1Dxf6GsPXpYzikeJ2wBaSIwiqXLkFNjvp7Ji0L3PzRW7hK8R7GM1-Lxq__D5AizOBq40YEYDpqaqZ-jUF9-foaCwpwg4WZqAzrOKKJikR_eSbHQRNiNET16cD5gyz6I2UjjoG73sxOtUpQGgKaz16au7szS6rqQcu1-t-6JhVyQhq3cgRLJJv-EmPyZDn4-Wf5s09xO8ziGEuAAggl-Z_x9Z7K_dmdgFJ7gu33MNRBYucpJAEDipiq_SAYwvZk-5s",
      status: "Completed"
    },
    {
      id: 4,
      title: "Career Advice",
      date: "June 15, 2024, 11:00 AM - 12:00 PM",
      mentee: "Michael Brown",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxsizg7-zwaPqGKzzacUyiikLzuO9zRoz9p2xMWQTI73afEVgq1Y8TqGfUzy1qWSB-HWxGzPA_K-KzFxDSDHuQ3Gk8hLf1dzEee5bgEy4qKPWIZg_MpzhGVcaw2aRb-PuNQYGXFS-zXjJrWnygq2iRQCFKJR9f8AXQWapi7y1vFo_Zo1kmMw6_6cS0aeq38Zbt3TWf1tl7j_T1T6YWFJpE98f_0_W_-jDuio8tdyDrVRqOqq3yWTwa6BFlkPH-04aMz2bbIRO-0rg",
      status: "Completed"
    },
  ];

  return (
    <div className="gap-1 px-4 md:px-6 flex flex-1 justify-center py-5 flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="layout-content-container flex flex-col w-full md:w-80">
        <div className="flex h-full min-h-[500px] md:min-h-[700px] flex-col justify-between bg-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCAw6gmE29bAkajTIGahI7EMnk2mHbLFHP3GNXe4BsLrH3zAV5gaDBTvqbdo4aydPN3NFa6wnG9LNia76PCXk9d49viA5Kno_0Z-L0HJDrLnDW3i5Hqo5boq6DdOgFp_bTfMes6IKBjif0NTxKBRJVFHdm2r1suXMfjG85rmpRylwmYaZn71vRu9U922BHh8ZE8lIXJQRZtcxOVrLlWAJwVcmT2BEwgQYO6PUjKYqb7B3MtxAO7euZurmov-pBhOF0jkVMoQj4j2k")' }}
              ></div>
              <h1 className="text-[#111518] text-base font-medium leading-normal">SkillHive</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                <div className="text-[#111518]" data-icon="House" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Home</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('explore')}
              >
                <div className="text-[#111518]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Matches</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#f0f3f4] cursor-pointer"
                onClick={() => setCurrentView('sessions')}
              >
                <div className="text-[#111518]" data-icon="Calendar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Sessions</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('community')}
              >
                <div className="text-[#111518]" data-icon="UsersThree" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Community</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('availability')}
              >
                <div className="text-[#111518]" data-icon="Calendar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Availability</p>
              </div>
              <div
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                onClick={() => setCurrentView('earnings')}
              >
                <div className="text-[#111518]" data-icon="CurrencyDollar" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Earnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight">My Sessions</p>
            <p className="text-[#637888] text-sm font-normal leading-normal">Manage your upcoming and past mentorship sessions.</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pb-3">
          <div className="flex border-b border-[#dce1e5] px-4 gap-8">
            <button
              className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'upcoming' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Upcoming Sessions</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'past' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
              onClick={() => setActiveTab('past')}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Past Sessions</p>
            </button>
          </div>
        </div>

        {/* Conditional rendering of sessions based on activeTab */}
        {activeTab === 'upcoming' && (
          <>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Upcoming Sessions</h2>
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map(session => (
                <div key={session.id} className="flex gap-4 bg-white px-4 py-3 justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[70px] w-fit"
                      style={{ backgroundImage: `url("${session.imageUrl}")` }}
                    ></div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-[#111518] text-base font-medium leading-normal">Session: {session.title}</p>
                      <p className="text-[#637888] text-sm font-normal leading-normal">Date: {session.date}</p>
                      <p className="text-[#637888] text-sm font-normal leading-normal">Mentee: {session.mentee}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex gap-2">
                    {session.actions.map((action, index) => (
                      <button
                        key={index}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-fit"
                        onClick={action.handler}
                      >
                        <span className="truncate">{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#637888] text-base font-normal leading-normal px-4 py-3">No upcoming sessions.</p>
            )}
          </>
        )}

        {activeTab === 'past' && (
          <>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Past Sessions</h2>
            {pastSessions.length > 0 ? (
              pastSessions.map(session => (
                <div key={session.id} className="flex gap-4 bg-white px-4 py-3 justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[70px] w-fit"
                      style={{ backgroundImage: `url("${session.imageUrl}")` }}
                    ></div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-[#111518] text-base font-medium leading-normal">Session: {session.title}</p>
                      <p className="text-[#637888] text-sm font-normal leading-normal">Date: {session.date}</p>
                      <p className="text-[#637888] text-sm font-normal leading-normal">Mentee: {session.mentee}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <p className="text-[#111518] text-base font-normal leading-normal">{session.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#637888] text-base font-normal leading-normal px-4 py-3">No past sessions.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SessionsPage;
