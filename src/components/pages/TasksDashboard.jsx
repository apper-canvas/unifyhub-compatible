import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import TasksList from "@/components/organisms/TasksList";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import AppIcon from "@/components/atoms/AppIcon";
const TasksDashboard = () => {
  const [view, setView] = useState('list')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')

  const statusFilters = [
    { value: 'all', label: 'All Tasks', count: 8 },
    { value: 'todo', label: 'To Do', count: 5 },
    { value: 'in-progress', label: 'In Progress', count: 2 },
    { value: 'done', label: 'Done', count: 1 }
  ]

  const sourceFilters = [
    { value: 'all', label: 'All Sources' },
    { value: 'todoist', label: 'Todoist' },
    { value: 'asana', label: 'Asana' },
    { value: 'trello', label: 'Trello' }
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Tasks Dashboard"
        showSearch={false}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Status Filters */}
              <div className="flex items-center space-x-2">
                {statusFilters.map(filter => (
                  <motion.button
                    key={filter.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200
                      ${statusFilter === filter.value
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-white text-secondary-600 border border-secondary-200 hover:bg-secondary-50'
                      }
                    `}
                  >
                    <span>{filter.label}</span>
                    <Badge variant={statusFilter === filter.value ? 'primary' : 'default'} size="xs">
                      {filter.count}
                    </Badge>
                  </motion.button>
                ))}
              </div>

              {/* Source Filter */}
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="input-field w-40"
              >
                {sourceFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* View Toggle */}
              <div className="flex items-center bg-white rounded-lg border border-secondary-200 p-1">
                {['list', 'kanban'].map(viewType => (
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
                New Task
              </Button>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Tasks', value: '8', icon: 'CheckSquare', color: 'primary' },
              { label: 'In Progress', value: '2', icon: 'Clock', color: 'warning' },
              { label: 'Completed Today', value: '3', icon: 'CheckCircle', color: 'success' },
              { label: 'Overdue', value: '1', icon: 'AlertCircle', color: 'danger' }
            ].map(stat => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02, y: -2 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-secondary-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`
                    p-3 rounded-lg
                    ${stat.color === 'primary' ? 'bg-primary-100' : ''}
                    ${stat.color === 'warning' ? 'bg-yellow-100' : ''}
                    ${stat.color === 'success' ? 'bg-green-100' : ''}
${stat.color === 'danger' ? 'bg-red-100' : ''}
                  `}>
                    <AppIcon 
                      name={stat.icon} 
                      size={20} 
                      className={`
                        ${stat.color === 'primary' ? 'text-primary-600' : ''}
                        ${stat.color === 'warning' ? 'text-yellow-600' : ''}
                        ${stat.color === 'success' ? 'text-green-600' : ''}
                        ${stat.color === 'danger' ? 'text-red-600' : ''}
                      `}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tasks List */}
          <TasksList
            view={view}
            statusFilter={statusFilter}
            sourceFilter={sourceFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default TasksDashboard