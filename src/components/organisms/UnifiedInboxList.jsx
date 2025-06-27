import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UnifiedItemCard from '@/components/molecules/UnifiedItemCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { unifiedItemService } from '@/services/api/unifiedItemService'
import { toast } from 'react-toastify'

const UnifiedInboxList = ({ searchQuery, selectedType, onItemSelect, selectedItems = [] }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await unifiedItemService.getAll()
      
      let filteredItems = data
      
      if (searchQuery) {
        filteredItems = filteredItems.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.source.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      if (selectedType && selectedType !== 'all') {
        filteredItems = filteredItems.filter(item => item.type === selectedType)
      }
      
      // Sort by timestamp descending
      filteredItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      setItems(filteredItems)
    } catch (err) {
      setError('Failed to load items. Please try again.')
      console.error('Error loading items:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLinkToProject = async (itemId) => {
    try {
      // In a real app, this would open a modal to select/create project
      toast.success('Item linked to project successfully')
    } catch (err) {
      toast.error('Failed to link item to project')
    }
  }

  useEffect(() => {
    loadItems()
  }, [searchQuery, selectedType])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadItems} />
  if (items.length === 0) return <Empty message="No items found" />

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <UnifiedItemCard
              item={item}
              onSelect={onItemSelect}
              onLink={handleLinkToProject}
              isSelected={selectedItems.includes(item.Id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default UnifiedInboxList