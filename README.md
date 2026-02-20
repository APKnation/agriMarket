# SFMP Tanzania - Sustainable Farm-to-Market Program

A comprehensive Vue.js 3 frontend application for connecting Tanzanian smallholder farmers with markets, promoting sustainable agriculture and improving livelihoods through technology and transparency.

## 🌾 Project Overview

The SFMP (Sustainable Farm-to-Market Program) is a digital platform designed to facilitate the entire agricultural value chain in Tanzania, from crop planting to market sales. The system serves multiple user roles including farmers, buyers, cooperatives, and administrators.

## 🚀 Features

### Core Functionality
- **Farmer Management**: Registration, verification, profile management, and performance tracking
- **Crop Management**: Planting tracking, health monitoring, yield forecasting, and climate-smart recommendations
- **Product Marketplace**: Product listings, quality grading, pricing management, and inventory tracking
- **Order Management**: Order processing, status tracking, payment management, and delivery coordination
- **Analytics Dashboard**: Comprehensive reporting, revenue tracking, and performance metrics
- **Multi-role Support**: Different interfaces and permissions for farmers, buyers, cooperatives, and admins

### User Roles
- **Farmers**: Register crops, list products, manage orders, track yields
- **Buyers/Markets**: Browse products, place orders, manage purchases
- **Cooperatives**: Manage member farmers, aggregate products, coordinate logistics
- **Administrators**: Full system oversight, analytics, user management

## 🛠 Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite
- **Charts**: Chart.js with Vue Chart.js

## 📱 UI/UX Features

- **Mobile-first responsive design**
- **High contrast for outdoor visibility**
- **Large touch targets for ease of use**
- **Multi-language support (English/Swahili)**
- **Intuitive navigation suitable for varying tech literacy**
- **Accessibility-focused design**

## 🎨 Design System

### Color Palette
- **Primary Green**: Agriculture and growth (#22c55e)
- **Earth Tones**: Brown/tan for natural feel (#bfa094)
- **Accent Orange**: Warmth and harvest (#f97316)
- **Background**: Light cream/white for readability

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700
- **Optimized for readability on various devices**

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   └── layout/          # Layout components
├── stores/              # Pinia stores
├── views/
│   ├── auth/           # Authentication pages
│   ├── farmers/        # Farmer management
│   ├── crops/          # Crop management
│   ├── products/       # Product marketplace
│   ├── orders/         # Order management
│   ├── analytics/      # Analytics dashboard
│   ├── profile/        # User profile
│   └── settings/       # Settings
├── router/             # Vue Router configuration
├── App.vue             # Main app component
└── main.js             # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sfmp-tanzania
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🧪 Demo Accounts

Use these credentials to explore different user roles:

- **Farmer**: farmer@sfmp.com / password
- **Buyer**: buyer@sfmp.com / password  
- **Cooperative**: cooperative@sfmp.com / password
- **Admin**: admin@sfmp.com / password

## 📊 Key Features in Detail

### Farmer Management
- Complete registration with farm details
- Verification status tracking
- Performance metrics and ratings
- Location-based mapping

### Crop Management
- Seasonal planting tracking
- Growth monitoring with health status
- Yield forecasting vs actual harvest
- Climate-smart crop recommendations based on region

### Product Marketplace
- Advanced filtering and search
- Quality grading system (A, B, C grades)
- Certification management (Organic, Climate Smart, etc.)
- Real-time inventory management
- Image uploads and product galleries

### Order Management
- Real-time order tracking
- Multi-status workflow (Pending → Confirmed → Processing → Shipped → Delivered)
- Invoice generation and download
- Delivery coordination

### Analytics Dashboard
- Revenue trends and forecasting
- Regional performance metrics
- Top performers (farmers and products)
- Crop distribution analysis
- Export capabilities for reports

## 🔐 Authentication & Security

- Role-based access control
- Secure password handling
- Session management
- Protected routes
- User verification system

## 🌍 Localization

The application supports multiple languages:
- English (default)
- Swahili (planned implementation)

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive layouts for different screen sizes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=SFMP Tanzania
```

### Tailwind Configuration
The Tailwind config includes custom color schemes and components for the SFMP brand.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Designed for Tanzanian smallholder farmers
- Built with sustainable agriculture principles
- Focused on improving rural livelihoods
- Supporting climate-smart agriculture initiatives

## 📞 Support

For support and inquiries:
- Email: info@sfmp.tz
- Phone: +255 22 211 0000
- Location: Dodoma, Tanzania

---

**SFMP Tanzania** - Connecting Farmers to Markets, Sustainably 🌾
