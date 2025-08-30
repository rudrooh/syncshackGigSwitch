import React, { useState, useEffect } from 'react';
import { Check, X, Briefcase, Settings, User, MapPin, Clock, DollarSign, Star, Heart, ThumbsDown } from 'lucide-react';

const GigMatchApp = () => {
  const [userType, setUserType] = useState('freelancer');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [acceptedFreelancers, setAcceptedFreelancers] = useState([]);
  const [rejectedFreelancers, setRejectedFreelancers] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedItem, setMatchedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Sample Job Postings (for freelancers to browse)
  const jobPostings = [
    {
      id: 1,
      title: "Social Media Content Creator",
      company: "Local Coffee Shop",
      location: "Sydney, NSW",
      type: "Part-time Contract",
      duration: "3 months",
      budget: "$25-35/hour",
      postedBy: "Sarah Chen",
      companyImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
      description: "Looking for a creative content creator to manage our Instagram and TikTok accounts.",
      requirements: ["Social Media Experience", "Content Creation", "Photography Skills", "Available weekends"],
      prompts: [
        { question: "What we're looking for", answer: "Someone who understands cafe culture and can create engaging content that resonates with young professionals and students." },
        { question: "Perfect candidate", answer: "Creative, reliable, and has experience growing social media accounts for small businesses." },
        { question: "Why work with us", answer: "Flexible hours, free coffee, and the chance to build a portfolio with a growing local brand!" }
      ],
      tags: ["Social Media", "Content Creation", "Photography", "Part-time"]
    },
    {
      id: 2,
      title: "Website Development",
      company: "Green Thumb Landscaping",
      location: "Melbourne, VIC",
      type: "One-time Project",
      duration: "6 weeks",
      budget: "$2,500-4,000",
      postedBy: "Michael Rodriguez",
      companyImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      description: "Need a professional website for our landscaping business with booking system.",
      requirements: ["React/WordPress", "E-commerce", "Mobile Responsive", "SEO Knowledge"],
      prompts: [
        { question: "Project scope", answer: "Modern, clean website with online booking, gallery of our work, and customer testimonials section." },
        { question: "What makes this special", answer: "We want to showcase our sustainable gardening practices and eco-friendly approach." },
        { question: "Timeline expectations", answer: "Flexible timeline, quality over speed. We're looking for a long-term tech partner." }
      ],
      tags: ["Web Development", "React", "E-commerce", "One-time"]
    },
    {
      id: 3,
      title: "Logo & Brand Design",
      company: "Fitness Together PT",
      location: "Brisbane, QLD", 
      type: "One-time Project",
      duration: "2-3 weeks",
      budget: "$800-1,200",
      postedBy: "Emma Watson",
      companyImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Personal training studio needs complete brand identity including logo, colors, and business cards.",
      requirements: ["Graphic Design", "Brand Strategy", "Adobe Creative Suite", "Print Design"],
      prompts: [
        { question: "Brand vision", answer: "Modern, motivational, and approachable. We focus on personal growth and sustainable fitness." },
        { question: "Target audience", answer: "Working professionals aged 25-45 who want personalized fitness solutions." },
        { question: "What we value", answer: "Clean design, professionalism, and someone who asks the right questions about our business." }
      ],
      tags: ["Graphic Design", "Branding", "Logo Design", "Print"]
    }
  ];

  // Sample Freelancer Profiles (for employers to browse)
  const freelancerProfiles = [
    {
      id: 1,
      name: "Alex Thompson",
      title: "Full-Stack Developer",
      location: "Sydney, NSW",
      experience: "5 years",
      hourlyRate: "$45-65/hour",
      availability: "Available now",
      rating: 4.9,
      completedJobs: 127,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
      ],
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
      prompts: [
        { question: "My specialty", answer: "Building scalable web applications for small businesses. I love turning ideas into functional, beautiful products." },
        { question: "Why hire me", answer: "I communicate clearly, deliver on time, and provide ongoing support. Your success is my success." },
        { question: "Recent achievement", answer: "Just helped a local restaurant increase online orders by 300% with their new ordering system." }
      ],
      tags: ["Web Development", "Full-Stack", "E-commerce", "API Integration"]
    },
    {
      id: 2,
      name: "Sophie Martinez",
      title: "Graphic Designer & Brand Strategist",
      location: "Melbourne, VIC",
      experience: "7 years",
      hourlyRate: "$40-55/hour", 
      availability: "Available in 2 weeks",
      rating: 4.8,
      completedJobs: 89,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop"
      ],
      skills: ["Brand Design", "Logo Creation", "Adobe Creative Suite", "Print Design", "UI/UX"],
      prompts: [
        { question: "My design philosophy", answer: "Great design tells your story. I create brands that connect with your audience and grow with your business." },
        { question: "What I bring", answer: "Strategic thinking, creative execution, and 7 years of helping small businesses stand out in crowded markets." },
        { question: "Client feedback", answer: "'Sophie didn't just design our logo, she helped us understand our brand.' - Recent client review" }
      ],
      tags: ["Graphic Design", "Branding", "Logo Design", "Strategy"]
    },
    {
      id: 3,
      name: "Jordan Kim",
      title: "Digital Marketing Specialist", 
      location: "Brisbane, QLD",
      experience: "4 years",
      hourlyRate: "$35-50/hour",
      availability: "Available now",
      rating: 4.7,
      completedJobs: 156,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1554774853-719586f82d77?w=400&h=300&fit=crop"
      ],
      skills: ["Social Media", "Content Creation", "Google Ads", "Analytics", "SEO"],
      prompts: [
        { question: "My marketing approach", answer: "Data-driven creativity. I create content that engages and campaigns that convert." },
        { question: "Best results", answer: "Grew a local gym's Instagram from 500 to 15K followers in 6 months, increasing memberships by 40%." },
        { question: "What I love most", answer: "Seeing small businesses thrive online. Every view, like, and conversion represents real impact." }
      ],
      tags: ["Digital Marketing", "Social Media", "Content Strategy", "Analytics"]
    }
  ];

  const currentData = userType === 'freelancer' ? jobPostings : freelancerProfiles;
  const currentItem = currentData[currentCardIndex];

  // Touch/Mouse event handlers for swipe gestures
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragOffset({ x: clientX, y: clientY });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragOffset.x;
    const deltaY = clientY - dragOffset.y;
    
    // Update card position
    const card = document.getElementById('swipe-card');
    if (card) {
      const rotation = deltaX * 0.1;
      card.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotation}deg)`;
      
      // Visual feedback for swipe direction
      if (Math.abs(deltaX) > 50) {
        setSwipeDirection(deltaX > 0 ? 'right' : 'left');
      } else {
        setSwipeDirection(null);
      }
    }
  };

  const handleEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const card = document.getElementById('swipe-card');
    
    if (card) {
      const deltaX = parseInt(card.style.transform.match(/translateX\(([^p]+)px\)/)?.[1] || '0');
      
      if (Math.abs(deltaX) > 100) {
        // Swipe threshold reached
        if (deltaX > 0) {
          handleApply();
        } else {
          handleReject();
        }
      } else {
        // Snap back to center
        card.style.transition = 'transform 0.3s ease-out';
        card.style.transform = 'translateX(0px) translateY(0px) rotate(0deg)';
        setTimeout(() => {
          card.style.transition = '';
        }, 300);
      }
    }
    
    setSwipeDirection(null);
  };

  const handleApply = () => {
    if (userType === 'freelancer') {
      const job = jobPostings[currentCardIndex];
      setAppliedJobs([...appliedJobs, job.id]);
      
      if (Math.random() > 0.6) {
        setMatchedItem(job);
        setShowMatch(true);
        setTimeout(() => setShowMatch(false), 3000);
      }
    } else {
      const freelancer = freelancerProfiles[currentCardIndex];
      setAcceptedFreelancers([...acceptedFreelancers, freelancer.id]);
      
      if (Math.random() > 0.6) {
        setMatchedItem(freelancer);
        setShowMatch(true);
        setTimeout(() => setShowMatch(false), 3000);
      }
    }
    animateCardExit('right');
  };

  const handleReject = () => {
    if (userType === 'freelancer') {
      const job = jobPostings[currentCardIndex];
      setRejectedJobs([...rejectedJobs, job.id]);
    } else {
      const freelancer = freelancerProfiles[currentCardIndex];
      setRejectedFreelancers([...rejectedFreelancers, freelancer.id]);
    }
    animateCardExit('left');
  };

  const animateCardExit = (direction) => {
    const card = document.getElementById('swipe-card');
    if (card) {
      const translateX = direction === 'right' ? '100vw' : '-100vw';
      const rotation = direction === 'right' ? '30deg' : '-30deg';
      
      card.style.transition = 'transform 0.4s ease-out';
      card.style.transform = `translateX(${translateX}) rotate(${rotation})`;
      
      setTimeout(() => {
        nextCard();
        card.style.transition = '';
        card.style.transform = 'translateX(0px) translateY(0px) rotate(0deg)';
      }, 400);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < currentData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const switchUserType = () => {
    setUserType(userType === 'freelancer' ? 'employer' : 'freelancer');
    setCurrentCardIndex(0);
  };

  if (!currentItem) return null;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen select-none">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Settings className="w-6 h-6 text-gray-600" />
        <div className="flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">GigMatch</h1>
        </div>
        <User className="w-6 h-6 text-gray-600" />
      </div>

      {/* User Type Toggle */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex bg-gray-100 rounded-lg p-1 relative">
          <div 
            className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ${
              userType === 'freelancer' ? 'left-1 bg-blue-600' : 'right-1 bg-green-600'
            }`}
          />
          <button
            onClick={() => userType !== 'freelancer' && switchUserType()}
            className={`relative flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
              userType === 'freelancer' 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Find Work
          </button>
          <button
            onClick={() => userType !== 'employer' && switchUserType()}
            className={`relative flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
              userType === 'employer' 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Find Talent
          </button>
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-500">
          💡 Swipe right to apply, left to pass, or use the buttons below
        </p>
      </div>

      {/* Main Card Stack */}
      <div className="p-4 relative">
        {/* Background cards for depth */}
        {currentData.slice(currentCardIndex + 1, currentCardIndex + 3).map((item, index) => (
          <div
            key={item.id}
            className="absolute bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{
              width: '100%',
              height: 'auto',
              transform: `scale(${0.95 - index * 0.05}) translateY(${(index + 1) * 10}px)`,
              zIndex: -index - 1,
              opacity: 0.5 - index * 0.2
            }}
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
            </div>
          </div>
        ))}

        {/* Main swipeable card */}
        <div
          id="swipe-card"
          className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ 
            touchAction: 'none',
            transform: 'translateX(0px) translateY(0px) rotate(0deg)'
          }}
        >
          {/* Swipe indicators */}
          <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-200 ${
            swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
              <Check className="w-8 h-8" />
            </div>
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-200 ${
            swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg border-4 border-white shadow-lg">
              <X className="w-8 h-8" />
            </div>
          </div>

          {userType === 'freelancer' ? (
            /* Job Posting Card */
            <>
              <div className="relative h-48">
                <img 
                  src={currentItem.companyImage} 
                  alt={currentItem.company}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h2 className="text-xl font-bold">{currentItem.title}</h2>
                  <p className="text-sm opacity-90">{currentItem.company}</p>
                  <div className="flex items-center mt-1 text-xs opacity-75">
                    <MapPin className="w-3 h-3 mr-1" />
                    {currentItem.location}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentItem.duration}
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {currentItem.budget}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Job Description</h3>
                  <p className="text-gray-700 text-sm">{currentItem.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {currentItem.prompts.slice(0, 2).map((prompt, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-medium text-gray-700">{prompt.question}</p>
                    <p className="text-gray-900 mt-1 text-sm">{prompt.answer}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Freelancer Profile Card */
            <>
              <div className="relative h-48">
                <img 
                  src={currentItem.profileImage} 
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h2 className="text-xl font-bold">{currentItem.name}</h2>
                  <p className="text-sm opacity-90">{currentItem.title}</p>
                  <div className="flex items-center mt-1 text-xs opacity-75">
                    <MapPin className="w-3 h-3 mr-1" />
                    {currentItem.location}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mr-4">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {currentItem.rating}
                    </div>
                    <div>{currentItem.completedJobs} jobs</div>
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {currentItem.hourlyRate}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{currentItem.experience} experience</span>
                  <span className="text-blue-600">{currentItem.availability}</span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Recent Work</h3>
                  <div className="flex space-x-2">
                    {currentItem.portfolio.map((image, index) => (
                      <img key={index} src={image} alt="Portfolio" className="w-20 h-20 rounded-lg object-cover" draggable={false} />
                    ))}
                  </div>
                </div>

                {currentItem.prompts.slice(0, 2).map((prompt, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm font-medium text-gray-700">{prompt.question}</p>
                    <p className="text-gray-900 mt-1 text-sm">{prompt.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-8 p-6 mt-4">
          <button 
            onClick={handleReject}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 border-2 border-red-200 hover:border-red-300 hover:scale-110 active:scale-95"
          >
            <X className="w-7 h-7 text-red-600" />
          </button>
          
          <button 
            onClick={handleApply}
            className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
              userType === 'freelancer' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Check className="w-8 h-8 text-white" />
          </button>
          
          <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 hover:scale-110 active:scale-95">
            <Heart className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="text-center text-sm text-gray-500 pb-4">
          {userType === 'freelancer' ? (
            <>Job {currentCardIndex + 1} of {jobPostings.length} • {appliedJobs.length} applied • {rejectedJobs.length} passed</>
          ) : (
            <>Freelancer {currentCardIndex + 1} of {freelancerProfiles.length} • {acceptedFreelancers.length} interested • {rejectedFreelancers.length} passed</>
          )}
        </div>
      </div>

      {/* Match Modal */}
      {showMatch && matchedItem && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${
          userType === 'freelancer' ? 'bg-blue-600' : 'bg-green-600'
        }`}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="text-center text-white animate-bounce">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4">It's a Match!</h2>
            <p className="text-xl">
              {userType === 'freelancer' 
                ? `${matchedItem.company} wants to hire you!`
                : `${matchedItem.name} wants to work with you!`
              }
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        #swipe-card {
          transition: transform 0.1s ease-out;
        }
        
        #swipe-card:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default GigMatchApp;