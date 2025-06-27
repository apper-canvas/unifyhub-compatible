import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import UnifiedInbox from '@/components/pages/UnifiedInbox'
import CalendarView from '@/components/pages/CalendarView'
import TasksDashboard from '@/components/pages/TasksDashboard'
import ProjectsHub from '@/components/pages/ProjectsHub'
import RulesEngine from '@/components/pages/RulesEngine'
import Settings from '@/components/pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/inbox" replace />} />
            <Route path="inbox" element={<UnifiedInbox />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="tasks" element={<TasksDashboard />} />
            <Route path="projects" element={<ProjectsHub />} />
            <Route path="rules" element={<RulesEngine />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App