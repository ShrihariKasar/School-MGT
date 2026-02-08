import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function ParentMessaging() {
  /* ===== SAMPLE DATA ===== */
  const students = [
    { id: 1, name: "Rahul Sharma", parent: "Mr. Sharma", phone: "9876543210" },
    { id: 2, name: "Sneha Patil", parent: "Mrs. Patil", phone: "9123456780" },
    { id: 3, name: "Amit Verma", parent: "Mr. Verma", phone: "9988776655" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [message, setMessage] = useState("");

  /* ===== SEND MESSAGE (FRONTEND DEMO) ===== */
  const handleSend = () => {
    if (!message.trim()) return alert("Please enter a message");

    const student = students.find((s) => s.id === Number(selectedStudent));

    console.log("Sending message to:", student);
    console.log("Message:", message);

    alert(`Message sent to ${student.parent} (Demo only)`);

    setMessage("");
  };

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Parent Messaging
        </h1>
        <p className="text-sm text-slate-500">
          Send attendance, assignment, or important updates to parents via WhatsApp.
        </p>
      </div>

      {/* ===== MESSAGE CARD ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 max-w-2xl">
        {/* Student Selector */}
        <label className="text-sm font-medium text-slate-600">
          Select Student
        </label>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.parent}
            </option>
          ))}
        </select>

        {/* Message Box */}
        <label className="text-sm font-medium text-slate-600">
          Message
        </label>

        <textarea
          rows="4"
          placeholder="Type message to send to parent..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-500 transition"
          >
            Send WhatsApp Message
          </button>
        </div>
      </div>

      {/* ===== RECENT MESSAGES (UI DEMO) ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 mt-6 max-w-2xl">
        <h2 className="font-semibold mb-4">Recent Messages</h2>

        <ul className="space-y-3 text-sm text-slate-600">
          <li className="border rounded-lg p-3">
            📩 Sent attendance update to Mr. Sharma
            <span className="block text-xs text-slate-400 mt-1">
              Today • 9:30 AM
            </span>
          </li>

          <li className="border rounded-lg p-3">
            📩 Sent homework reminder to Mrs. Patil
            <span className="block text-xs text-slate-400 mt-1">
              Yesterday • 4:10 PM
            </span>
          </li>
        </ul>
      </div>
    </Layout>
  );
}