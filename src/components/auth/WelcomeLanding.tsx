'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMitraa } from '@/context/MitraaContext';
import { UserRole } from '@/types/mitraa';
import { Button, Card } from '@heroui/react';
import {
  School,
} from 'lucide-react';


export const WelcomeLanding: React.FC = () => {
  const router = useRouter();
  const { setAuthStep, setSelectedRoleForLogin } = useMitraa();


  const startLoginWithRole = (role: UserRole) => {
    setSelectedRoleForLogin(role);
    setAuthStep('login');
  };



  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden px-2">
      
    <div className='border border-slate-200 sm:mx-auto sm:w-full sm:max-w-md p-4 rounded-xl'>
      <div>
        <div className='flex justify-center items-center' >
        <School className='rounded-lg bg-[#11305c] text-white w-12 h-12 p-1 ' />
        </div>
        <div className="text-center mt-10">
          <h2 className="text-3xl font-extrabold text-[#11305c] tracking-tight">
            Welcome to MiTRAA-Edu
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Connected Education for a Brighter Tomorrow
          </p>
        </div>
      </div>

         
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4  rounded-2xl sm:px-10">         
          
           <Button
             className="w-full py-6 bg-[#1d5fd0] hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 mb-4"
             onPress={() => setAuthStep('select_role')}
           >
             <span>Login</span>
           </Button>

           <Button
                
                className="w-full py-6  bg-white hover:bg-[#1d5fd0] border text-neutral-700 hover:text-white font-bold rounded-xl transition duration-200  flex items-center justify-center gap-2"
              >
                Register
           </Button>
        </div>
      </div>
    </div>
    </div>
  );
};
