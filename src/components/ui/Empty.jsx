import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  message = 'No items found',
  description,
  actionText,
  onAction,
  icon = 'Inbox',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} size={32} className="text-primary-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          {message}
        </h3>
        
        {description && (
          <p className="text-secondary-600 mb-6">
            {description}
          </p>
        )}
        
        {actionText && onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            icon="Plus"
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
          >
            {actionText}
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty