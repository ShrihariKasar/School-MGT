import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function ParentMessaging() {
  /* ===== SAMPLE STUDENTS ===== */
  const students = [
    { id: 1, name: "Rahul Sharma", parent: "Mr. Sharma", phone: "9876543210" },
    { id: 2, name: "Sneha Patil", parent: "Mrs. Patil", phone: "9123456780" },
    { id: 3, name: "Amit Verma", parent: "Mr. Verma", phone: "9988776655" },
  ];

  /* ===== STATE ===== */
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  /* ===== MESSAGE HISTORY ===== */
  const [history, setHistory] = useState([
    {
      id: 1,
      studentId: 1,
      text: "Attendance update: Present today.",
      time: "Today • 9:30 AM",
      status: "Delivered",
    },
    {
      id: 2,
      studentId: 2,
      text: "Homework reminder for Science project.",
      time: "Yesterday • 4:10 PM",
      status: "Sent",
    },
  ]);

  /* ===== SEND MESSAGE ===== */
  const handleSend = () => {
    if (!message.trim()) return alert("Please enter a message");

    const newMsg = {
      id: Date.now(),
      studentId: Number(selectedStudent),
      text: message,
      time: "Just now",
      status: "Sent",
    };

    setHistory([newMsg, ...history]);
    setMessage("");

    alert("Message sent (Demo)");
  };

  /* ===== FILTERED HISTORY ===== */
  const filteredHistory = history
    .filter((m) => m.studentId === Number(selectedStudent))
    .filter((m) => m.text.toLowerCase().includes(search.toLowerCase()));

  const statusStyle = (status) => {
    if (status === "Delivered") return "text-emerald-600";
    if (status === "Failed") return "text-red-600";
    return "text-amber-600";
  };

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Parent Communication
        </h1>
        <p className="text-sm text-slate-500">
          Send updates and view full communication history with parents.
        </p>
      </div>

      {/* ===== MESSAGE SENDER ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 max-w-2xl">
        {/* Student Selector */}
        <label className="text-sm font-medium text-slate-600">
          Select Student
        </label>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 focus:ring-2 focus:ring-emerald-500"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.parent}
            </option>
          ))}
        </select>

        {/* Message Box */}
        <textarea
          rows="4"
          placeholder="Type message to send to parent..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-emerald-500"
        />

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-500"
          >
            Send Message
          </button>
        </div>
      </div>

      {/* ===== HISTORY ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 mt-6 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Communication History</h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          />
        </div>

        {/* EMPTY */}
        {filteredHistory.length === 0 && (
          <p className="text-sm text-slate-400">No messages found.</p>
        )}

        {/* CHAT STYLE LIST */}
        <ul className="space-y-3">
          {filteredHistory.map((m) => (
            <li key={m.id} className="border rounded-lg p-3">
              <p className="text-sm text-slate-700">{m.text}</p>

              <div className="flex justify-between text-xs mt-2">
                <span className="text-slate-400">{m.time}</span>
                <span className={`font-medium ${statusStyle(m.status)}`}>
                  {m.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}