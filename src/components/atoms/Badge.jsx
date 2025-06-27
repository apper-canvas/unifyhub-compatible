import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'sm',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-secondary-100 text-secondary-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    email: 'bg-blue-100 text-blue-800',
    message: 'bg-green-100 text-green-800',
    task: 'bg-orange-100 text-orange-800',
    event: 'bg-purple-100 text-purple-800'
  }
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default Badge