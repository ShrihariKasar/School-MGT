import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function LeaveApproval() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Mr. Rajesh",
      from: "2026-02-10",
      to: "2026-02-12",
      reason: "Medical",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <Layout role="admin">
      <h1 className="text-2xl font-bold mb-6">Leave Approvals</h1>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.from}</td>
                <td className="p-3">{r.to}</td>
                <td className="p-3">{r.reason}</td>

                <td className="p-3 font-medium">{r.status}</td>

                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => updateStatus(r.id, "Approved")}
                    className="text-emerald-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(r.id, "Rejected")}
                    className="text-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}