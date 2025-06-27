import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header'
import RulesBuilder from '@/components/organisms/RulesBuilder'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const RulesEngine = () => {
  const handleCreateRule = () => {
    toast.info('Create rule modal would open here')
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Rules Engine"
        showSearch={false}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Rules Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Rules', value: '3', icon: 'Zap', color: 'primary' },
              { label: 'Triggered Today', value: '12', icon: 'Play', color: 'success' },
              { label: 'Total Actions', value: '47', icon: 'Activity', color: 'info' },
              { label: 'Success Rate', value: '98%', icon: 'TrendingUp', color: 'accent' }
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
                    ${stat.color === 'success' ? 'bg-green-100' : ''}
                    ${stat.color === 'info' ? 'bg-blue-100' : ''}
                    ${stat.color === 'accent' ? 'bg-accent-100' : ''}
                  `}>
                    <ApperIcon 
                      name={stat.icon} 
                      size={20} 
                      className={`
                        ${stat.color === 'primary' ? 'text-primary-600' : ''}
                        ${stat.color === 'success' ? 'text-green-600' : ''}
                        ${stat.color === 'info' ? 'text-blue-600' : ''}
                        ${stat.color === 'accent' ? 'text-accent-600' : ''}
                      `}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rules Builder */}
          <RulesBuilder onCreateRule={handleCreateRule} />
        </div>
      </div>
    </div>
  )
}

export default RulesEngine