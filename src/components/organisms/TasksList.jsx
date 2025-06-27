import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { unifiedItemService } from '@/services/api/unifiedItemService'
import { toast } from 'react-toastify'

const TasksList = ({ view = 'list', statusFilter = 'all', sourceFilter = 'all' }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await unifiedItemService.getAll()
      
      let filteredTasks = data.filter(item => item.type === 'task')
      
      if (sourceFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.source === sourceFilter)
      }
      
      // Sort by timestamp descending
      filteredTasks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      setTasks(filteredTasks)
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      // In a real app, this would update the task status via API
      toast.success('Task marked as complete')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleLinkToProject = async (taskId) => {
    try {
      // In a real app, this would open a modal to select/create project
      toast.success('Task linked to project successfully')
    } catch (err) {
      toast.error('Failed to link task to project')
    }
  }

  useEffect(() => {
    loadTasks()
  }, [statusFilter, sourceFilter])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />
  if (tasks.length === 0) return <Empty message="No tasks found" />

  const TaskCard = ({ task }) => (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      className="card p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCompleteTask(task.Id)}
            className="w-5 h-5 rounded border-2 border-secondary-300 hover:border-primary-500 flex items-center justify-center mt-0.5"
          >
            <ApperIcon name="Check" size={12} className="text-transparent hover:text-primary-500" />
          </motion.button>
          
          <div className="flex-1">
<div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-secondary-900">
                {task.title}
              </h4>
              <Badge variant={task.type} size="xs">
                {task.source}
              </Badge>
            </div>
            
            {task.content && (
              <p className="text-sm text-secondary-600 mb-2">
                {task.content}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-secondary-500">
                {format(new Date(task.timestamp), 'MMM d, h:mm a')}
              </span>
              
{task.project_id && (
                <Badge variant="primary" size="xs">
                  Linked
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-2">
          <Button
            variant="ghost"
            size="sm"
            icon="Link"
            onClick={() => handleLinkToProject(task.Id)}
          />
        </div>
      </div>
    </motion.div>
  )

  if (view === 'kanban') {
    const columns = [
      { id: 'todo', title: 'To Do', tasks: tasks.filter(t => !t.completed) },
      { id: 'in-progress', title: 'In Progress', tasks: [] },
      { id: 'done', title: 'Done', tasks: [] }
    ]

    return (
      <div className="grid grid-cols-3 gap-6">
        {columns.map(column => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-secondary-900">{column.title}</h3>
              <Badge variant="default" size="sm">
                {column.tasks.length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {column.tasks.map(task => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TasksList