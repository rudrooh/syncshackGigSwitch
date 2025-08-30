// Data for job postings and freelancer profiles
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

// Global state
let currentUserType = 'freelancer';
let currentCardIndex = 0;
let appliedJobs = [];
let rejectedJobs = [];
let acceptedFreelancers = [];
let rejectedFreelancers = [];

// DOM elements
const toggleContainer = document.getElementById('toggleSlider');
const freelancerBtn = document.getElementById('freelancerBtn');
const employerBtn = document.getElementById('employerBtn');
const cardContent = document.getElementById('cardContent');
const statsText = document.getElementById('statsText');
const matchModal = document.getElementById('matchModal');
const matchMessage = document.getElementById('matchMessage');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderCard();
    updateStats();
    setupKeyboardNavigation();
    setupSmoothScrolling();
});

// User type switching functions
function switchUserType(type) {
    if (type === currentUserType) return;
    
    currentUserType = type;
    currentCardIndex = 0;
    
    // Update toggle UI
    if (type === 'employer') {
        toggleContainer.parentElement.classList.add('employer');
        freelancerBtn.classList.remove('active');
        employerBtn.classList.add('active');
    } else {
        toggleContainer.parentElement.classList.remove('employer');
        freelancerBtn.classList.add('active');
        employerBtn.classList.remove('active');
    }
    
    renderCard();
    updateStats();
}

function switchToFreelancer() {
    switchUserType('freelancer');
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
}

function switchToEmployer() {
    switchUserType('employer');
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
}

// Card rendering
function renderCard() {
    const currentData = currentUserType === 'freelancer' ? jobPostings : freelancerProfiles;
    const currentItem = currentData[currentCardIndex];
    
    if (!currentItem) return;
    
    if (currentUserType === 'freelancer') {
        renderJobCard(currentItem);
    } else {
        renderFreelancerCard(currentItem);
    }
}

function renderJobCard(job) {
    cardContent.innerHTML = `
        <div class="card-header">
            <img src="${job.companyImage}" alt="${job.company}">
            <div class="card-overlay">
                <h2>${job.title}</h2>
                <p>${job.company}</p>
                <div style="display: flex; align-items: center; margin-top: 5px;">
                    <i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i>
                    ${job.location}
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="card-info">
                <span><i class="fas fa-clock"></i> ${job.duration}</span>
                <span><i class="fas fa-dollar-sign"></i> ${job.budget}</span>
            </div>
            
            <div class="card-description">
                <h3>Job Description</h3>
                <p>${job.description}</p>
            </div>
            
            <div class="card-tags">
                <h3>Requirements</h3>
                ${job.requirements.map(req => `<span class="tag">${req}</span>`).join('')}
            </div>
            
            ${job.prompts.slice(0, 2).map(prompt => `
                <div class="card-prompts">
                    <h4>${prompt.question}</h4>
                    <p>${prompt.answer}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderFreelancerCard(freelancer) {
    cardContent.innerHTML = `
        <div class="card-header">
            <img src="${freelancer.profileImage}" alt="${freelancer.name}">
            <div class="card-overlay">
                <h2>${freelancer.name}</h2>
                <p>${freelancer.title}</p>
                <div style="display: flex; align-items: center; margin-top: 5px;">
                    <i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i>
                    ${freelancer.location}
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="card-info">
                <span><i class="fas fa-star"></i> ${freelancer.rating} (${freelancer.completedJobs} jobs)</span>
                <span><i class="fas fa-dollar-sign"></i> ${freelancer.hourlyRate}</span>
            </div>
            
            <div class="card-info">
                <span><i class="fas fa-briefcase"></i> ${freelancer.experience} experience</span>
                <span style="color: #3b82f6;">${freelancer.availability}</span>
            </div>
            
            <div class="card-tags">
                <h3>Skills</h3>
                ${freelancer.skills.map(skill => `<span class="tag" style="background: #dcfce7; color: #166534;">${skill}</span>`).join('')}
            </div>
            
            <div class="card-description">
                <h3>Recent Work</h3>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    ${freelancer.portfolio.map(img => `<img src="${img}" alt="Portfolio" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">`).join('')}
                </div>
            </div>
            
            ${freelancer.prompts.slice(0, 2).map(prompt => `
                <div class="card-prompts" style="border-left-color: #10b981;">
                    <h4>${prompt.question}</h4>
                    <p>${prompt.answer}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Action handlers
function handleApply() {
    const currentData = currentUserType === 'freelancer' ? jobPostings : freelancerProfiles;
    const currentItem = currentData[currentCardIndex];
    
    if (currentUserType === 'freelancer') {
        appliedJobs.push(currentItem.id);
        if (Math.random() > 0.6) {
            showMatch(currentItem.company, 'wants to hire you!');
        }
    } else {
        acceptedFreelancers.push(currentItem.id);
        if (Math.random() > 0.6) {
            showMatch(currentItem.name, 'wants to work with you!');
        }
    }
    
    nextCard();
}

function handleReject() {
    const currentData = currentUserType === 'freelancer' ? jobPostings : freelancerProfiles;
    const currentItem = currentData[currentCardIndex];
    
    if (currentUserType === 'freelancer') {
        rejectedJobs.push(currentItem.id);
    } else {
        rejectedFreelancers.push(currentItem.id);
    }
    
    nextCard();
}

function nextCard() {
    const currentData = currentUserType === 'freelancer' ? jobPostings : freelancerProfiles;
    
    if (currentCardIndex < currentData.length - 1) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
    
    renderCard();
    updateStats();
}

// Match modal
function showMatch(name, message) {
    matchMessage.textContent = `${name} ${message}`;
    matchModal.classList.add('show');
    
    setTimeout(() => {
        closeMatchModal();
    }, 3000);
}

function closeMatchModal() {
    matchModal.classList.remove('show');
}

// Stats update
function updateStats() {
    const currentData = currentUserType === 'freelancer' ? jobPostings : freelancerProfiles;
    
    if (currentUserType === 'freelancer') {
        statsText.textContent = `Job ${currentCardIndex + 1} of ${jobPostings.length} • ${appliedJobs.length} applied • ${rejectedJobs.length} passed`;
    } else {
        statsText.textContent = `Freelancer ${currentCardIndex + 1} of ${freelancerProfiles.length} • ${acceptedFreelancers.length} interested • ${rejectedFreelancers.length} passed`;
    }
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            handleReject();
        } else if (e.key === 'ArrowRight') {
            handleApply();
        }
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile navigation toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    // Add mobile menu functionality here if needed
});

// Close modal when clicking outside
matchModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeMatchModal();
    }
});
