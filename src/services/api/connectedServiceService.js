class ConnectedServiceService {
  constructor() {
    this.apperClient = null
    this.initializeClient()
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "last_sync" } }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('connected_service', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching connected services:', error)
      throw error
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "last_sync" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('connected_service', id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching connected service with ID ${id}:`, error)
      throw error
    }
  }

  async create(newService) {
    try {
      // Filter to only include updateable fields
      const params = {
        records: [{
          Name: newService.Name || newService.name,
          Tags: newService.Tags,
          Owner: newService.Owner,
          type: newService.type,
          status: newService.status || 'offline',
          last_sync: newService.last_sync || newService.lastSync
        }]
      }
      
      const response = await this.apperClient.createRecord('connected_service', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to create connected service')
      }
    } catch (error) {
      console.error('Error creating connected service:', error)
      throw error
    }
  }

  async update(id, updates) {
    try {
      // Filter to only include updateable fields
      const params = {
        records: [{
          Id: id,
          ...(updates.Name !== undefined && { Name: updates.Name }),
          ...(updates.Tags !== undefined && { Tags: updates.Tags }),
          ...(updates.Owner !== undefined && { Owner: updates.Owner }),
          ...(updates.type !== undefined && { type: updates.type }),
          ...(updates.status !== undefined && { status: updates.status }),
          ...(updates.last_sync !== undefined && { last_sync: updates.last_sync }),
          ...(updates.lastSync !== undefined && { last_sync: updates.lastSync })
        }]
      }
      
      const response = await this.apperClient.updateRecord('connected_service', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to update connected service')
      }
    } catch (error) {
      console.error('Error updating connected service:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord('connected_service', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting connected service:', error)
      throw error
    }
  }
}

export const connectedServiceService = new ConnectedServiceService()