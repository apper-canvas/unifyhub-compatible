import mockData from '@/services/mockData/connectedServices.json'

class ConnectedServiceService {
  constructor() {
    this.services = [...mockData]
  }

  async getAll() {
    // Simulate API delay
    await this.delay(200)
    return [...this.services]
  }

  async getById(id) {
    await this.delay(150)
    const service = this.services.find(service => service.Id === id)
    if (!service) {
      throw new Error(`Connected service with id ${id} not found`)
    }
    return { ...service }
  }

  async create(newService) {
    await this.delay(350)
    const maxId = Math.max(...this.services.map(service => service.Id), 0)
    const service = {
      ...newService,
      Id: maxId + 1,
      status: newService.status || 'offline',
      lastSync: null
    }
    this.services.push(service)
    return { ...service }
  }

  async update(id, updates) {
    await this.delay(250)
    const index = this.services.findIndex(service => service.Id === id)
    if (index === -1) {
      throw new Error(`Connected service with id ${id} not found`)
    }
    
    this.services[index] = { ...this.services[index], ...updates }
    return { ...this.services[index] }
  }

  async delete(id) {
    await this.delay(200)
    const index = this.services.findIndex(service => service.Id === id)
    if (index === -1) {
      throw new Error(`Connected service with id ${id} not found`)
    }
    
    const deletedService = { ...this.services[index] }
    this.services.splice(index, 1)
    return deletedService
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const connectedServiceService = new ConnectedServiceService()