'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Home,
  Building,
  BookOpen,
  Layers,
  DollarSign,
  FileCheck,
  AlertTriangle,
  Shield,
  Bell,
  TrendingUp,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Lock,
} from 'lucide-react';

export const ManagementDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    campuses,
    activeCampus,
    setActiveCampus,
    notices,
    publishNotice,
  } = useMitraa();

  const totalStudentsAll = campuses.reduce((sum, c) => sum + c.totalStudents, 0);
  const totalRevenueAll = campuses.reduce((sum, c) => sum + c.revenueCollected, 0);
  const totalDuesAll = campuses.reduce((sum, c) => sum + c.outstandingDues, 0);

  return (
    <div className="space-y-6">
      {/* 1. Home (Institution Overview) */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-yellow-950/40 to-slate-900 border border-amber-500/30 p-6 shadow-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Board of Trustees & Executive Management • {currentUser.tenantName}
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Institutional Governance & Multi-Campus View
            </h1>
            <p className="mt-2 text-xs lg:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Consolidated operational metrics across 3 campuses. Total enrolled student census: <strong>{totalStudentsAll.toLocaleString()}</strong>. Group quarterly revenue collections currently standing at <strong>₹{(totalRevenueAll / 10000000).toFixed(2)} Cr</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('multiple_campus')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/25 transition flex items-center gap-1.5"
              >
                <Building className="w-4 h-4 text-slate-950" />
                <span>Multi-Campus Comparative View</span>
              </button>
              <button
                onClick={() => setActiveTab('financial_management')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Financial & Fee Health</span>
              </button>
            </div>
          </div>

          {/* Aggregate KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Total Active Campuses</span>
              <span className="text-2xl font-bold text-white mt-1 block">3 Campuses</span>
              <span className="text-[10px] text-amber-400">Bengaluru Region</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Enrolled Student Body</span>
              <span className="text-2xl font-bold text-amber-400 mt-1 block">{totalStudentsAll.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500">Across 284 sections</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Collected Fee Revenue</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">₹{(totalRevenueAll / 10000000).toFixed(2)} Cr</span>
              <span className="text-[10px] text-emerald-400">95.2% collection rate</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Outstanding Arrears</span>
              <span className="text-2xl font-bold text-rose-400 mt-1 block">₹{(totalDuesAll / 100000).toFixed(1)} L</span>
              <span className="text-[10px] text-slate-500">Scheduled reminders</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Multiple Campus View */}
      {activeTab === 'multiple_campus' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Multiple Campus View & Comparative Reports</h2>
              <p className="text-xs text-slate-400">Aggregate statistics comparing campus metrics across the trust</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campuses.map((camp) => (
              <div
                key={camp.campusId}
                onClick={() => setActiveCampus(camp)}
                className={`p-5 rounded-xl border cursor-pointer transition ${
                  activeCampus.campusId === camp.campusId
                    ? 'bg-slate-800 border-amber-500 shadow-xl'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-400">{camp.location}</span>
                  {activeCampus.campusId === camp.campusId && (
                    <span className="text-[10px] font-semibold text-slate-950 bg-amber-400 px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-sm">{camp.campusName}</h3>
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Students Enrolled:</span>
                    <span className="font-bold text-white">{camp.totalStudents}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Faculty Count:</span>
                    <span className="font-bold text-white">{camp.totalTeachers}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Average Attendance:</span>
                    <span className="font-bold text-emerald-400">{camp.averageAttendanceRate}%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Average Exam Score:</span>
                    <span className="font-bold text-indigo-400">{camp.averageExamScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
            <strong>Context Rule Adherence:</strong> Campus comparisons and reports stay strictly within authorized campuses. Viewing aggregate numbers does not permit opening individual student private records without explicit authorization.
          </div>
        </div>
      )}

      {/* 3. Academic Reports */}
      {activeTab === 'academic_reports' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Cross-Campus Academic Performance Overview</h2>
          <p className="text-xs text-slate-400">Aggregate board pass percentage and standardized national benchmark percentiles</p>
          <div className="p-4 rounded-xl bg-slate-850 text-xs space-y-2">
            <div className="flex justify-between font-semibold text-white">
              <span>Apex South Tech Hub Campus:</span>
              <span className="text-emerald-400">86.8% Aggregate (Rank 1)</span>
            </div>
            <div className="flex justify-between font-semibold text-white">
              <span>Apex North Bengaluru Campus:</span>
              <span className="text-emerald-400">84.2% Aggregate (Rank 2)</span>
            </div>
            <div className="flex justify-between font-semibold text-white">
              <span>Apex Green Valley Campus:</span>
              <span className="text-emerald-400">81.5% Aggregate (Rank 3)</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Operational Reports */}
      {activeTab === 'operational_reports' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Operational & Exception Dashboard</h2>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-white">Infrastructure & Transport Health:</span>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-850 rounded-lg">Bus Fleet Compliance: <strong className="text-emerald-400">99.1%</strong></div>
              <div className="p-3 bg-slate-850 rounded-lg">Lab Equipment Uptime: <strong className="text-emerald-400">98.5%</strong></div>
              <div className="p-3 bg-slate-850 rounded-lg">Staff Retention Rate: <strong className="text-emerald-400">96.0%</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Financial Management */}
      {activeTab === 'financial_management' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Financial Governance & Fee Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Total Group Collections</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">₹{(totalRevenueAll / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Total Unpaid Arrears</span>
              <span className="text-2xl font-bold text-rose-400 mt-1 block">₹{(totalDuesAll / 100000).toFixed(1)} L</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Quarterly Operating Margin</span>
              <span className="text-2xl font-bold text-cyan-400 mt-1 block">28.4%</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Policy & Approvals */}
      {activeTab === 'policy_approvals' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Trustee Approvals & Institutional Policies</h2>
          <div className="p-3 bg-slate-850 rounded-lg border border-slate-800">
            <span className="font-bold text-white">Trustee Resolution TR-2026-44:</span>
            <p className="text-slate-400 mt-1">Approval of STEM Center modernization grant (₹1.2 Cr) for Green Valley Campus.</p>
          </div>
        </div>
      )}

      {/* 7. Grievance Overview */}
      {activeTab === 'grievance_overview' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">High-Level Grievance Trends</h2>
          <p className="text-slate-300">Total complaints across 3 campuses this quarter: 14 | Resolved within SLA: 13 (92.8%)</p>
        </div>
      )}

      {/* 8. Audit & Compliance */}
      {activeTab === 'audit_compliance' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Security Logs & Audit Traceability</h2>
          <div className="space-y-1 font-mono text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg">
            <div>[2026-10-14 14:10:22] AUTH_SUCCESS: User usr_prn_01 initiated exam publication for Grade 10 Math.</div>
            <div>[2026-10-14 13:45:09] RBAC_CHECK: Tenant isolation enforced across North and South campus nodes.</div>
            <div>[2026-10-14 11:22:15] CERT_VALIDATION: 2FA hardware tokens verified for privileged roles.</div>
          </div>
        </div>
      )}

      {/* 9. Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Trustee Policy Circulars</h2>
          <div className="space-y-2">
            {notices.map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-bold text-cyan-400">{n.category}</span>
                <h4 className="font-bold text-white">{n.title}</h4>
                <p className="text-slate-400">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Reports & Analytics */}
      {activeTab === 'reports_analytics' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Custom Multi-Dimensional Query Builder</h2>
          <p className="text-slate-400">Generate cross-campus longitudinal retention, fee amortization, and scholarship impact analyses.</p>
        </div>
      )}

      {/* 11. Profile */}
      {activeTab === 'profile' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 max-w-xl space-y-3 text-xs">
          <h2 className="text-base font-bold text-white">Trustee Executive Profile</h2>
          <p className="text-slate-300">Padmashri Meera Deshmukh • trustee.chair@apexgroup.edu</p>
          <div className="text-slate-400">Apex Education Group Board of Management</div>
        </div>
      )}
    </div>
  );
};
