import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
// Layouts
import MainLayout from "./components/layout/MainLayout"
// Pages
import LandingPage from "./pages/LandingPage"
import CoursesPage from "./pages/CoursesPage"
import DashboardPage from "./pages/DashboardPage"
import CourseCreatePage from "./pages/CourseCreatePage"
import CourseViewPage from "./pages/CourseViewPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseViewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/create" element={<CourseCreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" theme="system" />
    </>
  )
}

export default App
