import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = () => {
  const menuItems = [
    { path: '/inbox', label: 'Unified Inbox', icon: 'Inbox', count: 12 },
    { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
    { path: '/tasks', label: 'Tasks', icon: 'CheckSquare', count: 8 },
    { path: '/projects', label: 'Projects', icon: 'FolderOpen', count: 3 },
    { path: '/rules', label: 'Rules', icon: 'Zap', count: 5 },
    { path: '/settings', label: 'Settings', icon: 'Settings' }
  ]

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-60 bg-white border-r border-secondary-200 h-full flex flex-col"
    >
      <div className="p-6 border-b border-secondary-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary-900">UnifyHub</h2>
            <p className="text-xs text-secondary-500">Productivity Command Center</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <ApperIcon name={item.icon} size={18} className="mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className="bg-primary-100 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-secondary-200">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium text-secondary-900">All Services Connected</span>
          </div>
          <p className="text-xs text-secondary-600">
            6 services syncing successfully
          </p>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar