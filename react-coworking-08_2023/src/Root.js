import './Root.css';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import CoworkingsPage from './pages/CoworkingsPage';
import HomePage from './pages/HomePage';
import CoworkingAdd from './pages/CoworkingAdd';
import CoworkingUpdate from './pages/CoworkingUpdate';
import LoginPage from './pages/LoginPage';

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
    </Routes>
  );
}