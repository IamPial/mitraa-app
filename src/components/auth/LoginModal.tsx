'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { mockUsers } from '@/data/mockData';
import { Input, Button } from '@heroui/react';
import { BiSolidUserRectangle } from 'react-icons/bi';


export const LoginModal: React.FC = () => {
  const {
    selectedRoleForLogin,
    completeLogin,
  } = useMitraa();

  const role = selectedRoleForLogin || 'student';
  const sampleUser = mockUsers[role];

  const [email, setEmail] = useState(sampleUser?.email || '');
  const [password, setPassword] = useState('Mitraa@Secure2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both your institutional Email/User ID and password.');
      return;
    }
    setErrorMessage('');
    completeLogin();
  };



  return (
    <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-md w-full   relative">

        
        <h2 className="text-2xl bg-[#e8f2fa] font-bold text-[#11305c] mb-1 text-center p-6 rounded-tl-2xl rounded-tr-2xl">Login</h2>
        <div className='flex justify-center items-center mt-5'>
        <BiSolidUserRectangle className='text-[#1d5fd0] w-15 h-15' />
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="block text-md font-medium text-slate-700 mb-1.5">
              Email or  User ID
            </label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@apex.mitraa.edu"
              className="w-full text-sm text-slate-700 border border-gray-300 shadow-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-700">Password</label>
              <button
                type="button"
                // onClick={() => alert('Password reset link dispatched to your backup email.')}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-sm text-slate-700 border border-gray-300 shadow-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500/20"
              />
              <span>Remember me</span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-[#1d5fd0] hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 mb-4"
          >
            <span>Login</span>
          </Button>
        </form>
      </div>
    </div>
  );
};
