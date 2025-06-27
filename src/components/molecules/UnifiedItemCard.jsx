import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const UnifiedItemCard = ({ item, onSelect, onLink, isSelected = false }) => {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'email': return 'Mail'
      case 'message': return 'MessageSquare'
      case 'task': return 'CheckSquare'
      case 'event': return 'Calendar'
      default: return 'FileText'
    }
  }

  const truncateContent = (content, maxLength = 120) => {
    if (!content || content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={`
        card p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:shadow-card-hover'}
      `}
      onClick={() => onSelect?.(item.Id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="p-2 bg-secondary-100 rounded-lg flex-shrink-0">
            <ApperIcon 
              name={getTypeIcon(item.type)} 
              size={16} 
              className="text-secondary-600" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-secondary-900 truncate">
                {item.title}
              </h4>
              <Badge variant={item.type} size="xs">
                {item.source}
              </Badge>
            </div>
            
            {item.content && (
              <p className="text-sm text-secondary-600 mb-2">
                {truncateContent(item.content)}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-secondary-500">
                {format(new Date(item.timestamp), 'MMM d, h:mm a')}
              </span>
              
              {item.projectId && (
                <Badge variant="primary" size="xs">
                  Linked
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            icon="Link"
            onClick={(e) => {
              e.stopPropagation()
              onLink?.(item.Id)
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default UnifiedItemCard