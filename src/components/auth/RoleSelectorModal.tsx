'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import { UserRole } from '@/types/mitraa';
import {School} from 'lucide-react';
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { RiParentFill } from 'react-icons/ri';
import { IoIosPaper } from 'react-icons/io';


interface RoleOption {
  id: UserRole;
  title: string;
  icon: React.ReactNode;
  color: string;
  isPhase2?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: 'student',
    title: 'Student',
    icon: <PiStudentFill  className="w-6 h-6 text-[#1d5fd0]"/> ,
    color: 'hover:border-[#1d5fd0]',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    icon: <FaChalkboardTeacher className="w-6 h-6 text-[#1d5fd0]" />,
    color: 'hover:border-[#1d5fd0]',
  },
  {
    id: 'parent',
    title: 'Parents',
    icon: <RiParentFill className="w-6 h-6 text-[#1d5fd0]" />,
    color: 'hover:border-[#1d5fd0]',
  },
  {
    id: 'principal',
    title: 'Principal',
    icon: <FaUserTie className="w-6 h-6 text-[#1d5fd0]" />,
    color: 'hover:border-[#1d5fd0]',
  },
  {
    id: 'management',
    title: 'Management',
    icon: <FaUsers className="w-6 h-6 text-[#1d5fd0]"/>,
    color: 'hover:border-[#1d5fd0]',
  },
  {
    id: 'exam_controller',
    title: 'Exam Controller',
    icon:  <IoIosPaper className="w-6 h-6 text-[#1d5fd0]" />,
    color: 'hover:border-[#1d5fd0]',
    isPhase2: true,
  },
];

export const RoleSelectorModal: React.FC = () => {
  const { setAuthStep, setSelectedRoleForLogin } = useMitraa();

  const handleSelectRole = (role: UserRole) => {
    setSelectedRoleForLogin(role);
    setAuthStep('login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#e8f2fa] border border-slate-200 rounded-2xl max-w-xl w-full p-6  relative">
       

        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="p-2 rounded-lg bg-[#11305c] text-white">
            <School className="w-5 h-5" />
          </div>
            <h2 className="text-xl font-bold text-[#13213c]">Select User Type</h2>
            <h4 className="text-md font-semibold text-[#13213c]">( for Login )</h4>
        </div>

   

        <div className="grid grid-cols-1 gap-2">
          {roleOptions.map((role) => (
            <div
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border border-slate-400 bg-white cursor-pointer transition ${role.color} group`}
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg group-hover:scale-105 transition">
                  {role.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#13213c]  transition">
                      {role.title}
                    </span> 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
