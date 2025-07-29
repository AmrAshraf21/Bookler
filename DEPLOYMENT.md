# Deployment Guide - React Booking App (Free Hosting)

This guide will help you deploy your React booking app with JSON server to completely free hosting platforms (no credit card required).

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository

## Deployment Options (All Free - No Credit Card Required)

### Option 1: Railway (Recommended)

**Railway** offers a generous free tier with no credit card required.

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account (no credit card needed)

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

**Free Tier Limits**: 500 hours/month, 1GB RAM, shared CPU

### Option 2: Cyclic

**Cyclic** provides free hosting for full-stack applications.

1. **Sign up for Cyclic**
   - Go to [cyclic.sh](https://cyclic.sh)
   - Sign up with your GitHub account

2. **Deploy from GitHub**
   - Click "Link Your Own"
   - Select your repository
   - Cyclic will auto-detect the Node.js app

3. **Configure**
   - Set the main branch
   - Add environment variable: `NODE_ENV=production`

4. **Deploy**
   - Cyclic will build and deploy
   - URL format: `https://your-app-name.cyclic.app`

**Free Tier Limits**: 1 app, 512MB RAM, shared CPU

### Option 3: Vercel (Frontend) + Supabase (Database)

**Split deployment**: Frontend on Vercel, database on Supabase.

#### Deploy Frontend to Vercel:

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Repository**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React app

3. **Configure**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Vercel will build and deploy
   - URL: `https://your-app-name.vercel.app`

#### Set up Supabase Database:

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose organization
   - Set database password

3. **Import Your Data**
   - Go to SQL Editor
   - Import your `db.json` data as SQL

4. **Update API Configuration**
   - Get your Supabase URL and API key
   - Update `interceptor.js` to use Supabase

**Free Tier Limits**: 
- Vercel: Unlimited deployments, 100GB bandwidth
- Supabase: 500MB database, 50MB file storage

### Option 4: Netlify (Frontend) + JSONBin (Database)

**Alternative split deployment**.

#### Deploy Frontend to Netlify:

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy from Git**
   - Click "New site from Git"
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Netlify will build and deploy
   - URL: `https://your-app-name.netlify.app`

#### Use JSONBin for Database:

1. **Create JSONBin Account**
   - Go to [jsonbin.io](https://jsonbin.io)
   - Sign up for free account

2. **Upload Your Data**
   - Create a new bin
   - Upload your `db.json` content
   - Get the bin URL and API key

3. **Update API Configuration**
   - Update `interceptor.js` to use JSONBin API

**Free Tier Limits**:
- Netlify: 100GB bandwidth, 300 build minutes
- JSONBin: 10,000 requests/month

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
- Railway/Cyclic: `https://your-app-name.railway.app/api/hotels`
- Vercel: `https://your-app-name.vercel.app/api/hotels`
- Netlify: `https://your-app-name.netlify.app/api/hotels`

## Important Notes

1. **No Credit Card Required**: All these options are completely free
2. **Data Persistence**: 
   - Railway/Cyclic: Data persists between deployments
   - Supabase: Permanent database
   - JSONBin: Permanent storage
3. **Environment Variables**: Set `NODE_ENV=production` in your hosting platform
4. **CORS Issues**: The current setup handles CORS by serving both frontend and API from the same domain

## Troubleshooting

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **API Not Working**: Verify the baseURL in `interceptor.js` is correct
3. **App Not Loading**: Check the build logs in your hosting platform
4. **Deployment Issues**: Check the deployment logs in your hosting platform

## Recommendation

**For your use case, I recommend Railway** because:
- ✅ No credit card required
- ✅ Simple deployment process
- ✅ Good free tier limits
- ✅ Handles both frontend and API
- ✅ Data persistence
- ✅ Good documentation and support

## Next Steps

For a production app, consider:
1. Using a real database (PostgreSQL, MongoDB)
2. Adding authentication with JWT
3. Implementing proper error handling
4. Adding environment-specific configurations
