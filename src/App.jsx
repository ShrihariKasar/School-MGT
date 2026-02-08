import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ===== MAIN ROUTES ===== */}
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}