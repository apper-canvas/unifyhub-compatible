class ProjectService {
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
          { field: { Name: "description" } },
          { field: { Name: "linked_items" } },
          { field: { Name: "color" } },
          { field: { Name: "created" } }
        ]
      }
      
      const response = await this.apperClient.fetchRecords('project', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching projects:', error)
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
          { field: { Name: "description" } },
          { field: { Name: "linked_items" } },
          { field: { Name: "color" } },
          { field: { Name: "created" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById('project', id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error)
      throw error
    }
  }

  async create(newProject) {
    try {
      // Filter to only include updateable fields
      const params = {
        records: [{
          Name: newProject.Name || newProject.name,
          Tags: newProject.Tags,
          Owner: newProject.Owner,
          description: newProject.description,
          linked_items: typeof newProject.linked_items === 'string' ? newProject.linked_items : JSON.stringify(newProject.linked_items || newProject.linkedItems || []),
          color: newProject.color,
          created: newProject.created || new Date().toISOString()
        }]
      }
      
      const response = await this.apperClient.createRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
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
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.linked_items !== undefined && { 
            linked_items: typeof updates.linked_items === 'string' ? updates.linked_items : JSON.stringify(updates.linked_items)
          }),
          ...(updates.color !== undefined && { color: updates.color }),
          ...(updates.created !== undefined && { created: updates.created })
        }]
      }
      
      const response = await this.apperClient.updateRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results && response.results.length > 0 && response.results[0].success) {
        return response.results[0].data
      } else {
        throw new Error('Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      }
      
      const response = await this.apperClient.deleteRecord('project', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}

export const projectService = new ProjectService()