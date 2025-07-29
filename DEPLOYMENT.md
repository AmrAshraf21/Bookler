# Deployment Guide - React Booking App

This guide will help you deploy your React booking app with JSON server to Render (free hosting).

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository

## Deployment Steps

### Option 1: Deploy to Render (Recommended)

1. **Sign up for Render**

   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a new Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your booking app

3. **Configure the Web Service**

   - **Name**: `booking-app` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (if your app is in the root)

4. **Environment Variables**

   - Add environment variable:
     - Key: `NODE_ENV`
     - Value: `production`

5. **Deploy**

   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the deployment to complete (usually 5-10 minutes)

6. **Access Your App**
   - Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`
   - Your React app will be available at this URL
   - Your API will be available at `https://your-app-name.onrender.com/api`

### Option 2: Deploy to Railway

1. **Sign up for Railway**

   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy from GitHub**

   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect it's a Node.js app

3. **Configure Environment**

   - Add environment variable: `NODE_ENV=production`
   - Railway will automatically assign a port

4. **Deploy**
   - Railway will build and deploy automatically
   - You'll get a URL like: `https://your-app-name.railway.app`

### Option 3: Deploy to Vercel + Supabase

1. **Deploy Frontend to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app

2. **Set up Supabase for Database**

   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Import your `db.json` data to Supabase

3. **Update API Configuration**
   - Update your `interceptor.js` to use Supabase API instead of json-server

## Local Development

To run the app locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start json-server
npm run server
```

## API Endpoints

When deployed, your API will be available at:

- `https://your-app-name.onrender.com/api/hotels`
- `https://your-app-name.onrender.com/api/users`
- `https://your-app-name.onrender.com/api/bookings`

## Important Notes

1. **Free Tier Limitations**:

   - Render free tier has 750 hours/month
   - Railway free tier has usage limits
   - Vercel has generous free tier

2. **Data Persistence**:

   - JSON server data will reset when the server restarts
   - For production, consider using a real database like Supabase or MongoDB

3. **Environment Variables**:

   - Make sure `NODE_ENV=production` is set in your hosting platform

4. **CORS Issues**:
   - The current setup handles CORS by serving both frontend and API from the same domain

## Troubleshooting

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **API Not Working**: Verify the baseURL in `interceptor.js` is correct
3. **App Not Loading**: Check the build logs in your hosting platform

## Next Steps

For a production app, consider:

1. Using a real database (PostgreSQL, MongoDB)
2. Adding authentication with JWT
3. Implementing proper error handling
4. Adding environment-specific configurations
