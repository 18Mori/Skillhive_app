import React, { useState } from 'react';

function MentorProfilePage({ setCurrentView }) {
  // State to manage which tab is active: 'about', 'reviews', or 'availability'
  const [activeTab, setActiveTab] = useState('about');

  // Mock data for skills and qualifications
  const skills = [
    "Leadership Development",
    "Executive Coaching",
    "Career Strategy",
    "Communication Skills",
    "Personal Branding",
    "Interview Preparation",
  ];

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      reviewerName: "Ethan Carter",
      timeAgo: "2 months ago",
      rating: 5,
      comment: "Dr. Sharma's coaching was instrumental in my recent promotion. Her insights into leadership and communication were invaluable.",
      likes: 12,
      dislikes: 1,
      reviewerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkhXZVXO3DnZ7TWs4B5n93Smh6UkcHKHOLP3MUhwyyvvhvfGH1ZS30QHFOCW9UCEGLfgbi8nHFlUdmPmaKY5F-Pmr6NUhtaxaeH4s2QoDgHcTIvJDEzvWzKH0hHrEojLOhJsgrEXAas_Nr2vswBpcB_AKFI9eTRWbSWzhBAKXP1cJlT6PY1Bam3mSZzzSO1affx3THUZLT_nxQxO5J3cgEGO0iCnooa3gw6MrWuJPJtreTUMIoRfp0FGk4ImCf7_yeyMWRexWmZy-LLhPAzqmRVwWnSNANT4z7r5-wMPnm_OZyLk_VEkG7k",
    },
    {
      id: 2,
      reviewerName: "Olivia Bennett",
      timeAgo: "3 months ago",
      rating: 4,
      comment: "Anya provided excellent guidance on refining my personal brand and interview skills. Highly recommend her services.",
      likes: 8,
      dislikes: 0,
      reviewerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJxw9VCPpuuM361I-2211OpHeFe8aq6liu0OWosjwYWoxTkEYFoMbDOXbTigAT7o-Z2sKpcc0BGHvsHGoBk4Zu6Do_pNYY7KbKCaDA7CTl5yhVacn_NuPVu30JBKph9yysEXXWVO0vXJd_odIg7AHLt9nNZiddE4XvIIH7OMEDpr_srBAqOpMxDLzcrWuJPJtreTUMIoRfp0FGk4ImCf7_yeyMWRexWmZy-LLhPAzqmRVwWnSNANT4z7r5-wMPnm_OZyLk_VEkG7k",
    },
  ];

  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(filledStars)].map((_, i) => (
          <div key={`filled-${i}`} className="text-[#121516]" data-icon="Star" data-size="20px" data-weight="fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
          </div>
        ))}
        {halfStar && (
          <div className="text-[#121516]" data-icon="StarHalf" data-size="20px" data-weight="fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29ZM128,40.16V173.84L82.2,216l13.51-58.6a16,16,0,0,0-5.08-15.71L32,102.35l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08Z"></path>
            </svg>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <div key={`empty-${i}`} className="text-[#bec5ca]" data-icon="Star" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
            </svg>
          </div>
        ))}
      </>
    );
  };


  return (
    <div className="gap-1 px-4 md:px-6 flex flex-1 justify-center py-5 flex-col md:flex-row">
      {/* Sidebar for navigation */}
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
                className="flex items-center gap-3 px-3 py-2 cursor-pointer"
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
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#f0f3f4] cursor-pointer"
                onClick={() => setCurrentView('mentorProfile')}
              >
                <div className="text-[#111518]" data-icon="User" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-sm font-medium leading-normal">Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Profile Header */}
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
            <div className="flex gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCczAjlW4_Zl0_HwHlYeFbPNCgIXmKBMrZuumP-V9vzkDfGfWl2JWcBnT4Dx-brgrk-d8SBisdstX60EUklixPvkyeobPHG_P5096uKUaVtJIQhxj6YRNLKy_P3Rb3C3jzzef5n6LZV6KDddMxd02voHjE1IqwtiLosXsDbeiCBM1P_9Nu8ivdg1uIwhTACk_hqtfocs3LJ4PxgRUh09zkE4bedNfiRDFU8c7ug8enPcLIROwIsQJSRBEQE5hp0KVlLe5lvq_X18Uc")' }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em]">Dr. Anya Sharma</p>
                <p className="text-[#6a7781] text-base font-normal leading-normal">Career Coach | Leadership Development | Executive Presence</p>
                <p className="text-[#6a7781] text-base font-normal leading-normal">5 years of experience</p>
              </div>
            </div>
            <button
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto"
              onClick={() => alert("Edit Profile clicked!")}
            >
              <span className="truncate">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pb-3">
          <div className="flex border-b border-[#dde1e3] px-4 gap-8">
            <button
              className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'about' ? 'border-b-[3px] border-b-[#121516] text-[#121516]' : 'border-b-[3px] border-b-transparent text-[#6a7781]'}`}
              onClick={() => setActiveTab('about')}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">About</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'reviews' ? 'border-b-[3px] border-b-[#121516] text-[#121516]' : 'border-b-[3px] border-b-transparent text-[#6a7781]'}`}
              onClick={() => setActiveTab('reviews')}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Reviews</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'availability' ? 'border-b-[3px] border-b-[#121516] text-[#121516]' : 'border-b-[3px] border-b-transparent text-[#6a7781]'}`}
              onClick={() => setCurrentView('availability')} // Direct navigation to AvailabilityPage
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Availability</p>
            </button>
          </div>
        </div>

        {/* Conditional rendering based on activeTab */}
        {activeTab === 'about' && (
          <>
            <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">About</h2>
            <p className="text-[#121516] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Dr. Anya Sharma is a seasoned career coach specializing in leadership development and executive presence. With over 5 years of experience, she has helped numerous
              professionals advance their careers and achieve their leadership goals. Her approach is tailored to each individual's unique strengths and aspirations, focusing on
              practical strategies and actionable insights.
            </p>
            <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Skills &amp; Qualifications</h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f2f4] pl-4 pr-4">
                  <p className="text-[#121516] text-sm font-medium leading-normal">{skill}</p>
                </div>
              ))}
            </div>
            <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Mentorship Style</h2>
            <p className="text-[#121516] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Dr. Sharma's mentorship style is collaborative and empowering. She combines evidence-based coaching techniques with a deep understanding of industry trends to provide
              personalized guidance. Mentees can expect a supportive environment where they can explore their potential, overcome challenges, and develop the skills needed to
              succeed.
            </p>
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            <h2 className="text-[#121516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Reviews</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
              <div className="flex flex-col gap-2">
                <p className="text-[#121516] text-4xl font-black leading-tight tracking-[-0.033em]">4.8</p>
                <div className="flex gap-0.5">
                  {renderStars(4.8)} {/* Call the renderStars helper function */}
                </div>
                <p className="text-[#121516] text-base font-normal leading-normal">25 reviews</p>
              </div>
              <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                <p className="text-[#121516] text-sm font-normal leading-normal">5</p>
                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dde1e3]"><div className="rounded-full bg-[#121516]" style={{ width: '70%' }}></div></div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal text-right">70%</p>
                <p className="text-[#121516] text-sm font-normal leading-normal">4</p>
                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dde1e3]"><div className="rounded-full bg-[#121516]" style={{ width: '20%' }}></div></div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal text-right">20%</p>
                <p className="text-[#121516] text-sm font-normal leading-normal">3</p>
                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dde1e3]"><div className="rounded-full bg-[#121516]" style={{ width: '5%' }}></div></div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal text-right">5%</p>
                <p className="text-[#121516] text-sm font-normal leading-normal">2</p>
                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dde1e3]"><div className="rounded-full bg-[#121516]" style={{ width: '3%' }}></div></div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal text-right">3%</p>
                <p className="text-[#121516] text-sm font-normal leading-normal">1</p>
                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#dde1e3]"><div className="rounded-full bg-[#121516]" style={{ width: '2%' }}></div></div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal text-right">2%</p>
              </div>
            </div>
            <div className="flex flex-col gap-8 overflow-x-hidden bg-white p-4">
              {reviews.map(review => (
                <div key={review.id} className="flex flex-col gap-3 bg-white">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{ backgroundImage: `url("${review.reviewerImage}")` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-[#121516] text-base font-medium leading-normal">{review.reviewerName}</p>
                      <p className="text-[#6a7781] text-sm font-normal leading-normal">{review.timeAgo}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-[#121516] text-base font-normal leading-normal">{review.comment}</p>
                  <div className="flex gap-9 text-[#6a7781]">
                    <button className="flex items-center gap-2">
                      <div className="text-inherit" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                        </svg>
                      </div>
                      <p className="text-inherit">{review.likes}</p>
                    </button>
                    <button className="flex items-center gap-2">
                      <div className="text-inherit" data-icon="ThumbsDown" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
                        </svg>
                      </div>
                      <p className="text-inherit">{review.dislikes}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {/*
          The 'availability' tab on the profile page will directly navigate to the dedicated AvailabilityPage.
          Its content is handled by the AvailabilityPage component itself, so no direct content rendering here.
        */}
      </div>
    </div>
  );
}

export default MentorProfilePage;
