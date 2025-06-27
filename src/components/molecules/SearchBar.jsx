import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search across all services...", className = '' }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className="flex-1">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
        />
      </div>
      
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          icon="X"
          onClick={handleClear}
        />
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="md"
        icon="Search"
      >
        Search
      </Button>
    </motion.form>
  )
}

export default SearchBar