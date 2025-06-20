import React, { useState } from 'react';

function Login({ onLogin, setCurrentView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // Call the login function passed from App.jsx
  };

  return (
    <>
      <h2 className="text-[#121516] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome back</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <div className="flex w-full md:max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121516] text-base font-medium leading-normal pb-2">Username or Email</p>
            <input
              type="email" // Changed to type="email" for better validation
              placeholder="Enter your username or email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
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
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between w-full md:max-w-[480px]">
          <p className="text-[#121516] text-base font-normal leading-normal flex-1 truncate">Remember me</p>
          <div className="shrink-0">
            <div className="flex size-7 items-center justify-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#dde1e3] border-2 bg-transparent text-[#b2d0e5] checked:bg-[#b2d0e5] checked:border-[#b2d0e5] checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-[#dde1e3] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full md:max-w-[480px] px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#9cbacc] transition-colors duration-200"
          >
            <span className="truncate">Login</span>
          </button>
        </div>
      </form>
      <p className="text-[#6a7781] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer">Forgot Password?</p>
      <p
        className="text-[#6a7781] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer"
        onClick={() => setCurrentView('signup')}
      >
        New to SkillHive? Sign Up
      </p>
    </>
  );
}

export default Login;
