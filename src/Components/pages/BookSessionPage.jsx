import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

function BookSessionPage({ setCurrentView, firestoreDb, mentorId, appId, userId, menteeFullName }) {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [cost, setCost] = useState(''); // State for session cost

  useEffect(() => {
    const fetchMentorDetails = async () => {
      if (!firestoreDb || !mentorId) {
        setError('Firestore database or mentor ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const mentorPublicProfileRef = doc(firestoreDb, `artifacts/${appId}/public/data/mentors/${mentorId}`);
        const docSnap = await getDoc(mentorPublicProfileRef);

        if (docSnap.exists()) {
          setMentorData(docSnap.data());
          // Set a default or example cost if available from mentor data
          // For now, it's hardcoded to 50, but it could come from mentor's profile
          setCost(50);
        } else {
          setError('Mentor details not found.');
        }
      } catch (err) {
        console.error("Error fetching mentor details:", err);
        setError(`Failed to load mentor details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, [firestoreDb, mentorId, appId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firestoreDb || !userId || !mentorId || !menteeFullName) {
      setError('Missing essential data for booking: Firestore, user ID, mentor ID, or mentee name.');
      return;
    }

    if (!sessionType || !sessionDate || !sessionTime || !cost) {
      setError('Please fill in all session details.');
      return;
    }

    try {
      const sessionsCollectionRef = collection(firestoreDb, `artifacts/${appId}/sessions`);
      await addDoc(sessionsCollectionRef, {
        mentorId: mentorId,
        mentorName: mentorData.fullName,
        menteeId: userId,
        menteeName: menteeFullName,
        sessionType: sessionType,
        date: sessionDate,
        time: sessionTime,
        cost: parseFloat(cost),
        status: 'pending', // Initial status
        createdAt: new Date(),
        notes: '', // Placeholder for session notes
        resources: [], // Placeholder for shared resources
        feedback: [], // Placeholder for feedback
      });
      alert('Session booked successfully!');
      setCurrentView('menteeSessions'); // Redirect to mentee's sessions page
    } catch (err) {
      console.error("Error booking session:", err);
      setError(`Failed to book session: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading mentor details...</p>
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
        <p className="text-[#6a7781] text-lg">Mentor details not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Book Session</p>
          <p className="text-[#637888] text-sm font-normal leading-normal">
            Schedule a new mentorship session with {mentorData.fullName}.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 bg-white rounded-xl shadow-sm border border-[#dce1e3]">
        <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Session Details</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="mentorName" className="text-[#111518] text-sm font-medium leading-normal">Mentor</label>
          <input
            id="mentorName"
            type="text"
            value={mentorData.fullName}
            readOnly
            className="h-12 px-4 rounded-xl border border-[#dce1e5] bg-[#f0f3f4] text-[#637888] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sessionType" className="text-[#111518] text-sm font-medium leading-normal">Session Type</label>
          <input
            id="sessionType"
            type="text"
            placeholder="e.g., Career Coaching, Technical Review, Portfolio Feedback"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="h-12 px-4 rounded-xl border border-[#dce1e5] bg-white text-[#111518] focus:border-[#1990e5] focus:ring-1 focus:ring-[#1990e5] focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="sessionDate" className="text-[#111518] text-sm font-medium leading-normal">Date</label>
            <input
              id="sessionDate"
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="h-12 px-4 rounded-xl border border-[#dce1e5] bg-white text-[#111518] focus:border-[#1990e5] focus:ring-1 focus:ring-[#1990e5] focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="sessionTime" className="text-[#111518] text-sm font-medium leading-normal">Time</label>
            <input
              id="sessionTime"
              type="time"
              value={sessionTime}
              onChange={(e) => setSessionTime(e.target.value)}
              className="h-12 px-4 rounded-xl border border-[#dce1e5] bg-white text-[#111518] focus:border-[#1990e5] focus:ring-1 focus:ring-[#1990e5] focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cost" className="text-[#111518] text-sm font-medium leading-normal">Session Cost ($)</label>
          <input
            id="cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="h-12 px-4 rounded-xl border border-[#dce1e5] bg-white text-[#111518] focus:border-[#1990e5] focus:ring-1 focus:ring-[#1990e5] focus:outline-none"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button
            type="button"
            onClick={() => setCurrentView('explore')} // Go back to explore page or mentor profile
            className="flex items-center justify-center rounded-xl h-12 px-6 flex-1 bg-[#f1f2f4] text-[#121516] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl h-12 px-6 flex-1 bg-[#1990e5] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#157ac0] transition-colors"
          >
            Book Session
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookSessionPage;