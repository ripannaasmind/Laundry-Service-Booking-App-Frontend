# UltraWash - Professional Laundry Service Booking App

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, full-stack laundry service booking application built with Next.js 16, TypeScript, Tailwind CSS v4, and Express.js backend with MongoDB. Features admin dashboard, Google Sign-In, Stripe/PayPal payments, and role-based access control.

---

## 🔐 Default Credentials

### Admin Account
| Field | Value |
|-------|-------|
| **Email** | `admin@ultrawash.com` |
| **Password** | `Admin@123` |
| **Login URL** | `/admin/login` |

### Test User Account
| Field | Value |
|-------|-------|
| **Email** | `user@ultrawash.com` |
| **Password** | `User@123` |
| **Login URL** | `/login` |

> **Note:** You can also sign in with **Google** using any Gmail account. Google profile pictures will be displayed automatically.

---

## 🌟 Key Features

### Core Functionality
- **Full-Stack Application** - Express.js backend with MongoDB + Next.js 16 frontend
- **Admin Dashboard** - Complete admin panel with orders, users, services, coupons, payments, reviews, reports management
- **User Dashboard** - Orders, profile, payment methods, chat, settings
- **Google Sign-In** - Firebase authentication with Google profile picture display
- **Role-Based Access** - Admin and user roles with route protection
- **8 Service Categories** - Wash & Fold, Wash & Iron, Dry Cleaning, Ironing, Premium Wash, Bedding & Linen, Stain Removal, Shoe Cleaning
- **Smart Cart System** - Add/remove items, adjust quantities, apply coupon codes
- **Multiple Payment Methods** - Stripe, PayPal, SSLCommerz, Cash on Delivery
- **Responsive Design** - Works flawlessly on all devices

### Pages Included
- ✅ **Home** - Landing page with hero, services, features, testimonials, FAQ
- ✅ **Services** - Dynamic service listing with animated toggle filter
- ✅ **Service Details** - Individual service pages with item selection
- ✅ **Cart** - Shopping cart with checkbox selection and price calculation
- ✅ **Checkout** - Complete checkout flow with billing/shipping info
- ✅ **Payment** - Stripe, PayPal, SSLCommerz payment processing
- ✅ **Blog** - Blog listing with categories and search
- ✅ **About Us** - Company information and team showcase
- ✅ **Contact** - Contact form with validation and location map
- ✅ **Authentication** - Login, Signup, Google Sign-In, Forgot Password, OTP
- ✅ **User Dashboard** - Orders, Profile, Payment Methods, Chat, Settings
- ✅ **Admin Dashboard** - Full management panel (10+ pages)
- ✅ **Admin Login** - Secure admin authentication with role verification
- ✅ **Notifications** - User notification center

### Technical Features
- **Next.js 16** - Latest App Router with server/client components
- **Express.js 5** - Backend API with MongoDB Atlas
- **TypeScript** - Type-safe code throughout
- **Tailwind CSS v4** - Modern utility-first styling
- **Zustand** - State management with localStorage persistence
- **Firebase Auth** - Google Sign-In with profile picture
- **JWT Authentication** - Secure token-based auth (24h expiry)
- **Mongoose 9** - MongoDB ODM with schema validation
- **Axios** - HTTP client with interceptors for auth tokens
- **Role-Based Protection** - Admin routes require admin role verification

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── about/               # About us page
│   ├── blog/                # Blog listing page
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout process
│   ├── contact/             # Contact page
│   ├── create-password/     # Password creation
│   ├── forgot-password/     # Password recovery
│   ├── login/               # Login page
│   ├── otp/                 # OTP verification
│   ├── payment/             # Payment page
│   ├── services/            # Services pages
│   │   ├── [slug]/         # Dynamic service detail pages
│   │   └── page.tsx        # Services listing
│   ├── signup/              # Registration page
│   ├── success/             # Success page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── common/             # Shared components
│   ├── layout/             # Layout components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Site footer
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Features.tsx
│   │   ├── About.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── ...
│   └── ui/                 # UI components
├── data/                    # Static data
│   └── index.ts            # Services, FAQs, testimonials
├── types/                   # TypeScript types
│   └── index.ts            # Type definitions
├── hooks/                   # Custom React hooks
│   └── useScrollAnimation.ts
└── styles/                  # Additional styles
```

## 🚀 Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- MongoDB (Atlas or local)

### Backend Setup

```bash
cd Laundry-Service-Booking-App-Backend
npm install

# Create .env file (see .env.example)
# Required: PORT, MONGODB_URI, JWT_SECRET

# Seed database with sample data
node src/seed.js

# Start backend server (port 3000)
node src/index.js
```

### Frontend Setup

```bash
cd Laundry-Service-Booking-App-Frontend
npm install
npm run dev
# Opens on http://localhost:3001
```

### Quick Access
| URL | Description |
|-----|-------------|
| `http://localhost:3001` | Main App |
| `http://localhost:3001/admin/login` | Admin Panel |
| `http://localhost:3001/login` | User Login |
| `http://localhost:3000/api/v1` | Backend API |

For detailed installation steps, see [INSTALLATION.md](INSTALLATION.md)

## 🛠️ Configuration

### Environment Variables (Optional)
Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Customization

For comprehensive customization guide, see [CUSTOMIZATION.md](CUSTOMIZATION.md)

#### Quick Customization Tips:
- **Brand Colors**: Update `#0F2744` and `#0F7BA0` throughout the codebase
- **Services**: Edit `src/data/index.ts`
- **Images**: Replace files in `public/Images/`
- **Company Info**: Update in Footer and Contact pages

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth scroll animations
- Hover effects and transitions
- Glass morphism effects
- Shadow and blur effects
- Responsive typography
- Mobile-first approach

## 🔧 Build for Production

```bash
npm run build
npm run start
```

This will create an optimized production build in the `.next` folder.

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Digital Ocean
- Any Node.js hosting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Key Components Documentation

### Dynamic Service Routes
Services use dynamic routing with `[slug]` pattern:
- Each service has a unique slug (e.g., "wash-fold")
- Items are dynamically loaded based on service
- Add new services by updating `src/data/index.ts`

### Cart System
- Checkbox selection for items
- Quantity adjustment
- Price calculation with delivery and discount
- Local storage persistence

### Form Validation
All forms include:
- Required field validation
- Email format validation
- Phone number validation
- Real-time error display

## 🔐 Security Notes

- All forms use client-side validation
- Sensitive operations should be moved to API routes
- Add authentication middleware for protected routes
- Implement rate limiting for forms
- Use environment variables for sensitive data

## 📞 Support

For support and customization requests, please contact through CodeCanyon.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

- Next.js Team
- Tailwind CSS
- React Icons
- Unsplash (for demo images)

## 📈 Completed Features (Previously Planned)

All major features have been implemented:
- ✅ Backend API integration
- ✅ User authentication with JWT
- ✅ Google Sign-In with profile pictures
- ✅ Payment gateway integration (Stripe, PayPal, SSLCommerz)
- ✅ Admin dashboard with full management
- ✅ Order tracking system
- ✅ Role-based access control
- ✅ Database seeding with sample data

## 🔄 Version History

### Version 2.0.0 (February 2026)
- Full-stack integration with Express.js 5 backend
- Admin dashboard with 10+ management pages
- Google Sign-In with profile picture display
- Real API authentication with role-based access
- Stripe/PayPal/SSLCommerz payment integration
- Zustand state management with persistence
- Database seeding (8 services, 6 coupons, 6 orders, 3 reviews)
- All service images hosted via Unsplash CDN
- Tailwind CSS v4 migration
- User dashboard with orders, profile, settings

### Version 1.0.0 (January 2026)
- Initial release
- All core features implemented
- Full responsive design
- Blog, About, Contact pages
- Complete booking flow

---

**Made with ❤️ by NaasMind**
