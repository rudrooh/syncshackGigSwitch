'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Building2, Upload, MapPin, Globe, Mail } from 'lucide-react'
import { Business, WorkCultureTag } from '../../../types'
// import { db, storage } from '@/lib/firebase'
// import { collection, addDoc } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// import toast from 'react-hot-toast'

const workCultureOptions: WorkCultureTag[] = [
  'autocratic', 'democratic', 'collaborative', 'hierarchical',
  'flat', 'agile', 'traditional', 'innovative',
  'remote-friendly', 'office-based', 'flexible-hours', 'structured-hours'
]

export default function BusinessSignupPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [selectedWorkCulture, setSelectedWorkCulture] = useState<WorkCultureTag[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Business>>()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const toggleWorkCulture = (tag: WorkCultureTag) => {
    setSelectedWorkCulture(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Mock function - replace with real Firebase later
  const uploadImages = async (files: File[]): Promise<string[]> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return files.map(file => `mock-url-${file.name}`)
  }

  const onSubmit = async (data: Partial<Business>) => {
    if (selectedImages.length === 0) {
      alert('Please upload at least one business image')
      return
    }

    if (selectedWorkCulture.length === 0) {
      alert('Please select at least one work culture tag')
      return
    }

    setUploading(true)
    try {
      // Mock image upload
      const imageUrls = await uploadImages(selectedImages)
      
      // Mock business profile creation
      const businessData: Partial<Business> = {
        ...data,
        images: imageUrls,
        workCulture: selectedWorkCulture,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      console.log('Business profile data:', businessData)
      alert('Business profile created successfully! (Mock)')
      
      // Redirect to home for now
      router.push('/')
    } catch (error) {
      console.error('Error creating business profile:', error)
      alert('Failed to create business profile')
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
          <h1 className="text-4xl font-serif mb-4">Sign up your business</h1>
          <p className="text-neutral-gray-600">Tell us about your company</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Business Name *</label>
            <input
              {...register('name', { required: 'Business name is required' })}
              className="input-field w-full"
              placeholder="Enter your business name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field w-full h-24 resize-none"
              placeholder="Describe your business..."
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
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

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium mb-2">Industry *</label>
            <input
              {...register('industry', { required: 'Industry is required' })}
              className="input-field w-full"
              placeholder="e.g., Technology, Healthcare, Finance"
            />
            {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>}
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium mb-2">Company Size *</label>
            <select
              {...register('size', { required: 'Company size is required' })}
              className="input-field w-full"
            >
              <option value="">Select company size</option>
              <option value="startup">Startup (1-10 employees)</option>
              <option value="small">Small (11-50 employees)</option>
              <option value="medium">Medium (51-200 employees)</option>
              <option value="large">Large (200+ employees)</option>
            </select>
            {errors.size && <p className="text-red-400 text-sm mt-1">{errors.size.message}</p>}
          </div>

          {/* Founded Year */}
          <div>
            <label className="block text-sm font-medium mb-2">Founded Year</label>
            <input
              {...register('founded')}
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              className="input-field w-full"
              placeholder="e.g., 2020"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray-600" size={20} />
              <input
                {...register('website')}
                type="url"
                className="input-field w-full pl-10"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Contact Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray-600" size={20} />
              <input
                {...register('contactEmail', { 
                  required: 'Contact email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="input-field w-full pl-10"
                placeholder="contact@yourbusiness.com"
              />
            </div>
            {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail.message}</p>}
          </div>

          {/* Work Culture Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Work Culture *</label>
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
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
            {selectedWorkCulture.length === 0 && (
              <p className="text-red-400 text-sm mt-1">Please select at least one work culture tag</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Business Images *</label>
            <div className="border-2 border-dashed border-neutral-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-2 text-neutral-gray-600" size={32} />
                <p className="text-neutral-gray-600">Click to upload images</p>
                <p className="text-sm text-neutral-gray-600">PNG, JPG up to 5MB each</p>
              </label>
            </div>
            
            {/* Preview uploaded images */}
            {selectedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
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
            className="btn-primary w-full py-4 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {uploading ? 'Creating Profile...' : 'Create Business Profile'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}
