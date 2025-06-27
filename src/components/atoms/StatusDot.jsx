import { motion } from 'framer-motion'

const StatusDot = ({ status = 'connected', size = 'sm', className = '' }) => {
  const colors = {
    connected: 'bg-success',
    syncing: 'bg-warning animate-pulse',
    error: 'bg-error',
    offline: 'bg-secondary-300'
  }
  
  const sizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        inline-block rounded-full
        ${colors[status]}
        ${sizes[size]}
        ${className}
      `}
    />
  )
}

export default StatusDot