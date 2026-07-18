import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MindMapPage from "./pages/MindMapPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/mindmap/:id"
                    element={<MindMapPage />}
                />


                <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}