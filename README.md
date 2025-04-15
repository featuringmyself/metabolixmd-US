# MetabolixMD Frontend

Next.js-based frontend application for MetabolixMD healthcare platform, providing a modern and responsive user interface for patients and healthcare providers.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Next.js pages and routes
├── services/       # API and external service integrations
├── styles/         # Global styles and CSS modules
└── utils/          # Utility functions and helpers
```

## Features

- User Authentication with Firebase
- Protected Routes and Role-based Access
- Responsive Design with Tailwind CSS
- Dynamic Form Handling
- Real-time Updates
- Cart Management
- Payment Integration

## Authentication

The application uses Firebase Authentication with the following features:
- Email/Password Authentication
- Token Management
- Protected Routes
- Role-based Access Control

## Components

### Authentication Components
- `AuthContext` - Manages authentication state
- `AuthModalContext` - Handles authentication modal UI
- `FirebaseAuthForm` - Authentication form component

### Admin Components
- Protected admin routes
- User management interface
- Dashboard components

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Create a `.env.local` file
   - Add required Firebase and API configurations

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Build production: `npm run build`
- Start production: `npm start`
- Run linter: `npm run lint`

## State Management

The application uses React Context for state management:
- Authentication state
- User session
- Cart state
- UI state

## Styling

- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles
- Responsive design patterns

## API Integration

- RESTful API consumption
- Axios for HTTP requests
- Error handling
- Request/response interceptors

## Performance Optimization

- Image optimization
- Code splitting
- Dynamic imports
- Caching strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
