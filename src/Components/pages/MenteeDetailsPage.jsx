import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function MenteeDetailsPage({ setCurrentView, firestoreDb, menteeId, appId }) {
  const [menteeData, setMenteeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [goals, setGoals] = useState([]); // State for mentee goals

  // Mock data for session timeline, feedback, and shared resources
  // In a real application, these would be fetched from Firestore based on relationships
  const sessionTimeline = [
    { type: 'completed', title: 'Initial Assessment', date: 'July 1, 2024' },
    { type: 'completed', title: 'Mid-Term Review', date: 'July 15, 2024' },
    { type: 'upcoming', title: 'Upcoming Session', date: 'July 29, 2024' },
  ];

  const feedback = [
    {
      reviewer: 'Sophia Clark', // This would be the current mentee's name
      date: 'July 20, 2024',
      comment: "I'm really enjoying the mentorship and feel like I'm making great progress!",
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_Vjy_kfTaFw1lzPT_X0MDBoLByC5uHo1jdTxGztz2SIgAu6Iw3FKM_HZHqa-AUbISevrNZFlAsVOunlpGXCvLQfzDiJ-4rP5VBGvA_TJRdTdkP_gXNMsMw3gK7QaDg3FCuLAKUCXxhiPs1FYJLP2kGDA2UNjkg0aWbcIgX-RobBAHBi2NsEyKK2Iwu-r1ALCqt54cFjWzYGnrj52RibKU-RXQKMLdNxjGqelya4hfQSF-Z31W4WsOAS-SzpqmYR4shRA4f1TLEw',
    },
  ];

  const sharedResources = [
    { id: 1, name: 'Project Guidelines', fileType: 'pdf', downloadUrl: '#' },
    { id: 2, name: 'Weekly Discussion Prompts', fileType: 'pdf', downloadUrl: '#' },
  ];

  useEffect(() => {
    const fetchMenteeDetails = async () => {
      if (!firestoreDb || !menteeId) {
        setError('Firestore database or mentee ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const menteeProfileRef = doc(firestoreDb, `artifacts/${appId}/users/${menteeId}/profiles/userProfile`);
        const docSnap = await getDoc(menteeProfileRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMenteeData(data);
          // Initialize goals from menteeData or with defaults
          setGoals(data.goals || [
            { text: 'Complete initial project', completed: false },
            { text: 'Participate in weekly discussions', completed: false },
            { text: 'Achieve certification', completed: false },
          ]);
        } else {
          setError('Mentee details not found.');
        }
      } catch (err) {
        console.error("Error fetching mentee details:", err);
        setError(`Failed to load mentee details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMenteeDetails();
  }, [firestoreDb, menteeId, appId]);

  const handleGoalToggle = async (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);

    // Persist to Firestore
    try {
      const menteeProfileRef = doc(firestoreDb, `artifacts/${appId}/users/${menteeId}/profiles/userProfile`);
      await updateDoc(menteeProfileRef, { goals: updatedGoals });
      console.log('Goals updated successfully in Firestore.');
    } catch (error) {
      console.error('Error updating goals in Firestore:', error);
      // Revert UI if Firestore update fails
      setGoals(goals);
      setError('Failed to update goal. Please try again.');
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading mentee details...</p>
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
        <p className="text-[#6a7781] text-lg">Mentee details not found.</p>
      </div>
    );
  }

  const menteeSinceDate = menteeData.createdAt ?
    new Date(menteeData.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
    'N/A';

  const displayProfileImage = menteeData.userProfileImage || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=User';


  return (
    <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Mentee Details</p>
          <p className="text-[#637888] text-sm font-normal leading-normal">Comprehensive overview of mentee progress and engagement.</p>
        </div>
      </div>
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

      <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Progress Overview</h2>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-[#111518] text-base font-medium leading-normal">Overall Progress</p>
          {/* This is hardcoded for now, would need actual progress tracking logic */}
          <p className="text-[#111518] text-sm font-normal leading-normal">60%</p>
        </div>
        <div className="rounded bg-[#dce1e5]">
          <div className="h-2 rounded bg-[#111518]" style={{ width: '60%' }}></div>
        </div>
      </div>

      <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Session Timeline</h2>
      <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
        {sessionTimeline.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-1 pt-3">
              <div className={`text-[#111518] ${item.type === 'completed' ? '' : 'text-[#637888]'}`} data-icon="CheckCircle" data-size="24px" data-weight="regular">
                {item.type === 'completed' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                  </svg>
                )}
              </div>
              {index < sessionTimeline.length - 1 && <div className="w-[1.5px] bg-[#dce1e5] h-full grow"></div>}
            </div>
            <div className="flex flex-1 flex-col py-3">
              <p className="text-[#111518] text-base font-medium leading-normal">{item.title}</p>
              <p className="text-[#637888] text-base font-normal leading-normal">{item.type === 'completed' ? 'Completed' : 'Scheduled'}: {item.date}</p>
            </div>
          </React.Fragment>
        ))}
      </div>

      <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Goals</h2>
      <div className="px-4">
        {goals.map((goal, index) => (
          <label key={index} className="flex gap-x-3 py-3 flex-row items-center cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#dce1e5] border-2 bg-transparent text-[#1990e5] checked:bg-[#1990e5] checked:border-[#1990e5] checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-[#dce1e5] focus:outline-none"
              checked={goal.completed}
              onChange={() => handleGoalToggle(index)}
            />
            <p className={`text-[#111518] text-base font-normal leading-normal ${goal.completed ? 'line-through text-[#637888]' : ''}`}>
              {goal.text}
            </p>
          </label>
        ))}
      </div>

      <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Feedback</h2>
      <div className="flex flex-col gap-8 overflow-x-hidden bg-white p-4">
        {feedback.length > 0 ? (
          feedback.map((f, index) => (
            <div key={index} className="flex w-full flex-row items-start justify-start gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{ backgroundImage: `url("${f.imageUrl}")` }}
              ></div>
              <div className="flex h-full flex-1 flex-col items-start justify-start">
                <div className="flex w-full flex-row items-start justify-start gap-x-3">
                  <p className="text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">{f.reviewer}</p>
                  <p className="text-[#637888] text-sm font-normal leading-normal">{f.date}</p>
                </div>
                <p className="text-[#111518] text-sm font-normal leading-normal">{f.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#6a7781] text-center text-lg mt-4">No feedback available.</p>
        )}
      </div>

      <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Shared Resources</h2>
      <div className="flex flex-col gap-2">
        {sharedResources.length > 0 ? (
          sharedResources.map(resource => (
            <div key={resource.id} className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between rounded-lg border border-[#dce1e3] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10" data-icon="File" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                  </svg>
                </div>
                <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate">{resource.name}</p>
              </div>
              <div className="shrink-0">
                <a href={resource.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-base font-medium leading-normal text-[#1990e5] hover:underline">Download</a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#6a7781] text-center text-lg mt-4">No shared resources available.</p>
        )}
      </div>
    </div>
  );
}

export default MenteeDetailsPage;