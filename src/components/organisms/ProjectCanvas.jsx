import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/molecules/ProjectCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { projectService } from '@/services/api/projectService'
import { toast } from 'react-toastify'

const ProjectCanvas = ({ onCreateProject, onSelectProject }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await projectService.getAll()
      setProjects(data)
    } catch (err) {
      setError('Failed to load projects. Please try again.')
      console.error('Error loading projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProject = async (projectId) => {
    try {
      // In a real app, this would open an edit modal
      toast.info('Edit project functionality would open here')
    } catch (err) {
      toast.error('Failed to edit project')
    }
  }

  const handleDeleteProject = async (projectId) => {
    try {
      await projectService.delete(projectId)
      setProjects(prev => prev.filter(p => p.Id !== projectId))
      toast.success('Project deleted successfully')
    } catch (err) {
      toast.error('Failed to delete project')
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProjects} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900">
            Your Projects
          </h2>
          <p className="text-secondary-600 mt-1">
            Organize and link your communications, tasks, and events
          </p>
        </div>
        
        <Button
          onClick={onCreateProject}
          icon="Plus"
          variant="primary"
        >
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Empty 
          message="No projects yet"
          actionText="Create your first project"
          onAction={onCreateProject}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map(project => (
              <motion.div
                key={project.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default ProjectCanvas