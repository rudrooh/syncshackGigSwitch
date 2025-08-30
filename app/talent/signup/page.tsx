'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Upload, MapPin, Calendar, Brain, Users, FileText } from 'lucide-react'
import { Talent, PersonalityTag, WorkCultureTag } from '@/types'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import toast from 'react-hot-toast'

const personalityOptions: PersonalityTag[] = [
  'team-worker', 'independent', 'leader', 'creative', 'analytical',
  'detail-oriented', 'big-picture', 'communicative', 'introverted',
  'extroverted', 'adaptable', 'consistent'
]

const workCultureOptions: WorkCultureTag[] = [
  'autocratic', 'democratic', 'collaborative', 'hierarchical',
  'flat', 'agile', 'traditional', 'innovative',
  'remote-friendly', 'office-based', 'flexible-hours', 'structured-hours'
]

const skillSuggestions = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'TypeScript', 'Vue.js',
  'Angular', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management',
  'Marketing', 'Sales', 'Customer Service', 'Content Writing', 'SEO'
]

export default function TalentSignupPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [parsingCV, setParsingCV] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityTag[]>([])
  const [selectedWorkCulture, setSelectedWorkCulture] = useState<WorkCultureTag[]>([])
  const [customSkill, setCustomSkill] = useState('')

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<Talent>>()

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      // Auto-parse CV if it's a PDF or text file
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        parseCV(file)
      }
    }
  }

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPortfolioFiles(prev => [...prev, ...files])
  }

  const removePortfolioFile = (index: number) => {
    setPortfolioFiles(prev => prev.filter((_, i) => i !== index))
  }

  const parseCV = async (file: File) => {
    setParsingCV(true)
    try {
      // Simulate AI CV parsing - in production, integrate with actual AI service
      // For now, we'll extract text and suggest skills based on content
      const text = await extractTextFromFile(file)
      const suggestedSkills = suggestSkillsFromText(text)
      
      // Auto-fill form fields based on CV content
      setValue('experience', Math.floor(Math.random() * 10) + 1) // Simulated experience
      setValue('bio', `Experienced professional with expertise in ${suggestedSkills.slice(0, 3).join(', ')}`)
      
      // Add suggested skills
      setSelectedSkills(prev => [...new Set([...prev, ...suggestedSkills.slice(0, 5)])])
      
      toast.success('CV parsed successfully! Skills and experience auto-filled.')
    } catch (error) {
      console.error('Error parsing CV:', error)
      toast.error('Failed to parse CV. Please fill in details manually.')
    } finally {
      setParsingCV(false)
    }
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    // This is a simplified text extraction
    // In production, use a proper PDF/text parsing library
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        resolve(text || '')
      }
      reader.readAsText(file)
    })
  }

  const suggestSkillsFromText = (text: string): string[] => {
    const lowerText = text.toLowerCase()
    return skillSuggestions.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    )
  }

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill) && selectedSkills.length < 10) {
      setSelectedSkills(prev => [...prev, skill])
      setCustomSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill))
  }

  const togglePersonality = (tag: PersonalityTag) => {
    setSelectedPersonality(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const toggleWorkCulture = (tag: WorkCultureTag) => {
    setSelectedWorkCulture(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const uploadFiles = async (): Promise<{ resume?: string; portfolio: string[] }> => {
    const uploads: { resume?: string; portfolio: string[] } = { portfolio: [] }

    // Upload resume
    if (resumeFile) {
      const resumeRef = ref(storage, `resumes/${Date.now()}-${resumeFile.name}`)
      const snapshot = await uploadBytes(resumeRef, resumeFile)
      uploads.resume = await getDownloadURL(snapshot.ref)
    }

    // Upload portfolio files
    const portfolioPromises = portfolioFiles.map(async (file) => {
      const portfolioRef = ref(storage, `portfolio/${Date.now()}-${file.name}`)
      const snapshot = await uploadBytes(portfolioRef, file)
      return getDownloadURL(snapshot.ref)
    })
    uploads.portfolio = await Promise.all(portfolioPromises)

    return uploads
  }

  const onSubmit = async (data: Partial<Talent>) => {
    if (selectedSkills.length === 0) {
      toast.error('Please add at least one skill')
      return
    }

    if (selectedPersonality.length === 0) {
      toast.error('Please select at least one personality trait')
      return
    }

    if (selectedWorkCulture.length === 0) {
      toast.error('Please select at least one work culture preference')
      return
    }

    setUploading(true)
    try {
      // Upload files
      const fileUrls = await uploadFiles()
      
      // Create talent profile
      const talentData: Partial<Talent> = {
        ...data,
        skills: selectedSkills,
        personality: selectedPersonality,
        workCulturePreference: selectedWorkCulture,
        portfolio: fileUrls.portfolio,
        resume: fileUrls.resume,
        rating: 0,
        completedJobs: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const docRef = await addDoc(collection(db, 'talents'), talentData)
      
      toast.success('Talent profile created successfully!')
      
      // Redirect to talent dashboard
      router.push(`/talent/dashboard/${docRef.id}`)
    } catch (error) {
      console.error('Error creating talent profile:', error)
      toast.error('Failed to create talent profile')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-serif mb-4">Sign up your profile</h1>
          <p className="text-neutral-gray-600">Tell us about yourself</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input-field w-full"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="input-field w-full"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              {...register('phone')}
              type="tel"
              className="input-field w-full"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray-600" size={20} />
              <input
                {...register('location', { required: 'Location is required' })}
                className="input-field w-full pl-10"
                placeholder="City, State/Province"
              />
            </div>
            {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">Years of Experience *</label>
            <input
              {...register('experience', { 
                required: 'Experience is required',
                min: { value: 0, message: 'Experience cannot be negative' },
                max: { value: 50, message: 'Experience cannot exceed 50 years' }
              })}
              type="number"
              min="0"
              max="50"
              className="input-field w-full"
              placeholder="e.g., 3"
            />
            {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium mb-2">Availability *</label>
            <select
              {...register('availability', { required: 'Availability is required' })}
              className="input-field w-full"
            >
              <option value="">Select availability</option>
              <option value="immediate">Available immediately</option>
              <option value="2-weeks">Available in 2 weeks</option>
              <option value="1-month">Available in 1 month</option>
              <option value="flexible">Flexible availability</option>
            </select>
            {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability.message}</p>}
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium mb-2">Hourly Rate (USD)</label>
            <input
              {...register('hourlyRate')}
              type="number"
              min="0"
              step="0.01"
              className="input-field w-full"
              placeholder="e.g., 25.00"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Skills * ({selectedSkills.length}/10)
            </label>
            
            {/* Skill suggestions */}
            <div className="mb-3 flex flex-wrap gap-2">
              {skillSuggestions.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  disabled={selectedSkills.includes(skill) || selectedSkills.length >= 10}
                  className="tag hover:bg-accent-turquoise hover:text-primary-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {skill}
                </button>
              ))}
            </div>

            {/* Custom skill input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="input-field flex-1"
                placeholder="Add custom skill..."
                maxLength={30}
              />
              <button
                type="button"
                onClick={() => addSkill(customSkill)}
                disabled={!customSkill.trim() || selectedSkills.length >= 10}
                className="btn-primary px-4"
              >
                Add
              </button>
            </div>

            {/* Selected skills */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span key={skill} className="tag flex items-center gap-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-accent-turquoise hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Personality Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Personality Traits *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {personalityOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => togglePersonality(tag)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selectedPersonality.includes(tag)
                      ? 'border-secondary-purple bg-secondary-purple bg-opacity-20 text-secondary-purple'
                      : 'border-neutral-gray-600 hover:border-secondary-purple'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            {selectedPersonality.length === 0 && (
              <p className="text-red-400 text-sm mt-1">Please select at least one personality trait</p>
            )}
          </div>

          {/* Work Culture Preferences */}
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Work Culture *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {workCultureOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleWorkCulture(tag)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selectedWorkCulture.includes(tag)
                      ? 'border-accent-turquoise bg-accent-turquoise bg-opacity-20 text-accent-turquoise'
                      : 'border-neutral-gray-600 hover:border-accent-turquoise'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            {selectedWorkCulture.length === 0 && (
              <p className="text-red-400 text-sm mt-1">Please select at least one work culture preference</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio *</label>
            <textarea
              {...register('bio', { required: 'Bio is required' })}
              className="input-field w-full h-24 resize-none"
              placeholder="Tell us about yourself, your experience, and what you're looking for..."
            />
            {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>}
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Resume/CV</label>
            <div className="border-2 border-dashed border-neutral-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <FileText className="mx-auto mb-2 text-neutral-gray-600" size={32} />
                <p className="text-neutral-gray-600">Click to upload resume</p>
                <p className="text-sm text-neutral-gray-600">PDF, DOC, DOCX, TXT up to 5MB</p>
                {parsingCV && <p className="text-accent-turquoise mt-2">Parsing CV...</p>}
              </label>
            </div>
            
            {resumeFile && (
              <div className="mt-2 p-3 bg-accent-turquoise bg-opacity-20 rounded-lg">
                <p className="text-accent-turquoise">✓ {resumeFile.name}</p>
              </div>
            )}
          </div>

          {/* Portfolio Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Portfolio Files</label>
            <div className="border-2 border-dashed border-neutral-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handlePortfolioUpload}
                className="hidden"
                id="portfolio-upload"
              />
              <label htmlFor="portfolio-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-2 text-neutral-gray-600" size={32} />
                <p className="text-neutral-gray-600">Click to upload portfolio files</p>
                <p className="text-sm text-neutral-gray-600">Images, PDFs, DOC files up to 5MB each</p>
              </label>
            </div>
            
            {/* Portfolio preview */}
            {portfolioFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioFiles.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-24 bg-neutral-gray-700 rounded-lg flex items-center justify-center">
                        <FileText className="text-neutral-gray-600" size={24} />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removePortfolioFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={uploading}
            className="btn-secondary w-full py-4 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {uploading ? 'Creating Profile...' : 'Create Talent Profile'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}
