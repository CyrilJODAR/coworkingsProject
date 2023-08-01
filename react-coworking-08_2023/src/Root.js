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
      <Route path="/coworkings" element={<CoworkingsPage />} />
      <Route path="/postCoworking" element={<CoworkingAdd />} />
      {/* <Route path="/blog/*" element={<BlogApp />} />
      <Route path="/users/*" element={<UserApp />} /> */}
    </Routes>
  );
}