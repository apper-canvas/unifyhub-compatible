import mockData from '@/services/mockData/unifiedItems.json'

class UnifiedItemService {
  constructor() {
    this.items = [...mockData]
  }

  async getAll() {
    // Simulate API delay
    await this.delay(300)
    return [...this.items]
  }

  async getById(id) {
    await this.delay(200)
    const item = this.items.find(item => item.Id === id)
    if (!item) {
      throw new Error(`Unified item with id ${id} not found`)
    }
    return { ...item }
  }

  async create(newItem) {
    await this.delay(400)
    const maxId = Math.max(...this.items.map(item => item.Id), 0)
    const item = {
      ...newItem,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    }
    this.items.push(item)
    return { ...item }
  }

  async update(id, updates) {
    await this.delay(300)
    const index = this.items.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error(`Unified item with id ${id} not found`)
    }
    
    this.items[index] = { ...this.items[index], ...updates }
    return { ...this.items[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.items.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error(`Unified item with id ${id} not found`)
    }
    
    const deletedItem = { ...this.items[index] }
    this.items.splice(index, 1)
    return deletedItem
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const unifiedItemService = new UnifiedItemService()