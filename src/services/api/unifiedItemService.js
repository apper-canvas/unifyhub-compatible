class UnifiedItemService {
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
          { field: { Name: "source" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "project_id" } }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('unified_item', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching unified items:', error)
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
          { field: { Name: "source" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "project_id" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('unified_item', id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching unified item with ID ${id}:`, error)
      throw error
    }
  }

  async create(newItem) {
    try {
      // Filter to only include updateable fields
      const params = {
        records: [{
          Name: newItem.Name || newItem.name,
          Tags: newItem.Tags,
          Owner: newItem.Owner,
          type: newItem.type,
          source: newItem.source,
          title: newItem.title,
          content: newItem.content,
          timestamp: newItem.timestamp || new Date().toISOString(),
          project_id: newItem.project_id || newItem.projectId
        }]
      }
      
      const response = await this.apperClient.createRecord('unified_item', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to create unified item')
      }
    } catch (error) {
      console.error('Error creating unified item:', error)
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
          ...(updates.source !== undefined && { source: updates.source }),
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.content !== undefined && { content: updates.content }),
          ...(updates.timestamp !== undefined && { timestamp: updates.timestamp }),
          ...(updates.project_id !== undefined && { project_id: updates.project_id })
        }]
      }
      
      const response = await this.apperClient.updateRecord('unified_item', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to update unified item')
      }
    } catch (error) {
      console.error('Error updating unified item:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord('unified_item', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting unified item:', error)
      throw error
    }
  }
}

export const unifiedItemService = new UnifiedItemService()