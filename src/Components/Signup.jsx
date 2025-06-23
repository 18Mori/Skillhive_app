import React, { useState } from 'react';

function Signup({ onSignUp, setCurrentView }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // 'mentor' or 'mentee'
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(fullName, email, password, role, terms);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="w-full p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create your account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="signup-fullname">
              Full Name
            </label>
            <input
              id="signup-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">I am a...</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="mentor"
                  checked={role === 'mentor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="size-4"
                  required
                />
                Mentor
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="mentee"
                  checked={role === 'mentee'}
                  onChange={(e) => setRole(e.target.value)}
                  className="size-4"
                  required
                />
                Mentee
              </label>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input
              id="terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="size-4 mt-1 rounded border-gray-300"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 mt-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-300 transition-colors"
          >
            <span className="truncate">Create Account</span>
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <span className="font-semibold text-blue-600 hover:underline cursor-pointer" onClick={() => setCurrentView('login')}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;