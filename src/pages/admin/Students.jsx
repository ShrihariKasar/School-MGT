import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

export default function Students() {
  const navigate = useNavigate();

  /* ===== SAMPLE DATA ===== */
  const [students, setStudents] = useState([
    { id: 1, firstName: "Rahul", lastName: "Sharma", class: "5A" },
    { id: 2, firstName: "Sneha", lastName: "Patil", class: "6B" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ===== FORM STATE ===== */
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    birthMark: "",
    gender: "",
    nationality: "",
    bloodGroup: "",
    otherBloodGroup: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    otherState: "",
    country: "",
    otherCountry: "",
    parentFirstName: "",
    parentLastName: "",
    parentPhoneNumber: "",
    parentEmail: "",
    relationship: "",
    admissionNumber: "",
    rollNumber: "",
    studentPhoto: "",
    class: "",
  });

  /* ===== DROPDOWN DATA ===== */
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Other"];
  const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  /* Union Territories */
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",

  "Other",
];
  const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",

  /* Gulf Countries (very common for Indian students) */
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",

  /* Asia */
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Japan",
  "South Korea",
  "China",
  "Nepal",
  "Bangladesh",
  "Sri Lanka",
  "Pakistan",

  /* Europe */
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Ireland",
  "Sweden",
  "Switzerland",

  /* Africa */
  "South Africa",
  "Kenya",
  "Nigeria",

  /* Americas */
  "Mexico",
  "Brazil",

  "Other",
];
  /* ===== FILTER ===== */
  const filteredStudents = students.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== ADD STUDENT ===== */
  const addStudent = () => {
    if (!form.firstName || !form.class) return;

    const finalStudent = {
      ...form,
      bloodGroup: form.bloodGroup === "Other" ? form.otherBloodGroup : form.bloodGroup,
      state: form.state === "Other" ? form.otherState : form.state,
      country: form.country === "Other" ? form.otherCountry : form.country,
      id: Date.now(),
    };

    setStudents([...students, finalStudent]);
    setShowModal(false);
  };

  /* ===== DELETE ===== */
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <Layout role="admin">
      {/* HEADER */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
  <div>
    <h1 className="text-2xl font-bold text-slate-800">Students Management</h1>
    <p className="text-sm text-slate-500">
      View, search, and manage enrolled students.
    </p>
  </div>

  <button
    onClick={() => setShowModal(true)}
    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-emerald-500 transition font-medium"
  >
    + Add Student
  </button>
</div>

{/* SEARCH */}
<div className="bg-white rounded-2xl shadow border p-4 mb-6">
  <input
    type="text"
    placeholder="Search by student name or class..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
</div>

{/* TABLE CARD */}
<div className="bg-white rounded-2xl shadow border overflow-hidden">
  <table className="w-full text-sm">
    <thead className="bg-slate-50 text-slate-600">
      <tr>
        <th className="p-4 text-left font-semibold">Student Name</th>
        <th className="p-4 text-left font-semibold">Class</th>
        <th className="p-4 text-right font-semibold">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredStudents.length === 0 && (
        <tr>
          <td colSpan="3" className="p-6 text-center text-slate-400">
            No students found
          </td>
        </tr>
      )}

      {filteredStudents.map((s) => (
        <tr
          key={s.id}
          className="border-t hover:bg-slate-50 transition"
        >
          {/* NAME */}
          <td className="p-4 font-medium text-slate-800">
            {s.firstName} {s.lastName}
          </td>

          {/* CLASS BADGE */}
          <td className="p-4">
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
              {s.class}
            </span>
          </td>

          {/* ACTIONS */}
          <td className="p-4 text-right space-x-3">
            <button
              onClick={() => navigate(`/admin/students/${s.id}`)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View
            </button>

            <button
              onClick={() => deleteStudent(s.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      {/* ===== ADMISSION MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start overflow-auto py-10 z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Student Admission Form</h2>

            {/* PERSONAL INFO */}
            <h3 className="font-semibold mb-2">Personal Information</h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["firstName", "First Name"],
                ["middleName", "Middle Name"],
                ["lastName", "Last Name"],
                ["dateOfBirth", "Date of Birth", "date"],
                ["birthMark", "Birth Mark"],
                ["nationality", "Nationality"],
                ["city", "City"],
                ["class", "Class"],
                ["admissionNumber", "Admission No"],
                ["rollNumber", "Roll No"],
              ].map(([key, label, type = "text"]) => (
                <input
                  key={key}
                  type={type}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                />
              ))}

              {/* Gender */}
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              {/* Blood Group */}
              <select
                value={form.bloodGroup}
                onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>

              {form.bloodGroup === "Other" && (
                <input
                  placeholder="Enter Blood Group"
                  value={form.otherBloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, otherBloodGroup: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 col-span-2"
                />
              )}

              {/* State */}
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">State</option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              {form.state === "Other" && (
                <input
                  placeholder="Enter State"
                  value={form.otherState}
                  onChange={(e) =>
                    setForm({ ...form, otherState: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              )}

              {/* Country */}
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">Country</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {form.country === "Other" && (
                <input
                  placeholder="Enter Country"
                  value={form.otherCountry}
                  onChange={(e) =>
                    setForm({ ...form, otherCountry: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2"
                />
              )}

              {/* Addresses */}
              <textarea
                placeholder="Current Address"
                value={form.currentAddress}
                onChange={(e) =>
                  setForm({ ...form, currentAddress: e.target.value })
                }
                className="border rounded-lg px-3 py-2 col-span-2"
              />
              <textarea
                placeholder="Permanent Address"
                value={form.permanentAddress}
                onChange={(e) =>
                  setForm({ ...form, permanentAddress: e.target.value })
                }
                className="border rounded-lg px-3 py-2 col-span-2"
              />

              {/* Photo */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Student Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, studentPhoto: e.target.files[0]?.name })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* PARENT INFO */}
            <h3 className="font-semibold mt-6 mb-2">Parent Information</h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["parentFirstName", "Parent First Name"],
                ["parentLastName", "Parent Last Name"],
                ["parentPhoneNumber", "Phone Number"],
                ["parentEmail", "Email"],
                ["relationship", "Relationship"],
              ].map(([key, label]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                />
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}