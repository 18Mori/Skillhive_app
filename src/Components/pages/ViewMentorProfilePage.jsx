import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

function ViewMentorProfilePage({ setCurrentView, firestoreDb, mentorId, appId }) {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about'); // State for tab navigation

  useEffect(() => {
    const fetchMentorProfile = async () => {
      if (!firestoreDb || !mentorId) {
        setError('Firestore database or mentor ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch from the public collection first for general details
        const publicMentorDocRef = doc(firestoreDb, `artifacts/${appId}/public/data/mentors/${mentorId}`);
        const publicDocSnap = await getDoc(publicMentorDocRef);

        let fetchedMentorData = null;

        if (publicDocSnap.exists()) {
          fetchedMentorData = publicDocSnap.data();
          console.log("Public mentor data fetched:", fetchedMentorData);

          // Now fetch from the private user profile for more detailed/private info
          const userProfileDocRef = doc(firestoreDb, `artifacts/${appId}/users/${mentorId}/profiles/userProfile`);
          const userProfileSnap = await getDoc(userProfileDocRef);

          if (userProfileSnap.exists()) {
            // Merge public and private data, with private data overriding if fields overlap
            fetchedMentorData = { ...fetchedMentorData, ...userProfileSnap.data() };
            console.log("Merged mentor data with private profile:", fetchedMentorData);
          } else {
            console.warn("Private user profile not found for mentor:", mentorId);
            // Continue with just public data if private isn't found
          }
          setMentorData(fetchedMentorData);

        } else {
          setError('Mentor profile not found in public listings.');
        }
      } catch (err) {
        console.error("Error fetching mentor profile:", err);
        setError(`Failed to load mentor profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorProfile();
  }, [firestoreDb, mentorId, appId]);

  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading mentor profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!mentorData) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Mentor profile not found.</p>
      </div>
    );
  }

  // Determine which profile image to display: userProfileImage (private) preferred, then public profileImage
  const displayProfileImage = mentorData.userProfileImage || mentorData.profileImage || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=Mentor';
  const mentorSinceDate = mentorData.createdAt ?
    new Date(mentorData.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
    'N/A';

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
          <div className="flex gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: `url("${displayProfileImage}")` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em]">{mentorData.fullName}</p>
              <p className="text-[#637888] text-base font-normal leading-normal">Mentor since {mentorSinceDate}</p>
              {mentorData.averageRating !== undefined && (
                <div className="flex items-center gap-1 text-[#637888]">
                  {/* Basic star rating display, could be enhanced */}
                  {'⭐'.repeat(Math.round(mentorData.averageRating))} {mentorData.averageRating.toFixed(1)} (
                  {mentorData.reviewCount || 0} reviews)
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-medium leading-normal hover:bg-gray-200 transition-colors"
              onClick={() => setCurrentView('explore')}
            >
              <span className="truncate">Back to Explore</span>
            </button>
            <button
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#a0c0d5] transition-colors"
              onClick={() => {
                setCurrentView('bookSession');
              }}
            >
              <span className="truncate">Book Session</span>
            </button>
          </div>
        </div>
      </div>
      <div className="pb-3">
        <div className="flex border-b border-[#dce1e5] px-4 gap-8">
          <button
            className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'about' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
            onClick={() => setActiveTab('about')}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">About</p>
          </button>
          <button
            className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'skills' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
            onClick={() => setActiveTab('skills')}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Skills</p>
          </button>
          <button
            className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'approach' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
            onClick={() => setActiveTab('approach')}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Approach</p>
          </button>
        </div>
      </div>

      {activeTab === 'about' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">About</h2>
          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Bio</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">{mentorData.bio || 'No biography available.'}</p>
            </div>
            {mentorData.company && (
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
                <p className="text-[#637888] text-sm font-normal leading-normal">Company</p>
                <p className="text-[#111518] text-sm font-normal leading-normal">{mentorData.company}</p>
              </div>
            )}
            {mentorData.jobTitle && (
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
                <p className="text-[#637888] text-sm font-normal leading-normal">Job Title</p>
                <p className="text-[#111518] text-sm font-normal leading-normal">{mentorData.jobTitle}</p>
              </div>
            )}
            {mentorData.location && (
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
                <p className="text-[#637888] text-sm font-normal leading-normal">Location</p>
                <p className="text-[#111518] text-sm font-normal leading-normal">{mentorData.location}</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'skills' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Skills & Expertise</h2>
          <div className="p-4">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Specializations</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">
                {mentorData.specializations && mentorData.specializations.length > 0
                  ? mentorData.specializations.join(', ')
                  : 'No specializations listed.'}
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Skills</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">
                {mentorData.skills && mentorData.skills.length > 0
                  ? mentorData.skills.join(', ')
                  : 'No skills listed.'}
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'approach' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Mentorship Approach</h2>
          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Approach</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">{mentorData.mentorshipApproach || 'No mentorship approach described.'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewMentorProfilePage;