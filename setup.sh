#!/bin/bash

echo "========================================"
echo "   MSADDI.EST Website Setup"
echo "========================================"
echo ""

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install dependencies"
    echo "Please check your internet connection and try again"
    exit 1
fi

echo ""
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""