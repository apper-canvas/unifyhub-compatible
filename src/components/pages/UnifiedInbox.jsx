import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header'
import UnifiedInboxList from '@/components/organisms/UnifiedInboxList'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

const UnifiedInbox = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])

  const typeFilters = [
    { value: 'all', label: 'All Items', count: 12 },
    { value: 'email', label: 'Emails', count: 7 },
    { value: 'message', label: 'Messages', count: 3 },
    { value: 'task', label: 'Tasks', count: 2 }
  ]

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems)
    setSelectedItems([])
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Unified Inbox"
        onSearch={setSearchQuery}
        showSearch={true}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {typeFilters.map(filter => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(filter.value)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200
                    ${selectedType === filter.value
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-white text-secondary-600 border border-secondary-200 hover:bg-secondary-50'
                    }
                  `}
                >
                  <span>{filter.label}</span>
                  <Badge variant={selectedType === filter.value ? 'primary' : 'default'} size="xs">
                    {filter.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-secondary-600">
                  {selectedItems.length} selected
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  icon="Link"
                  onClick={() => handleBulkAction('link')}
                >
                  Link to Project
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon="Archive"
                  onClick={() => handleBulkAction('archive')}
                >
                  Archive
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={() => setSelectedItems([])}
                />
              </div>
            )}
          </div>

          {/* Items List */}
          <UnifiedInboxList
            searchQuery={searchQuery}
            selectedType={selectedType}
            onItemSelect={handleItemSelect}
            selectedItems={selectedItems}
          />
        </div>
      </div>
    </div>
  )
}

export default UnifiedInbox