# Next.js SaaS Starter Template

A modern, full-stack SaaS boilerplate built with Next.js 15, TypeScript, and Tailwind CSS. This template provides a solid foundation for building subscription-based web applications.

## Features

### 🔐 Authentication
- Email/password authentication with Supabase
- Social login UI (Google, GitHub)
- Password reset and email verification flows
- Protected routes and middleware

### 💳 Payments
- Stripe integration with webhook handling
- Subscription management
- Customer portal integration
- Payment processing with proper error handling

### 🎨 UI/UX
- Beautiful, responsive design with Tailwind CSS
- Dark mode support
- Modern component library (shadcn/ui)
- Mobile-first approach

### 📊 Dashboard
- User dashboard with analytics
- Subscription status tracking
- Settings and profile management
- Real-time data integration ready

### 🛡️ Security
- Row-level security (RLS) with Supabase
- Input validation and sanitization
- Protected API routes
- CORS and security headers

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-saas-starter.git
cd nextjs-saas-starter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database:
```bash
# Run the SQL in your Supabase dashboard
psql -f scripts/create-tables.sql
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
app/
├── api/                  # API routes
│   ├── create-checkout-session/
│   └── stripe/webhook/
├── auth/                 # Authentication pages
├── dashboard/            # User dashboard
├── settings/             # User settings
└── globals.css

components/
├── ui/                   # shadcn/ui components
├── analytics.tsx         # Analytics integration
├── cta.tsx              # Call-to-action components
├── faq.tsx              # FAQ section
└── testimonials.tsx     # Testimonials section

lib/
├── auth.ts              # Authentication helpers
├── stripe.ts            # Stripe configuration
├── supabase.ts          # Database client
└── utils.ts             # Utility functions

scripts/
└── create-tables.sql    # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

### Database Setup

1. Create a new Supabase project
2. Run the SQL script in `scripts/create-tables.sql`
3. Configure your environment variables

### Stripe Setup

1. Create a Stripe account and get your API keys
2. Set up webhook endpoints in your Stripe dashboard
3. Configure products and pricing in Stripe
4. Update your environment variables

### Authentication

The template includes both mock authentication (for development) and real Supabase authentication. Switch between them in `lib/auth.ts`.

## Development Notes

- Currently uses mock authentication for demo purposes
- Real Supabase integration is available but not active by default
- Stripe integration is production-ready
- Dashboard shows sample data - connect your real data sources

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
docker build -t nextjs-saas-starter .
docker run -p 3000:3000 nextjs-saas-starter
```

## What's Included

- ✅ Authentication UI and flow
- ✅ Stripe payment integration
- ✅ Dashboard with sample data
- ✅ Responsive design
- ✅ Database schema
- ✅ TypeScript throughout
- ✅ Tailwind CSS styling
- ✅ shadcn/ui components

## What's Missing (To Do)

- [ ] Real authentication integration (switch from mock to Supabase)
- [ ] Email system implementation
- [ ] Real analytics and metrics
- [ ] Testing suite
- [ ] CI/CD pipeline
- [ ] User management features
- [ ] Subscription management UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
