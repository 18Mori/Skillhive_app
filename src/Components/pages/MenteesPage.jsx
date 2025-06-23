import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

function MenteesPage({ setCurrentView, firestoreDb, userId, appId, setSelectedMenteeDetailsId }) {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentees = async () => {
      if (!firestoreDb || !userId) {
        setError('Firestore database or user ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        // First, get the sessions where the current user is the mentor
        const sessionsCollectionRef = collection(firestoreDb, `artifacts/${appId}/sessions`);
        const qSessions = query(sessionsCollectionRef, where("mentorId", "==", userId));
        const sessionSnapshot = await getDocs(qSessions);

        const menteeIds = new Set();
        sessionSnapshot.forEach(doc => {
          const sessionData = doc.data();
          if (sessionData.menteeId) {
            menteeIds.add(sessionData.menteeId);
          }
        });

        const fetchedMentees = [];
        if (menteeIds.size > 0) {
          // Fetch mentee profiles using the collected mentee IDs
          for (const menteeId of Array.from(menteeIds)) {
            const menteeProfileRef = doc(firestoreDb, `artifacts/${appId}/users/${menteeId}/profiles/userProfile`);
            const menteeProfileSnap = await getDoc(menteeProfileRef);

            if (menteeProfileSnap.exists()) {
              const menteeData = menteeProfileSnap.data();
              // Ensure we only add actual mentees (not other user types if IDs overlap)
              if (menteeData.role === 'mentee') {
                fetchedMentees.push({ id: menteeId, ...menteeData });
              }
            }
          }
        }

        setMentees(fetchedMentees);
        console.log("Fetched mentees:", fetchedMentees);
      } catch (err) {
        console.error("Error fetching mentees:", err);
        setError(`Failed to load mentees: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [firestoreDb, userId, appId]);

  const handleViewDetails = (menteeId) => {
    setSelectedMenteeDetailsId(menteeId);
    setCurrentView('menteeDetails');
  };

  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading mentees...</p>
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

  return (
    <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">My Mentees</p>
          <p className="text-[#6a7781] text-sm font-normal leading-normal">
            A comprehensive list of all your current and past mentees.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {mentees.length > 0 ? (
          mentees.map(mentee => (
            <div key={mentee.id} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 rounded-xl border border-[#dce1e3] shadow-sm">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 shrink-0"
                style={{ backgroundImage: `url("${mentee.userProfileImage || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=User'}")` }}
              ></div>
              <div className="flex flex-col justify-center flex-1">
                <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">{mentee.fullName}</p>
                <p className="text-[#637888] text-sm font-normal leading-normal line-clamp-2">
                  {mentee.bio || 'No bio available.'}
                </p>
              </div>
              <div>
                <button
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-medium leading-normal hover:bg-gray-200 transition-colors"
                  onClick={() => handleViewDetails(mentee.id)}
                >
                  <span className="truncate">View Details</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#6a7781] text-center text-lg mt-4">You currently have no mentees.</p>
        )}
      </div>
    </div>
  );
}

export default MenteesPage;