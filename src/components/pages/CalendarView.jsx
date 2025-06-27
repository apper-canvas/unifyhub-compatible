import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, addMonths, subMonths } from 'date-fns'
import Header from '@/components/organisms/Header'
import CalendarGrid from '@/components/organisms/CalendarGrid'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [view, setView] = useState('month')

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    // In a real app, this might open a detail panel or modal
  }

  const handleEventSelect = (event) => {
    console.log('Selected event:', event)
    // In a real app, this would open event details
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Calendar"
        showSearch={false}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Calendar Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-secondary-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="ChevronLeft"
                  onClick={handlePreviousMonth}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToday}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="ChevronRight"
                  onClick={handleNextMonth}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white rounded-lg border border-secondary-200 p-1">
                {['month', 'week', 'day'].map(viewType => (
                  <motion.button
                    key={viewType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView(viewType)}
                    className={`
                      px-3 py-1 rounded text-sm font-medium capitalize transition-colors duration-200
                      ${view === viewType
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-secondary-600 hover:text-secondary-900'
                      }
                    `}
                  >
                    {viewType}
                  </motion.button>
                ))}
              </div>
              
              <Button
                variant="primary"
                icon="Plus"
              >
                New Event
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <span className="text-secondary-600">Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertTriangle" size={12} className="text-red-500" />
              <span className="text-secondary-600">Conflicts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-500 rounded-full" />
              <span className="text-secondary-600">Today</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <CalendarGrid
            currentDate={currentDate}
            onDateSelect={handleDateSelect}
            onEventSelect={handleEventSelect}
          />

          {/* Selected Date Info */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <h3 className="font-semibold text-secondary-900 mb-2">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <p className="text-secondary-600">
                No events scheduled for this date
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarView