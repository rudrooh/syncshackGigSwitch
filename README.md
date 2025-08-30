# Gig$wipe - Tinder-Style Job Matching Platform

A modern, dark-themed Next.js application that connects local employers with talented employees through an intuitive Tinder-style matching interface.

## 🎯 **Project Overview**

Gig$wipe is a startup project that revolutionizes the hiring process by combining:
- **Tinder-style swiping** for job matching
- **AI-powered CV parsing** for automatic skill extraction
- **Work culture matching** for better employer-employee compatibility
- **Personality-based matching** for team dynamics
- **Local business focus** for community-driven hiring

## 🚀 **Features**

### **Core Functionality**
- **Dual User Types**: Business owners and job seekers
- **Tinder-Style Interface**: Swipe right to like, left to pass
- **Smart Matching**: Skillset and work culture compatibility
- **AI CV Parsing**: Automatic skill and experience extraction
- **Real-time Chat**: Direct communication between matched parties
- **Business Reviews**: Employee feedback system

### **Business Features**
- Company profile creation with image uploads
- Job posting with detailed requirements
- Work culture tag selection
- Talent matching and filtering
- Mass selection interface for multiple candidates

### **Talent Features**
- Professional profile creation
- Skillset and personality tagging
- Work culture preference selection
- Portfolio and resume upload
- AI-powered CV parsing

## 🛠️ **Technology Stack**

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **AI**: CV parsing with text analysis
- **Deployment**: Vercel
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Icons**: Lucide React

## 📁 **Project Structure**

```
gigswipe/
├── app/                          # Next.js app directory
│   ├── business/                 # Business-related pages
│   │   └── signup/              # Business signup form
│   ├── talent/                   # Talent-related pages
│   │   └── signup/              # Talent signup form
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   └── TinderCard.tsx           # Tinder-style card component
├── lib/                         # Utility libraries
│   └── firebase.ts              # Firebase configuration
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Main type definitions
├── store/                       # State management
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── vercel.json                  # Vercel deployment config
└── env.example                  # Environment variables template
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Firebase project
- Vercel account (for deployment)

### **1. Clone and Install**
```bash
git clone <your-repo-url>
cd gigswipe
npm install
```

### **2. Firebase Setup**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Enable Storage
6. Get your configuration keys

### **3. Environment Variables**
Copy `env.example` to `.env.local` and fill in your Firebase credentials:
```bash
cp env.example .env.local
```

Edit `.env.local` with your Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### **4. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔥 **Firebase Configuration**

### **Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Businesses can read/write their own data
    match /businesses/{businessId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Talents can read/write their own data
    match /talents/{talentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Jobs are readable by all, writable by business owners
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.businessId;
    }
  }
}
```

### **Storage Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /business-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /resumes/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎨 **Design System**

### **Color Palette**
- **Primary Black**: `#000000` - Main background
- **Dark Gray**: `#0a0a0a` - Secondary background
- **Turquoise**: `#00d4aa` - Primary accent
- **Purple**: `#8b5cf6` - Secondary accent
- **Neutral Grays**: Various shades for text and borders

### **Typography**
- **Serif**: Georgia for headings and emphasis
- **Sans**: Inter for body text and UI elements

### **Components**
- **Buttons**: Primary (turquoise), Secondary (purple), Outline
- **Cards**: Dark theme with subtle borders and shadows
- **Tags**: Color-coded for skills, personality, and work culture
- **Forms**: Dark inputs with focus states

## 📱 **Responsive Design**

The application is fully responsive with:
- **Mobile-first** approach
- **Touch-friendly** swipe gestures
- **Adaptive layouts** for all screen sizes
- **Optimized navigation** for mobile devices

## 🤖 **AI CV Parsing**

### **Current Implementation**
- Text extraction from uploaded files
- Skill suggestion based on content analysis
- Experience estimation
- Auto-fill form fields

### **Production Enhancement**
For production, integrate with:
- **OpenAI GPT** for advanced text analysis
- **AWS Textract** for PDF parsing
- **Google Cloud Vision** for image-based CVs
- **Custom ML models** for industry-specific parsing

## 🚀 **Deployment**

### **Vercel Deployment**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### **Environment Variables in Vercel**
Set these in your Vercel project settings:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 🔒 **Security Features**

- **Firebase Security Rules** for data access control
- **Authentication** required for sensitive operations
- **File upload validation** and size limits
- **Input sanitization** and validation
- **Rate limiting** for API endpoints

## 📊 **Performance Optimization**

- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Optimized animations** with Framer Motion
- **Efficient state management** with Zustand
- **CDN delivery** through Vercel

## 🧪 **Testing**

### **Run Tests**
```bash
npm run test
```

### **Test Coverage**
```bash
npm run test:coverage
```

## 📈 **Future Enhancements**

- **Real-time notifications** with Firebase Cloud Messaging
- **Advanced analytics** and matching algorithms
- **Video profiles** and virtual interviews
- **Integration** with job boards and LinkedIn
- **Mobile app** development
- **AI-powered** interview scheduling
- **Background check** integration
- **Payment processing** for premium features

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Gig$wipe** - Swipe less, work more! 🚀
