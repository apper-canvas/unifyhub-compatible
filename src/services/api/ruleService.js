import mockData from '@/services/mockData/rules.json'

class RuleService {
  constructor() {
    this.rules = [...mockData]
  }

  async getAll() {
    // Simulate API delay
    await this.delay(200)
    return [...this.rules]
  }

  async getById(id) {
    await this.delay(150)
    const rule = this.rules.find(rule => rule.Id === id)
    if (!rule) {
      throw new Error(`Rule with id ${id} not found`)
    }
    return { ...rule }
  }

  async create(newRule) {
    await this.delay(350)
    const maxId = Math.max(...this.rules.map(rule => rule.Id), 0)
    const rule = {
      ...newRule,
      Id: maxId + 1,
      conditions: newRule.conditions || [],
      actions: newRule.actions || [],
      enabled: newRule.enabled !== undefined ? newRule.enabled : true
    }
    this.rules.push(rule)
    return { ...rule }
  }

  async update(id, updates) {
    await this.delay(250)
    const index = this.rules.findIndex(rule => rule.Id === id)
    if (index === -1) {
      throw new Error(`Rule with id ${id} not found`)
    }
    
    this.rules[index] = { ...this.rules[index], ...updates }
    return { ...this.rules[index] }
  }

  async delete(id) {
    await this.delay(200)
    const index = this.rules.findIndex(rule => rule.Id === id)
    if (index === -1) {
      throw new Error(`Rule with id ${id} not found`)
    }
    
    const deletedRule = { ...this.rules[index] }
    this.rules.splice(index, 1)
    return deletedRule
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const ruleService = new RuleService()