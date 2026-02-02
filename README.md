# CleanPress - Professional Laundry Service Booking App

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, fully responsive laundry service booking application built with Next.js 15, TypeScript, and Tailwind CSS. Perfect for laundry businesses, dry cleaners, and garment care service providers.

## 🌟 Key Features

### Core Functionality
- **Dynamic Service Management** - Multiple service categories (Wash & Fold, Pressing, Dry Cleaning, Hand Wash, etc.)
- **Smart Cart System** - Add/remove items, adjust quantities, apply coupon codes
- **Service Filtering** - Toggle between Regular and Special services
- **Responsive Design** - Works flawlessly on all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with smooth animations

### Pages Included
- ✅ **Home** - Landing page with hero, services, features, testimonials
- ✅ **Services** - Dynamic service listing with category filtering
- ✅ **Service Details** - Individual service pages with item selection
- ✅ **Cart** - Shopping cart with checkbox selection and price calculation
- ✅ **Checkout** - Complete checkout flow with billing/shipping info
- ✅ **Payment** - Payment processing page
- ✅ **Blog** - Blog listing with categories and search
- ✅ **About Us** - Company information and team showcase
- ✅ **Contact** - Contact form with validation and location map
- ✅ **Authentication** - Login, Signup, Forgot Password, OTP, Create Password
- ✅ **Success** - Order success confirmation page

### Technical Features
- **Next.js 15** - Latest features and optimizations
- **TypeScript** - Type-safe code for better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **Client-Side Rendering** - Fast and interactive user experience
- **Local Storage** - Persistent cart and order data
- **Form Validation** - Input validation with error messages
- **SEO Optimized** - Meta tags and semantic HTML

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

### Setup Instructions

1. **Extract the files** to your desired location

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open browser** and navigate to `http://localhost:3000`

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

## 📈 Future Updates

Planned features:
- Backend API integration
- User authentication with JWT
- Payment gateway integration
- Admin dashboard
- Order tracking system
- Email notifications
- Multi-language support

## 🔄 Version History

### Version 1.0.0 (January 2026)
- Initial release
- All core features implemented
- Full responsive design
- Blog, About, Contact pages
- Complete booking flow

---

**Made with ❤️ for CodeCanyon**

For queries or customization requests, please contact us through CodeCanyon.
