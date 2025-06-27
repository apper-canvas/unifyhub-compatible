import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { unifiedItemService } from '@/services/api/unifiedItemService'

const CalendarGrid = ({ currentDate, onDateSelect, onEventSelect }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await unifiedItemService.getAll()
      
      // Filter for events only
      const eventItems = data.filter(item => item.type === 'event')
      setEvents(eventItems)
    } catch (err) {
      setError('Failed to load calendar events. Please try again.')
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [currentDate])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDay = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.timestamp), date)
    )
  }

  const hasConflicts = (dayEvents) => {
    return dayEvents.length > 1
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadEvents} />

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="grid grid-cols-7 gap-px bg-secondary-200 rounded-lg overflow-hidden">
        {/* Header row */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-secondary-50 p-3 text-center">
            <span className="text-sm font-medium text-secondary-600">{day}</span>
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map(day => {
          const dayEvents = getEventsForDay(day)
          const hasConflict = hasConflicts(dayEvents)
          
          return (
            <motion.div
              key={day.toISOString()}
              whileHover={{ scale: 1.02 }}
              className={`
                bg-white p-3 h-24 cursor-pointer transition-colors duration-200
                ${isToday(day) ? 'bg-primary-50 border-2 border-primary-200' : 'hover:bg-secondary-50'}
                ${hasConflict ? 'bg-red-50 border border-red-200' : ''}
              `}
              onClick={() => onDateSelect?.(day)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`
                  text-sm font-medium
                  ${isToday(day) ? 'text-primary-600' : 'text-secondary-900'}
                `}>
                  {format(day, 'd')}
                </span>
                
                {hasConflict && (
                  <ApperIcon name="AlertTriangle" size={12} className="text-red-500" />
                )}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <motion.div
                    key={event.Id}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs p-1 bg-primary-100 text-primary-700 rounded truncate cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventSelect?.(event)
                    }}
                  >
                    {event.title}
                  </motion.div>
                ))}
                
                {dayEvents.length > 2 && (
                  <div className="text-xs text-secondary-500">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-8">
          <Empty message="No events found for this month" />
        </div>
      )}
    </div>
  )
}

export default CalendarGrid