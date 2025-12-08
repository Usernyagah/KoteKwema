# Kote Kwema - Architecture Firm Website

Award-winning architecture firm website showcasing innovative and sustainable designs across residential, commercial, and cultural spaces in Nairobi, Kenya.

## 🏗️ Project Overview

Kote Kwema is a modern, responsive website built for an architecture firm specializing in sustainable design, urban planning, and innovative architectural solutions. The site features a clean, professional design with comprehensive content management, form handling, and SEO optimization.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Fully mobile-responsive layout that works seamlessly across all devices
- **Dynamic Routing**: React Router-based navigation with subtopic pages
- **Search Functionality**: Client-side search across all subtopics
- **Form Handling**: Integrated Formspree forms for newsletter, consultation, and inquiries
- **Menu System**: Interactive menu with hover previews and click navigation

### Performance & SEO
- **SEO Optimization**: Dynamic meta tags, Open Graph, and Twitter Card support
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Lazy Loading**: Image lazy loading component for improved performance
- **Error Handling**: React Error Boundaries for graceful error management

### User Experience
- **Enhanced 404 Page**: User-friendly 404 page with navigation options
- **Accessibility**: ARIA labels and keyboard navigation support
- **Analytics Ready**: Analytics tracking structure (ready for Google Analytics integration)

## 🛠️ Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Form Handling**: Formspree
- **State Management**: React Hooks
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd KoteKwema

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for analytics (optional):

```env
VITE_GA_MEASUREMENT_ID=your-google-analytics-id
```

### Formspree Setup

The project uses Formspree for form submissions. Configure your forms:

1. Create a Formspree account at [formspree.io](https://formspree.io)
2. Create forms for:
   - Newsletter subscription
   - Consultation requests
   - General inquiries
   - Project inquiries
3. Update form IDs in:
   - `src/components/News.tsx` (newsletter)
   - `src/components/ContactForm.tsx` (contact forms)

See `FORMS_SETUP.md` for detailed instructions.

## 📁 Project Structure

```
KoteKwema/
├── src/
│   ├── assets/          # Images and media files
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## 🎨 Key Components

### Pages
- **Index**: Homepage with hero, architecture showcase, expertise, news, and climate sections
- **SubTopicPage**: Dynamic page component for all subtopic routes
- **NotFound**: Enhanced 404 error page

### Components
- **Navigation**: Main navigation bar with logo, menu, and search
- **Menu**: Full-screen menu overlay with category navigation
- **SearchOverlay**: Search functionality with results
- **ContactForm**: Reusable form component for various contact types
- **ErrorBoundary**: Error handling component
- **LazyImage**: Lazy loading image component
- **StructuredData**: SEO structured data component

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

#### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

#### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📝 Content Management

All content is managed in `src/pages/SubTopicPage.tsx` in the `subtopicContent` object. To update content:

1. Navigate to `src/pages/SubTopicPage.tsx`
2. Find the relevant subtopic in `subtopicContent`
3. Update the content object with your changes

## 🔍 SEO Features

- Dynamic meta tags for each page
- Open Graph tags for social media sharing
- Twitter Card support
- Structured data (JSON-LD) for:
  - Organization information
  - Website schema
  - Breadcrumb navigation

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Alt text for all images

## 🐛 Error Handling

- React Error Boundaries catch and display errors gracefully
- Enhanced 404 page with navigation options
- Form validation and error messages

## 📊 Analytics

Analytics tracking is set up and ready. To enable:

1. Add your Google Analytics Measurement ID to `.env`
2. Uncomment the initialization code in `src/utils/analytics.ts`
3. Analytics will automatically track page views and events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 📧 Contact

For questions or support, contact:
- Email: info@kotekwema.com
- Twitter: [@KoteKwema](https://x.com/KoteKwema)

## 🙏 Acknowledgments

- Design inspiration from Foster + Partners
- Built with modern web technologies
- Optimized for performance and user experience
