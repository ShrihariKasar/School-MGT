import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StaffDashboard from "../pages/staff/StaffDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Attendance from "../pages/staff/Attendance";
import Students from "../pages/admin/Students";
import Staff from "../pages/admin/Staff";
import Assignments from "../pages/staff/Assignments";
import ParentMessaging from "../pages/staff/ParentMessaging";
import LeaveApply from "../pages/staff/LeaveApply";
import LeaveApproval from "../pages/admin/LeaveApproval";
import StaffProfile from "../pages/admin/StaffProfile";
import StudentProfile from "../pages/admin/StudentProfile";
import Timetable from "../pages/admin/Timetable";
import Curriculum from "../pages/admin/Curriculum";
import Holidays from "../pages/admin/Holidays";
import Announcements from "../pages/admin/Announcements";
import Regulatory from "../pages/admin/Regulatory";
import Events from "../pages/admin/Events";
import Timesheet from "../pages/admin/Timesheet";
import Examinations from "../pages/admin/Examinations";
import Assets from "../pages/admin/Assets";

export default function AppRoutes() {
  const { user, loading } = useAuth();

  /* ===== SHOW LOADING WHILE CHECKING AUTH ===== */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* ===== LOGIN ===== */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/staff"} />
          ) : (
            <Login />
          )
        }
      />

      {/* ===== ADMIN DASHBOARD ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin/students"
  element={
    <ProtectedRoute role="admin">
      <Students />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/staff"
  element={
    <ProtectedRoute role="admin">
      <Staff />
    </ProtectedRoute>
  }
/>
<Route
  path="/staff/leave"
  element={
    <ProtectedRoute role="staff">
      <LeaveApply />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/leaves"
  element={
    <ProtectedRoute role="admin">
      <LeaveApproval />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/staff/:id"
  element={
    <ProtectedRoute role="admin">
      <StaffProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/students/:id"
  element={
    <ProtectedRoute role="admin">
      <StudentProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/timetable"
  element={
    <ProtectedRoute role="admin">
      <Timetable />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/curriculum"
  element={
    <ProtectedRoute role="admin">
      <Curriculum />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/holidays"
  element={
    <ProtectedRoute role="admin">
      <Holidays />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/announcements"
  element={
    <ProtectedRoute role="admin">
      <Announcements />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/regulatory"
  element={
    <ProtectedRoute role="admin">
      <Regulatory />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/events"
  element={
    <ProtectedRoute role="admin">
      <Events />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/timesheet"
  element={
    <ProtectedRoute role="admin">
      <Timesheet />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/examinations"
  element={
    <ProtectedRoute role="admin">
      <Examinations />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/assets"
  element={
    <ProtectedRoute role="admin">
      <Assets />
    </ProtectedRoute>
  }
/>
      {/* ===== STAFF DASHBOARD ===== */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute role="staff">
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
<Route
  path="/staff/attendance"
  element={
    <ProtectedRoute role="staff">
      <Attendance />
    </ProtectedRoute>
  }
/>
<Route
  path="/staff/assignments"
  element={
    <ProtectedRoute role="staff">
      <Assignments />
    </ProtectedRoute>
  }
/>
<Route
  path="/staff/parents"
  element={
    <ProtectedRoute role="staff">
      <ParentMessaging />
    </ProtectedRoute>
  }
/>
      {/* ===== DEFAULT REDIRECT ===== */}
      <Route
        path="/"
        element={
          <Navigate to={user ? (user.role === "admin" ? "/admin" : "/staff") : "/login"} />
        }
      />

      {/* ===== UNKNOWN ROUTES ===== */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
