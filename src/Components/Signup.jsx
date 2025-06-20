import React, { useState } from 'react';


function Signup({ onSignUp, setCurrentView }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(fullName, email, password, selectedRole, termsAgreed); // Call the signup function passed from App.jsx
  };

  return (
    <>
      <h2 className="text-[#121516] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Create your account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <div className="flex w-full md:max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121516] text-base font-medium leading-normal pb-2">Full name</p>
            <input
              placeholder="Enter your full name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-14 placeholder:text-[#6a7781] p-4 text-base font-normal leading-normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex w-full md:max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121516] text-base font-medium leading-normal pb-2">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-14 placeholder:text-[#6a7781] p-4 text-base font-normal leading-normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex w-full md:max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121516] text-base font-medium leading-normal pb-2">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-14 placeholder:text-[#6a7781] p-4 text-base font-normal leading-normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 p-4 w-full md:max-w-[480px] justify-center">
          <label
            className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dde1e3] px-4 h-11 text-[#121516] relative cursor-pointer ${
              selectedRole === 'Mentor' ? 'border-[3px] border-[#b2d0e5]' : ''
            }`}
          >
            Mentor
            <input
              type="radio"
              className="invisible absolute"
              name="role-selection"
              value="Mentor"
              checked={selectedRole === 'Mentor'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
          </label>
          <label
            className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dde1e3] px-4 h-11 text-[#121516] relative cursor-pointer ${
              selectedRole === 'Mentee' ? 'border-[3px] border-[#b2d0e5]' : ''
            }`}
          >
            Mentee
            <input
              type="radio"
              className="invisible absolute"
              name="role-selection"
              value="Mentee"
              checked={selectedRole === 'Mentee'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
          </label>
        </div>
        <div className="px-4 w-full md:max-w-[480px]">
          <label className="flex gap-x-3 py-3 flex-row">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#dde1e3] border-2 bg-transparent text-[#b2d0e5] checked:bg-[#b2d0e5] checked:border-[#b2d0e5] checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-[#dde1e3] focus:outline-none"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              required
            />
            <p className="text-[#121516] text-base font-normal leading-normal">I agree to the Terms of Service</p>
          </label>
        </div>
        <div className="flex w-full md:max-w-[480px] px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#b2d0e5] text-[#121516] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#9cbacc] transition-colors duration-200"
          >
            <span className="truncate">Sign Up</span>
          </button>
        </div>
      </form>
      <p
        className="text-[#6a7781] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer"
        onClick={() => setCurrentView('login')}
      >
        Already have an account? Log In
      </p>
    </>
  );
}

export default Signup;
