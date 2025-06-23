import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function SessionDetailsPage({ setCurrentView, firestoreDb, sessionId, appId }) {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!firestoreDb || !sessionId) {
        setError('Firestore database or session ID not available.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const sessionRef = doc(firestoreDb, `artifacts/${appId}/sessions`, sessionId);
        const docSnap = await getDoc(sessionRef);

        if (docSnap.exists()) {
          setSessionData(docSnap.data());
        } else {
          setError('Session details not found.');
        }
      } catch (err) {
        console.error("Error fetching session details:", err);
        setError(`Failed to load session details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [firestoreDb, sessionId, appId]);

  const handleGiveFeedback = async () => {
    if (!sessionData || !feedbackText.trim()) {
      alert('Please enter feedback before submitting.');
      return;
    }

    try {
      const sessionRef = doc(firestoreDb, `artifacts/${appId}/sessions`, sessionId);
      const newFeedbackEntry = {
        reviewer: "Current User", // This should be dynamically set based on the logged-in user
        comment: feedbackText.trim(),
        date: new Date().toLocaleDateString(),
      };

      const currentFeedback = sessionData.feedback || [];
      await updateDoc(sessionRef, {
        feedback: [...currentFeedback, newFeedbackEntry]
      });

      setSessionData(prevData => ({
        ...prevData,
        feedback: [...currentFeedback, newFeedbackEntry]
      }));

      setFeedbackText('');
      setShowFeedbackForm(false);
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Loading session details...</p>
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

  if (!sessionData) {
    return (
      <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1 justify-center items-center">
        <p className="text-[#6a7781] text-lg">Session details not found.</p>
      </div>
    );
  }

  const { sessionType, mentorName, menteeName, date, time, cost, status, notes, resources, feedback } = sessionData;

  return (
    <div className="flex flex-col max-w-[960px] mx-auto px-4 py-5 flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#121516] tracking-light text-[32px] font-bold leading-tight">Session Details</p>
          <p className="text-[#637888] text-sm font-normal leading-normal">
            Detailed information about your mentorship session.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4">
        <div className="bg-white rounded-xl border border-[#dce1e3] shadow-sm p-5">
          <h3 className="text-[#111518] text-xl font-bold leading-tight mb-3">{sessionType}</h3>
          <p className="text-[#637888] text-base font-normal leading-normal mb-2">
            **Mentor:** {mentorName}
          </p>
          <p className="text-[#637888] text-base font-normal leading-normal mb-2">
            **Mentee:** {menteeName}
          </p>
          <p className="text-[#637888] text-base font-normal leading-normal mb-2">
            **Date:** {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[#637888] text-base font-normal leading-normal mb-2">
            **Time:** {time}
          </p>
          <p className="text-[#637888] text-base font-normal leading-normal mb-2">
            **Cost:** ${cost}
          </p>
          <p className={`text-base font-semibold leading-normal capitalize ${status === 'pending' ? 'text-blue-600' : status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
            **Status:** {status}
          </p>
        </div>

        {notes && (
          <div className="bg-white rounded-xl border border-[#dce1e3] shadow-sm p-5">
            <h3 className="text-[#111518] text-xl font-bold leading-tight mb-3">Session Notes</h3>
            <p className="text-[#637888] text-base font-normal leading-normal">{notes}</p>
          </div>
        )}

        {resources && resources.length > 0 && (
          <div className="bg-white rounded-xl border border-[#dce1e3] shadow-sm p-5">
            <h3 className="text-[#111518] text-xl font-bold leading-tight mb-3">Shared Resources</h3>
            <ul className="list-disc pl-5">
              {resources.map((res, index) => (
                <li key={index} className="text-[#637888] text-base font-normal leading-normal">
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[#1990e5] hover:underline">
                    {res.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-xl border border-[#dce1e3] shadow-sm p-5">
          <h3 className="text-[#111518] text-xl font-bold leading-tight mb-3">Feedback</h3>
          {feedback && feedback.length > 0 ? (
            feedback.map((f, index) => (
              <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                <p className="text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">{f.reviewer}</p>
                <p className="text-[#637888] text-sm font-normal leading-normal mb-1">{f.date}</p>
                <p className="text-[#111518] text-base font-normal leading-normal">{f.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-[#6a7781] text-base font-normal leading-normal mb-3">No feedback submitted yet for this session.</p>
          )}

          {!showFeedbackForm && (
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="flex items-center justify-center rounded-xl h-10 px-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#a0c0d5] transition-colors mt-4"
            >
              Give Feedback
            </button>
          )}

          {showFeedbackForm && (
            <div className="mt-4">
              <textarea
                className="w-full p-3 border border-[#dce1e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990e5]"
                rows="4"
                placeholder="Write your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex items-center justify-center rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-medium leading-normal hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGiveFeedback}
                  className="flex items-center justify-center rounded-xl h-10 px-4 bg-[#1990e5] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#157ac0] transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentView('sessions')}
          className="flex items-center justify-center rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121516] text-sm font-medium leading-normal hover:bg-gray-200 transition-colors"
        >
          Back to Sessions
        </button>
      </div>
    </div>
  );
}

export default SessionDetailsPage;