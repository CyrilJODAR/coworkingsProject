import './Root.css';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import CoworkingsPage from './pages/admin/CoworkingsPage';
import HomePage from './pages/public/HomePage';
import CoworkingAdd from './pages/admin/CoworkingAdd';
import CoworkingUpdate from './pages/admin/CoworkingUpdate';
import LoginPage from './pages/public/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import CoworkingsUserPage from './pages/public/CoworkingUserPage';
import CoworkingViewPublic from './components/public/CoworkingViewPublic';

// 3️⃣ Router singleton created
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

// 4️⃣ RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}

// 1️⃣ Changed from App to Root
function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/admin/coworkings" element={<CoworkingsPage />} />
      <Route path="/admin/coworkings/add" element={<CoworkingAdd />} />
      <Route path="/admin/coworkings/:id/update" element={<CoworkingUpdate />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/coworkings" element={<CoworkingsUserPage/>}/>
      <Route path="/coworkings/:id" element={<CoworkingViewPublic />} />
    </Routes>
  );
}