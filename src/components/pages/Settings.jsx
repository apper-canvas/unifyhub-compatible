import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header'
import ServiceConnectionCard from '@/components/molecules/ServiceConnectionCard'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { connectedServiceService } from '@/services/api/connectedServiceService'
import { toast } from 'react-toastify'

const Settings = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [preferences, setPreferences] = useState({
    notifications: true,
    autoSync: true,
    syncInterval: 5,
    theme: 'light'
  })

  const loadServices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await connectedServiceService.getAll()
      setServices(data)
    } catch (err) {
      setError('Failed to load services. Please try again.')
      console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (serviceId) => {
    try {
      const service = services.find(s => s.Id === serviceId)
      const updatedService = await connectedServiceService.update(serviceId, {
        ...service,
        status: 'connected',
        lastSync: new Date().toISOString()
      })
      
      setServices(prev => prev.map(s => 
        s.Id === serviceId ? updatedService : s
      ))
      
      toast.success(`${updatedService.name} connected successfully`)
    } catch (err) {
      toast.error('Failed to connect service')
    }
  }

  const handleDisconnect = async (serviceId) => {
    try {
      const service = services.find(s => s.Id === serviceId)
      const updatedService = await connectedServiceService.update(serviceId, {
        ...service,
        status: 'offline',
        lastSync: null
      })
      
      setServices(prev => prev.map(s => 
        s.Id === serviceId ? updatedService : s
      ))
      
      toast.success(`${updatedService.name} disconnected`)
    } catch (err) {
      toast.error('Failed to disconnect service')
    }
  }

  const handleRefresh = async (serviceId) => {
    try {
      const service = services.find(s => s.Id === serviceId)
      
      // Show syncing status
      setServices(prev => prev.map(s => 
        s.Id === serviceId ? { ...s, status: 'syncing' } : s
      ))
      
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedService = await connectedServiceService.update(serviceId, {
        ...service,
        status: 'connected',
        lastSync: new Date().toISOString()
      })
      
      setServices(prev => prev.map(s => 
        s.Id === serviceId ? updatedService : s
      ))
      
      toast.success(`${updatedService.name} synced successfully`)
    } catch (err) {
      toast.error('Failed to sync service')
      
      // Revert to connected status on error
      setServices(prev => prev.map(s => 
        s.Id === serviceId ? { ...s, status: 'connected' } : s
      ))
    }
  }

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully')
  }

  useEffect(() => {
    loadServices()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadServices} />

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Settings"
        showSearch={false}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Service Connections */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Service Connections
              </h2>
              <p className="text-secondary-600 mt-1">
                Manage your connected services and sync settings
              </p>
            </div>
            
            <div className="space-y-4">
              {services.map(service => (
                <ServiceConnectionCard
                  key={service.Id}
                  service={service}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          </section>

          {/* Preferences */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Preferences
              </h2>
              <p className="text-secondary-600 mt-1">
                Customize your UnifyHub experience
              </p>
            </div>
            
            <div className="card p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notifications */}
                <div className="space-y-4">
                  <h3 className="font-medium text-secondary-900">Notifications</h3>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        notifications: e.target.checked
                      }))}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">
                      Enable desktop notifications
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.autoSync}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        autoSync: e.target.checked
                      }))}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">
                      Auto-sync services
                    </span>
                  </label>
                </div>

                {/* Sync Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium text-secondary-900">Sync Settings</h3>
                  
                  <Input
                    label="Sync interval (minutes)"
                    type="number"
                    value={preferences.syncInterval}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      syncInterval: parseInt(e.target.value)
                    }))}
                    min="1"
                    max="60"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Theme
                    </label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        theme: e.target.value
                      }))}
                      className="input-field"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">System</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-secondary-200">
                <Button
                  onClick={handleSavePreferences}
                  variant="primary"
                  icon="Save"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </section>

          {/* Account Info */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                System Information
              </h2>
              <p className="text-secondary-600 mt-1">
                Application details and diagnostics
              </p>
            </div>
            
            <div className="card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Application</h4>
                  <div className="space-y-2 text-sm text-secondary-600">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>Today</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connected Services:</span>
                      <span>{services.filter(s => s.status === 'connected').length}/{services.length}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Support</h4>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" icon="HelpCircle">
                      Help Center
                    </Button>
                    <Button variant="secondary" size="sm" icon="MessageSquare">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings