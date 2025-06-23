import React, { useState } from 'react';

function Login({ onLogin, setCurrentView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="w-full p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log in to SkillHive</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 w-full rounded-md border border-solid border-gray-300 px-3 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 mt-4 bg-[#b2d0e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-300 transition-colors"
          >
            <span className="truncate">Login</span>
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <span
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
            onClick={() => setCurrentView('signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;