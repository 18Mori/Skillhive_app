import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

function ViewMenteeProfilePage({ setCurrentView, firestoreDb, menteeId, appId }) {
  const [menteeData, setMenteeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about'); // State for tab navigation

  useEffect(() => {
    const fetchMenteeProfile = async () => {
      if (!firestoreDb || !menteeId) {
        setError('Firestore database or mentee ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch from the private users profile collection
        const menteeDocRef = doc(firestoreDb, `artifacts/${appId}/users/${menteeId}/profiles/userProfile`);
        const docSnap = await getDoc(menteeDocRef);

        if (docSnap.exists()) {
          setMenteeData(docSnap.data());
        } else {
          setError('Mentee profile not found.');
        }
      } catch (err) {
        console.error("Error fetching mentee profile:", err);
        setError(`Failed to load mentee profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMenteeProfile();
  }, [firestoreDb, menteeId, appId]);

  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading mentee profile...</p>
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

  if (!menteeData) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Mentee profile not found.</p>
      </div>
    );
  }

  const displayProfileImage = menteeData.userProfileImage || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=Mentee';
  const menteeSinceDate = menteeData.createdAt ?
    new Date(menteeData.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
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
              <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em]">{menteeData.fullName}</p>
              <p className="text-[#637888] text-base font-normal leading-normal">Mentee since {menteeSinceDate}</p>
            </div>
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
            className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'learning' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
            onClick={() => setActiveTab('learning')}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Learning Objectives</p>
          </button>
          <button
            className={`flex flex-col items-center justify-center pb-[13px] pt-4 ${activeTab === 'goals' ? 'border-b-[3px] border-b-[#111518] text-[#111518]' : 'border-b-[3px] border-b-transparent text-[#637888]'}`}
            onClick={() => setActiveTab('goals')}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Goals</p>
          </button>
        </div>
      </div>

      {activeTab === 'about' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">About</h2>
          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Bio</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">{menteeData.bio || 'No biography available.'}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Location</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">{menteeData.location || 'Not specified.'}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Areas of Interest</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">
                {menteeData.areasOfInterest && menteeData.areasOfInterest.length > 0
                  ? menteeData.areasOfInterest.join(', ') : 'No areas of interest specified.'}
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'learning' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Learning Objectives & Skills</h2>
          <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Learning Objectives</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">{menteeData.learningObjectives || 'No learning objectives specified.'}</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dce1e5] py-5">
              <p className="text-[#637888] text-sm font-normal leading-normal">Skills to Learn</p>
              <p className="text-[#111518] text-sm font-normal leading-normal">
                {menteeData.skillsToLearn && menteeData.skillsToLearn.length > 0
                  ? menteeData.skillsToLearn.join(', ') : 'No skills to learn specified.'}
              </p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'goals' && (
        <>
          <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Goals</h2>
          <div className="px-4">
            {menteeData.goals && menteeData.goals.length > 0 ? (
              menteeData.goals.map((goal, index) => (
                <div key={index} className="flex gap-x-3 py-3 flex-row items-center">
                  <div className={`h-5 w-5 rounded border-2 ${goal.completed ? 'border-[#1990e5] bg-[#1990e5]' : 'border-[#dce1e5] bg-transparent'} flex items-center justify-center`}>
                    {goal.completed && (
                      <svg viewBox="0 0 16 16" fill="rgb(255,255,255)" xmlns="http://www.w3.org/2000/svg" className="size-full">
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </div>
                  <p className={`text-[#111518] text-base font-normal leading-normal ${goal.completed ? 'line-through text-[#637888]' : ''}`}>
                    {goal.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[#6a7781] text-center text-lg mt-4">No goals defined yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewMenteeProfilePage;
