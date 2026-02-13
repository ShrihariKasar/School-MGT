import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ===== DEMO STUDENT DATA (MATCHES ADMISSION FORM STRUCTURE) ===== */
  const student = {
    id,
    firstName: "Rahul",
    middleName: "",
    lastName: "Sharma",
    class: "6A",
    rollNumber: "23",
    admissionNumber: "ADM1023",
    dateOfBirth: "2012-05-14",
    gender: "Male",
    bloodGroup: "B+",
    nationality: "Indian",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    currentAddress: "MG Road, Pune",
    permanentAddress: "MG Road, Pune",

    parentFirstName: "Ramesh",
    parentLastName: "Sharma",
    parentPhoneNumber: "9876543210",
    parentEmail: "ramesh@email.com",
    relationship: "Father",

    attendance: "91%",
    feeStatus: "Pending", // Phase-2 backend
  };

  /* ===== DEMO ACADEMIC PERFORMANCE ===== */
  const academicData = [
    { exam: "Unit 1", score: 72 },
    { exam: "Unit 2", score: 80 },
    { exam: "Midterm", score: 76 },
    { exam: "Unit 3", score: 85 },
    { exam: "Final", score: 88 },
  ];

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back
        </button>
      </div>

      {/* ===== BASIC INFO CARD ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {student.firstName} {student.lastName}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <p><strong>Class:</strong> {student.class}</p>
          <p><strong>Roll No:</strong> {student.rollNumber}</p>
          <p><strong>Admission No:</strong> {student.admissionNumber}</p>
          <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
          <p><strong>Nationality:</strong> {student.nationality}</p>
          <p><strong>City:</strong> {student.city}</p>
          <p><strong>State:</strong> {student.state}</p>
          <p><strong>Country:</strong> {student.country}</p>
          <p className="sm:col-span-2">
            <strong>Current Address:</strong> {student.currentAddress}
          </p>
          <p className="sm:col-span-2">
            <strong>Permanent Address:</strong> {student.permanentAddress}
          </p>

          <p><strong>Attendance:</strong> {student.attendance}</p>

          <p>
            <strong>Fee Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                student.feeStatus === "Paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {student.feeStatus}
            </span>
          </p>
        </div>
      </div>

      {/* ===== PARENT INFO CARD ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h2 className="font-semibold mb-4">Parent Information</h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <p>
            <strong>Name:</strong> {student.parentFirstName}{" "}
            {student.parentLastName}
          </p>
          <p><strong>Relationship:</strong> {student.relationship}</p>
          <p><strong>Phone:</strong> {student.parentPhoneNumber}</p>
          <p><strong>Email:</strong> {student.parentEmail}</p>
        </div>
      </div>

      {/* ===== ACADEMIC PERFORMANCE CHART ===== */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="font-semibold mb-4">Academic Performance</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={academicData}>
              <XAxis dataKey="exam" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}