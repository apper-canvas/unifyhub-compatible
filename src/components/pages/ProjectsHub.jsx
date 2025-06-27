import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import ProjectCanvas from "@/components/organisms/ProjectCanvas";
import ApperIcon from "@/components/atoms/ApperIcon";
import { toast } from "react-toastify";
const ProjectsHub = () => {
  const handleCreateProject = () => {
    toast.info('Create project modal would open here')
  }

  const handleSelectProject = (projectId) => {
    toast.info(`Project ${projectId} selected - detail view would open`)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header 
        title="Projects Hub"
        showSearch={false}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Project Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Projects', value: '3', icon: 'FolderOpen', color: 'primary' },
              { label: 'Linked Items', value: '24', icon: 'Link', color: 'info' },
              { label: 'Completed', value: '5', icon: 'CheckCircle', color: 'success' },
              { label: 'Team Members', value: '8', icon: 'Users', color: 'accent' }
            ].map(stat => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.02, y: -2 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-secondary-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`
                    p-3 rounded-lg
                    ${stat.color === 'primary' ? 'bg-primary-100' : ''}
                    ${stat.color === 'info' ? 'bg-blue-100' : ''}
                    ${stat.color === 'success' ? 'bg-green-100' : ''}
                    ${stat.color === 'accent' ? 'bg-accent-100' : ''}
                  `}>
                    <ApperIcon 
                      name={stat.icon} 
                      size={20} 
                      className={`
                        ${stat.color === 'primary' ? 'text-primary-600' : ''}
                        ${stat.color === 'info' ? 'text-blue-600' : ''}
                        ${stat.color === 'success' ? 'text-green-600' : ''}
                        ${stat.color === 'accent' ? 'text-accent-600' : ''}
                      `}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Projects Canvas */}
          <ProjectCanvas
            onCreateProject={handleCreateProject}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectsHub