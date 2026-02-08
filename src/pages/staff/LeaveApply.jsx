import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function LeaveApply() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    from: "",
    to: "",
    reason: "",
  });

  const applyLeave = () => {
    if (!form.from || !form.to || !form.reason) return;

    setLeaves([
      ...leaves,
      { id: Date.now(), ...form, status: "Pending" },
    ]);

    setForm({ from: "", to: "", reason: "" });
  };

  return (
    <Layout role="staff">
      <h1 className="text-2xl font-bold mb-6">Apply for Leave</h1>

      {/* Form */}
      <div className="bg-white p-5 rounded-2xl shadow border mb-6 max-w-xl">
        <div className="space-y-3">
          <input
            type="date"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Reason"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            onClick={applyLeave}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            Submit Leave Request
          </button>
        </div>
      </div>

      {/* Leave List */}
      <div className="bg-white rounded-2xl shadow border">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{l.from}</td>
                <td className="p-3">{l.to}</td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3">
                  <span className="text-yellow-600 font-medium">
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}