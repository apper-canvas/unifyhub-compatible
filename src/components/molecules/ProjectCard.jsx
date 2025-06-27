import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import { format } from 'date-fns'

const ProjectCard = ({ project, onSelect, onEdit, onDelete }) => {
  const itemCounts = {
    email: project.linkedItems?.filter(id => id.includes('email')).length || 0,
    message: project.linkedItems?.filter(id => id.includes('message')).length || 0,
    task: project.linkedItems?.filter(id => id.includes('task')).length || 0,
    event: project.linkedItems?.filter(id => id.includes('event')).length || 0
  }

  const totalItems = project.linkedItems?.length || 0

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="card p-6 cursor-pointer"
      onClick={() => onSelect?.(project.Id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <h3 className="font-semibold text-secondary-900 mb-1">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-secondary-600">
                {project.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            icon="Edit"
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(project.Id)
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(project.Id)
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {itemCounts.email > 0 && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="Mail" size={14} className="text-blue-600" />
              <span className="text-sm text-secondary-600">{itemCounts.email}</span>
            </div>
          )}
          {itemCounts.message > 0 && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="MessageSquare" size={14} className="text-green-600" />
              <span className="text-sm text-secondary-600">{itemCounts.message}</span>
            </div>
          )}
          {itemCounts.task > 0 && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="CheckSquare" size={14} className="text-orange-600" />
              <span className="text-sm text-secondary-600">{itemCounts.task}</span>
            </div>
          )}
          {itemCounts.event > 0 && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" size={14} className="text-purple-600" />
              <span className="text-sm text-secondary-600">{itemCounts.event}</span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <Badge variant="default" size="sm">
            {totalItems} items
          </Badge>
          <p className="text-xs text-secondary-500 mt-1">
            {format(new Date(project.created), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard