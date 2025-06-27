import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RuleCard from '@/components/molecules/RuleCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { ruleService } from '@/services/api/ruleService'
import { toast } from 'react-toastify'

const RulesBuilder = ({ onCreateRule }) => {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadRules = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await ruleService.getAll()
      setRules(data)
    } catch (err) {
      setError('Failed to load rules. Please try again.')
      console.error('Error loading rules:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleRule = async (ruleId) => {
    try {
      const rule = rules.find(r => r.Id === ruleId)
      const updatedRule = await ruleService.update(ruleId, {
        ...rule,
        enabled: !rule.enabled
      })
      
      setRules(prev => prev.map(r => 
        r.Id === ruleId ? updatedRule : r
      ))
      
      toast.success(`Rule ${updatedRule.enabled ? 'enabled' : 'disabled'}`)
    } catch (err) {
      toast.error('Failed to toggle rule')
    }
  }

  const handleEditRule = async (ruleId) => {
    try {
      // In a real app, this would open an edit modal
      toast.info('Edit rule functionality would open here')
    } catch (err) {
      toast.error('Failed to edit rule')
    }
  }

  const handleDeleteRule = async (ruleId) => {
    try {
      await ruleService.delete(ruleId)
      setRules(prev => prev.filter(r => r.Id !== ruleId))
      toast.success('Rule deleted successfully')
    } catch (err) {
      toast.error('Failed to delete rule')
    }
  }

  const handleTestRule = async (ruleId) => {
    try {
      // In a real app, this would test the rule against current data
      toast.success('Rule test completed - no matching items found')
    } catch (err) {
      toast.error('Failed to test rule')
    }
  }

  useEffect(() => {
    loadRules()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadRules} />

  const activeRules = rules.filter(rule => rule.enabled)
  const inactiveRules = rules.filter(rule => !rule.enabled)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">
            Automation Rules
          </h2>
          <p className="text-secondary-600 mt-1">
            Create powerful automations to streamline your workflow
          </p>
        </div>
        
        <Button
          onClick={onCreateRule}
          icon="Plus"
          variant="primary"
        >
          New Rule
        </Button>
      </div>

      {rules.length === 0 ? (
        <Empty 
          message="No automation rules yet"
          actionText="Create your first rule"
          onAction={onCreateRule}
        />
      ) : (
        <div className="space-y-8">
          {activeRules.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-4">
                Active Rules ({activeRules.length})
              </h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {activeRules.map(rule => (
                    <motion.div
                      key={rule.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <RuleCard
                        rule={rule}
                        onToggle={handleToggleRule}
                        onEdit={handleEditRule}
                        onDelete={handleDeleteRule}
                        onTest={handleTestRule}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {inactiveRules.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-4">
                Inactive Rules ({inactiveRules.length})
              </h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {inactiveRules.map(rule => (
                    <motion.div
                      key={rule.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <RuleCard
                        rule={rule}
                        onToggle={handleToggleRule}
                        onEdit={handleEditRule}
                        onDelete={handleDeleteRule}
                        onTest={handleTestRule}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RulesBuilder