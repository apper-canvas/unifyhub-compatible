import { motion } from 'framer-motion'
import { useContext } from 'react'
import { AuthContext } from '@/App'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
const Header = ({ title, onSearch, showSearch = true }) => {
  const { logout } = useContext(AuthContext)
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-secondary-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-secondary-900">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="w-96">
              <SearchBar onSearch={onSearch} />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Bell"
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              icon="Settings"
            />
            
            <Button
              variant="ghost"
              size="sm"
              icon="LogOut"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header