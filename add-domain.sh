#!/bin/bash
# Script to add domain to Vercel
# Run this on your local machine

echo "Adding domains to Vercel..."

# Make sure you're logged in
vercel login

# Link to project
vercel link

# Add domains
echo "Adding www.msaddi.com..."
vercel domains add www.msaddi.com

echo "Adding msaddi.com..."
vercel domains add msaddi.com

echo "Done! Domains added successfully."
echo "Check status at: https://vercel.com/dashboard"
