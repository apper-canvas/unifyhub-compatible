import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const RuleCard = ({ rule, onToggle, onEdit, onDelete, onTest }) => {
  const formatCondition = (condition) => {
    return `${condition.field} ${condition.operator} "${condition.value}"`
  }

  const formatAction = (action) => {
    return `${action.type}: ${action.target || action.message}`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      className={`
        card p-6 transition-all duration-200
        ${rule.enabled ? 'bg-white' : 'bg-secondary-50'}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle?.(rule.Id)}
            className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
              ${rule.enabled 
                ? 'bg-primary-500 border-primary-500' 
                : 'border-secondary-300 hover:border-primary-400'
              }
            `}
          >
            {rule.enabled && (
              <ApperIcon name="Check" size={12} className="text-white" />
            )}
          </motion.button>
          
          <div>
            <h3 className="font-semibold text-secondary-900">
              {rule.name}
            </h3>
            <Badge 
              variant={rule.enabled ? 'success' : 'default'} 
              size="xs"
              className="mt-1"
            >
              {rule.enabled ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            icon="Play"
            onClick={() => onTest?.(rule.Id)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Edit"
            onClick={() => onEdit?.(rule.Id)}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={() => onDelete?.(rule.Id)}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">
Conditions (IF):
          </h4>
          <div className="space-y-1">
            {(() => {
              try {
                const conditions = Array.isArray(rule.conditions) 
                  ? rule.conditions 
                  : typeof rule.conditions === 'string' 
                    ? JSON.parse(rule.conditions) 
                    : [];
                return conditions.map((condition, index) => (
                  <div key={index} className="text-sm text-secondary-600 bg-secondary-50 px-3 py-2 rounded">
                    {formatCondition(condition)}
                  </div>
                ));
              } catch (error) {
                return [];
              }
            })()}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">
Actions (THEN):
          </h4>
          <div className="space-y-1">
            {(() => {
              try {
                const actions = Array.isArray(rule.actions) 
                  ? rule.actions 
                  : typeof rule.actions === 'string' 
                    ? JSON.parse(rule.actions) 
                    : [];
                return actions.map((action, index) => (
                  <div key={index} className="text-sm text-secondary-600 bg-primary-50 px-3 py-2 rounded">
                    {formatAction(action)}
                  </div>
                ));
              } catch (error) {
                return [];
              }
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RuleCard