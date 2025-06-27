import mockData from '@/services/mockData/projects.json'

class ProjectService {
  constructor() {
    this.projects = [...mockData]
  }

  async getAll() {
    // Simulate API delay
    await this.delay(250)
    return [...this.projects]
  }

  async getById(id) {
    await this.delay(200)
    const project = this.projects.find(project => project.Id === id)
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }
    return { ...project }
  }

  async create(newProject) {
    await this.delay(400)
    const maxId = Math.max(...this.projects.map(project => project.Id), 0)
    const project = {
      ...newProject,
      Id: maxId + 1,
      created: new Date().toISOString(),
      linkedItems: newProject.linkedItems || []
    }
    this.projects.push(project)
    return { ...project }
  }

  async update(id, updates) {
    await this.delay(300)
    const index = this.projects.findIndex(project => project.Id === id)
    if (index === -1) {
      throw new Error(`Project with id ${id} not found`)
    }
    
    this.projects[index] = { ...this.projects[index], ...updates }
    return { ...this.projects[index] }
  }

  async delete(id) {
    await this.delay(250)
    const index = this.projects.findIndex(project => project.Id === id)
    if (index === -1) {
      throw new Error(`Project with id ${id} not found`)
    }
    
    const deletedProject = { ...this.projects[index] }
    this.projects.splice(index, 1)
    return deletedProject
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const projectService = new ProjectService()