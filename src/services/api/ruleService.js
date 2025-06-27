class RuleService {
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
          { field: { Name: "conditions" } },
          { field: { Name: "actions" } },
          { field: { Name: "enabled" } }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('rule', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching rules:', error)
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
          { field: { Name: "conditions" } },
          { field: { Name: "actions" } },
          { field: { Name: "enabled" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('rule', id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching rule with ID ${id}:`, error)
      throw error
    }
  }

  async create(newRule) {
    try {
      // Filter to only include updateable fields
      const params = {
        records: [{
          Name: newRule.Name || newRule.name,
          Tags: newRule.Tags,
          Owner: newRule.Owner,
          conditions: typeof newRule.conditions === 'string' ? newRule.conditions : JSON.stringify(newRule.conditions || []),
          actions: typeof newRule.actions === 'string' ? newRule.actions : JSON.stringify(newRule.actions || []),
          enabled: newRule.enabled !== undefined ? newRule.enabled : true
        }]
      }
      
      const response = await this.apperClient.createRecord('rule', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to create rule')
      }
    } catch (error) {
      console.error('Error creating rule:', error)
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
          ...(updates.conditions !== undefined && { 
            conditions: typeof updates.conditions === 'string' ? updates.conditions : JSON.stringify(updates.conditions)
          }),
          ...(updates.actions !== undefined && { 
            actions: typeof updates.actions === 'string' ? updates.actions : JSON.stringify(updates.actions)
          }),
          ...(updates.enabled !== undefined && { enabled: updates.enabled })
        }]
      }
      
      const response = await this.apperClient.updateRecord('rule', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to update rule')
      }
    } catch (error) {
      console.error('Error updating rule:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord('rule', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting rule:', error)
      throw error
    }
  }
}

export const ruleService = new RuleService()