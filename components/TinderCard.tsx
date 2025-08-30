'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { Check, X, Heart, Star, MapPin, DollarSign, Clock } from 'lucide-react'
import { Job, Talent, Business } from '@/types'

interface TinderCardProps {
  item: Job | Talent | Business
  type: 'job' | 'talent' | 'business'
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSuperLike?: () => void
}

export default function TinderCard({ 
  item, 
  type, 
  onSwipeLeft, 
  onSwipeRight, 
  onSuperLike 
}: TinderCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])
  
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        onSwipeRight()
      } else {
        onSwipeLeft()
      }
    } else {
      // Snap back to center
      x.set(0)
      y.set(0)
    }
  }

  const handleSwipeLeft = () => {
    x.set(-200)
    setTimeout(() => onSwipeLeft(), 300)
  }

  const handleSwipeRight = () => {
    x.set(200)
    setTimeout(() => onSwipeRight(), 300)
  }

  const renderJobCard = (job: Job) => (
    <div className="relative h-full">
      {/* Header Image */}
      <div className="h-64 bg-gradient-to-br from-accent-turquoise to-secondary-purple rounded-t-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
          <p className="text-lg opacity-90">Contract Position</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Basic Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {job.contractDuration}
          </div>
          <div className="flex items-center text-accent-turquoise font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center text-neutral-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {job.location}
        </div>

        {/* Description */}
        <div>
          <h3 className="font-medium text-white mb-2">Job Description</h3>
          <p className="text-neutral-gray-400 text-sm leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="font-medium text-white mb-2">Requirements</h3>
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 6).map((req, index) => (
              <span key={index} className="tag text-xs">
                {req}
              </span>
            ))}
          </div>
        </div>

        {/* Skillset */}
        <div>
          <h3 className="font-medium text-white mb-2">Skillset</h3>
          <div className="flex flex-wrap gap-2">
            {job.skillset.slice(0, 8).map((skill, index) => (
              <span key={index} className="tag text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Work Culture */}
        <div>
          <h3 className="font-medium text-white mb-2">Work Culture</h3>
          <div className="flex flex-wrap gap-2">
            {job.workCulture.map((culture, index) => (
              <span key={index} className="personality-tag text-xs">
                {culture.charAt(0).toUpperCase() + culture.slice(1).replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTalentCard = (talent: Talent) => (
    <div className="relative h-full">
      {/* Header Image */}
      <div className="h-64 bg-gradient-to-br from-secondary-purple to-accent-turquoise rounded-t-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">{talent.name}</h2>
          <p className="text-lg opacity-90">{talent.experience} years experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Basic Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-gray-600">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            {talent.rating} ({talent.completedJobs} jobs)
          </div>
          {talent.hourlyRate && (
            <div className="flex items-center text-accent-turquoise font-medium">
              <DollarSign className="w-4 h-4 mr-2" />
              ${talent.hourlyRate}/hr
            </div>
          )}
        </div>

        <div className="flex items-center text-neutral-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {talent.location}
        </div>

        {/* Bio */}
        <div>
          <h3 className="font-medium text-white mb-2">About</h3>
          <p className="text-neutral-gray-400 text-sm leading-relaxed">
            {talent.bio}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-medium text-white mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {talent.skills.slice(0, 8).map((skill, index) => (
              <span key={index} className="tag text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Personality */}
        <div>
          <h3 className="font-medium text-white mb-2">Personality</h3>
          <div className="flex flex-wrap gap-2">
            {talent.personality.slice(0, 6).map((trait, index) => (
              <span key={index} className="personality-tag text-xs">
                {trait.charAt(0).toUpperCase() + trait.slice(1).replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Work Culture Preference */}
        <div>
          <h3 className="font-medium text-white mb-2">Preferred Work Culture</h3>
          <div className="flex flex-wrap gap-2">
            {talent.workCulturePreference.slice(0, 6).map((culture, index) => (
              <span key={index} className="personality-tag text-xs">
                {culture.charAt(0).toUpperCase() + culture.slice(1).replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderBusinessCard = (business: Business) => (
    <div className="relative h-full">
      {/* Header Image */}
      <div className="h-64 bg-gradient-to-br from-accent-turquoise to-secondary-purple rounded-t-2xl flex items-center justify-center">
        {business.images.length > 0 ? (
          <img 
            src={business.images[0]} 
            alt={business.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        ) : (
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
            <p className="text-lg opacity-90">{business.industry}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Basic Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-neutral-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {business.location}
          </div>
          <div className="text-accent-turquoise font-medium">
            {business.size.charAt(0).toUpperCase() + business.size.slice(1)}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-medium text-white mb-2">About</h3>
          <p className="text-neutral-gray-400 text-sm leading-relaxed">
            {business.description}
          </p>
        </div>

        {/* Industry & Founded */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-gray-600">{business.industry}</span>
          {business.founded && (
            <span className="text-neutral-gray-600">Founded {business.founded}</span>
          )}
        </div>

        {/* Work Culture */}
        <div>
          <h3 className="font-medium text-white mb-2">Work Culture</h3>
          <div className="flex flex-wrap gap-2">
            {business.workCulture.map((culture, index) => (
              <span key={index} className="tag text-xs">
                {culture.charAt(0).toUpperCase() + culture.slice(1).replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, opacity, scale }}
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-full h-full bg-primary-dark-gray rounded-2xl shadow-2xl overflow-hidden">
        {type === 'job' && renderJobCard(item as Job)}
        {type === 'talent' && renderTalentCard(item as Talent)}
        {type === 'business' && renderBusinessCard(item as Business)}
      </div>

      {/* Swipe Indicators */}
      {isDragging && (
        <>
          <motion.div
            className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20"
            style={{ opacity: useTransform(x, [-200, -50], [1, 0]) }}
          >
            <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
              <X className="w-8 h-8" />
            </div>
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20"
            style={{ opacity: useTransform(x, [50, 200], [0, 1]) }}
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
              <Check className="w-8 h-8" />
            </div>
          </motion.div>
        </>
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        <motion.button
          onClick={handleSwipeLeft}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 border-2 border-red-200 hover:border-red-300 hover:scale-110 active:scale-95"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-7 h-7 text-red-600" />
        </motion.button>
        
        {onSuperLike && (
          <motion.button
            onClick={onSuperLike}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 border-2 border-secondary-purple hover:border-secondary-purple-dark hover:scale-110 active:scale-95"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-6 h-6 text-secondary-purple" />
          </motion.button>
        )}
        
        <motion.button
          onClick={handleSwipeRight}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:scale-110 active:scale-95"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Check className="w-7 h-7 text-green-600" />
        </motion.button>
      </div>
    </motion.div>
  )
}
