import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import StatusDot from '@/components/atoms/StatusDot'
import Button from '@/components/atoms/Button'
import { format } from 'date-fns'

const ServiceConnectionCard = ({ service, onConnect, onDisconnect, onRefresh }) => {
  const serviceIcons = {
    gmail: 'Mail',
    outlook: 'Mail',
    slack: 'MessageSquare',
    teams: 'Users',
    discord: 'MessageCircle',
    gcalendar: 'Calendar',
    outlook_calendar: 'Calendar',
    todoist: 'CheckSquare',
    asana: 'List',
    trello: 'Kanban'
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'connected': return 'Connected'
      case 'syncing': return 'Syncing...'
      case 'error': return 'Connection Error'
      default: return 'Not Connected'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      className="card p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <ApperIcon 
              name={serviceIcons[service.type] || 'Settings'} 
              size={20} 
              className="text-primary-600" 
            />
          </div>
          <div>
            <h3 className="font-semibold text-secondary-900">{service.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <StatusDot status={service.status} />
              <span className="text-sm text-secondary-600">
                {getStatusText(service.status)}
              </span>
            </div>
            {service.lastSync && (
              <p className="text-xs text-secondary-500 mt-1">
                Last sync: {format(new Date(service.lastSync), 'MMM d, h:mm a')}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {service.status === 'connected' && (
            <Button
              variant="ghost"
              size="sm"
              icon="RefreshCw"
              onClick={() => onRefresh?.(service.Id)}
            />
          )}
          
          {service.status === 'connected' ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onDisconnect?.(service.Id)}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConnect?.(service.Id)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceConnectionCard