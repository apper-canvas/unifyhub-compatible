import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout