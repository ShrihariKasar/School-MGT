import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Assets() {
  /* ===== DEMO ASSET DATA ===== */
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "Computer System",
      department: "Computer Lab",
      occupiedBy: "Mr. Rajesh Kumar",
      quantity: 20,
      condition: "Good",
    },
    {
      id: 2,
      name: "Projector",
      department: "Smart Class",
      occupiedBy: "Ms. Priya Sharma",
      quantity: 5,
      condition: "Maintenance",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    department: "",
    occupiedBy: "",
    quantity: "",
    condition: "Good",
  });

  /* ===== ADD ASSET ===== */
  const addAsset = () => {
    if (!form.name || !form.department || !form.quantity) return;

    setAssets([...assets, { id: Date.now(), ...form }]);

    setForm({
      name: "",
      department: "",
      occupiedBy: "",
      quantity: "",
      condition: "Good",
    });

    setShowModal(false);
  };

  /* ===== DELETE ASSET ===== */
  const deleteAsset = (id) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  const conditionStyle = (condition) => {
    if (condition === "Good") return "bg-emerald-100 text-emerald-700";
    if (condition === "Damaged") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Asset & Inventory Management
          </h1>
          <p className="text-sm text-slate-500">
            Track school equipment, assigned staff, quantity, and condition.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Asset
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Asset Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Occupied by</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Condition</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((a) => (
              <tr key={a.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{a.name}</td>
                <td className="p-3">{a.department}</td>
                <td className="p-3">{a.occupiedBy || "—"}</td>
                <td className="p-3">{a.quantity}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${conditionStyle(
                      a.condition
                    )}`}
                  >
                    {a.condition}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteAsset(a.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ADD ASSET MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Asset</h2>

            {/* Asset Name */}
            <input
              type="text"
              placeholder="Asset Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Department */}
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Occupied By */}
            <input
              type="text"
              placeholder="Occupied by (Teacher Name)"
              value={form.occupiedBy}
              onChange={(e) =>
                setForm({ ...form, occupiedBy: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Quantity */}
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Condition */}
            <select
              value={form.condition}
              onChange={(e) =>
                setForm({ ...form, condition: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option>Good</option>
              <option>Maintenance</option>
              <option>Damaged</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addAsset}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}