# Customization Guide

## 🎨 Branding & Colors

### Change Brand Colors

Edit `src/app/globals.css`:

```css
/* Primary Colors */
--color-primary: #0F2744;    /* Change this */
--color-secondary: #0F7BA0;  /* Change this */
```

Also update in components (find and replace):
- `#0F2744` → Your primary color
- `#0F7BA0` → Your secondary color

### Change Logo

Replace logo files in:
- `public/Images/logo/logo.png`
- Update Header and Footer components

---

## 📝 Content Customization

### Update Company Information

Edit `src/data/index.ts`:

```typescript
// Change company name, contact info
export const companyInfo = {
  name: 'Your Company Name',
  phone: 'Your Phone',
  email: 'your@email.com',
  address: 'Your Address',
}
```

### Add/Edit Services

In `src/data/index.ts`:

```typescript
export const services: Service[] = [
  {
    id: 1,
    title: 'Your Service Name',
    slug: 'your-service-slug',
    description: 'Your description',
    price: '$10',
    priceRange: '$5 to $20',
    duration: '1-2 days',
    category: 'regular', // or 'special'
    icon: '/path/to/icon.png',
    items: [
      { id: 1, name: 'Item 1', price: 5, ... },
      // Add more items
    ],
  },
  // Add more services
];
```

### Update Service Items & Prices

Each service has an `items` array. Update:
- Item names
- Prices
- Descriptions
- Images

---

## 🖼️ Images & Media

### Replace Images

1. **Service Images**: `public/Images/Home/service/`
2. **Hero Images**: Update URLs in components
3. **Icons**: `public/Images/logo/`

### Using Local Images

```typescript
// In components
import Image from 'next/image';

<Image 
  src="/Images/your-image.png"
  alt="Description"
  width={500}
  height={300}
/>
```

### Using External URLs
Just change the URL in the component.

---

## 📱 Contact Information

### Update Footer

Edit `src/components/layout/Footer.tsx`:

```typescript
const contactInfo = {
  phone: '+1 (234) 567-8900',
  email: 'contact@yourcompany.com',
  address: 'Your Address',
};
```

### Update Contact Page

Edit `src/app/contact/page.tsx`:

- Update phone numbers
- Update addresses
- Update map embed code
- Update business hours

---

## 📄 Page Content

### Home Page Sections

Edit `src/app/page.tsx` to show/hide sections:

```typescript
<Hero />
<Services />
<Features />
<About />
<Testimonials />
<FAQ />
// Comment out sections you don't need
```

### Testimonials

Edit `src/data/index.ts`:

```typescript
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Customer Name',
    role: 'Customer Role',
    content: 'Review text here',
    rating: 5,
    image: 'https://...',
  },
  // Add more testimonials
];
```

### FAQ

Edit `src/data/index.ts`:

```typescript
export const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Your question?',
    answer: 'Your answer here',
  },
  // Add more FAQs
];
```

---

## 🛒 Cart & Pricing

### Delivery Cost

Edit `src/app/cart/page.tsx`:

```typescript
const deliveryCost = subtotal > 0 ? 5 : 0; // Change 5 to your cost
```

### Coupon Codes

Edit `src/app/cart/page.tsx`:

```typescript
const handleApplyCoupon = () => {
  if (couponCode.toUpperCase() === 'SAVE10') {
    setDiscount(10); // 10% discount
  } else if (couponCode.toUpperCase() === 'YOUR_CODE') {
    setDiscount(20); // Your custom discount
  }
  // Add more coupon codes
};
```

---

## 🎭 Styling & Design

### Fonts

Update in `src/app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
```

### Animations

Edit `src/app/globals.css`:

```css
@keyframes your-animation {
  /* Your animation */
}

.animate-your-animation {
  animation: your-animation 1s ease-in-out;
}
```

### Spacing & Layout

Update Tailwind classes in components:
- `container-custom` → Change max-width
- Padding/margin classes → Adjust spacing

---

## 🌐 Multi-Language Support

### Add Translation Files

Create `src/locales/en.json`, `src/locales/es.json`, etc.

### Use Translation Hook

```typescript
import { useTranslation } from 'next-i18next';

const { t } = useTranslation();
<h1>{t('welcome')}</h1>
```

---

## 🔧 Advanced Customization

### Add New Page

1. Create file: `src/app/your-page/page.tsx`
2. Add navigation link in Header
3. Create component and export default

### Add New Service Category

1. Update `src/types/index.ts`:
```typescript
category: 'regular' | 'special' | 'your-category'
```

2. Update filter in `src/app/services/page.tsx`

### Custom Checkout Fields

Edit `src/app/checkout/page.tsx`:

```typescript
const [formData, setFormData] = useState({
  // Add your custom fields
  customField: '',
});
```

---

## 📊 Analytics Integration

### Add Google Analytics

In `src/app/layout.tsx`:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## 🔐 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

Use in code:
```typescript
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
```

---

## 💡 Tips

1. **Test Changes**: Always run `npm run dev` to test
2. **Backup**: Keep backup before major changes
3. **Git**: Use version control for tracking changes
4. **Documentation**: Document your customizations

---

## 🆘 Need Help?

- Check documentation
- Review code comments
- Contact support with specific questions

**Happy Customizing! 🎉**
