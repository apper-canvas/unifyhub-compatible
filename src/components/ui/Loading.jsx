import { motion } from 'framer-motion'

const Loading = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-48 animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-32 animate-pulse" />
        </div>
        <div className="h-10 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-32 animate-pulse" />
      </div>

      {/* Content skeletons */}
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-200 to-secondary-100 rounded-lg animate-pulse flex-shrink-0" />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-5 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-48 animate-pulse" />
                  <div className="h-5 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full w-16 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-full animate-pulse" />
                  <div className="h-4 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-3/4 animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-lg w-24 animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-accent-200 to-accent-100 rounded-full w-12 animate-pulse" />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-200 to-secondary-100 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-200 to-secondary-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading