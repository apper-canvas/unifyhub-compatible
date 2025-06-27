import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <div className="flex justify-center space-x-3">
            <Button
              onClick={onRetry}
              variant="primary"
              icon="RefreshCw"
            >
              Try Again
            </Button>
            
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
              icon="Home"
            >
              Reload Page
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Error