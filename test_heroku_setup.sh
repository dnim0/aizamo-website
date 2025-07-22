#!/bin/bash

# Test script for Heroku-ready AIzamo website

echo "🚀 Testing Heroku-ready AIzamo website setup..."
echo ""

# Check if all required files exist
echo "📁 Checking required files..."
files=("main.py" "Procfile" "requirements.txt" "package.json" "runtime.txt" "gohighlevel.py")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""

# Check if frontend directory exists
if [ -d "frontend" ]; then
    echo "✅ frontend directory exists"
    if [ -f "frontend/package.json" ]; then
        echo "✅ frontend/package.json exists"
    else
        echo "❌ frontend/package.json missing"
    fi
else
    echo "❌ frontend directory missing"
fi

echo ""

# Check Python dependencies
echo "🐍 Checking Python setup..."
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 installed"
    if pip3 show fastapi &> /dev/null; then
        echo "✅ FastAPI installed"
    else
        echo "⚠️  FastAPI not installed - run: pip install -r requirements.txt"
    fi
else
    echo "❌ Python 3 not found"
fi

echo ""

# Check Node.js dependencies
echo "📦 Checking Node.js setup..."
if command -v node &> /dev/null; then
    echo "✅ Node.js installed ($(node --version))"
    if [ -d "frontend/node_modules" ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "⚠️  Frontend dependencies not installed - run: cd frontend && npm install"
    fi
else
    echo "❌ Node.js not found"
fi

echo ""

# Display next steps
echo "🔧 Next Steps:"
echo "1. Install dependencies: pip install -r requirements.txt"
echo "2. Build frontend: cd frontend && npm install && npm run build"
echo "3. Test locally: python main.py"
echo "4. Push to GitHub: git add . && git commit -m 'Heroku ready' && git push"
echo "5. Deploy to Heroku following HEROKU_DEPLOYMENT_GUIDE.md"

echo ""
echo "🎉 Repository is restructured for Heroku deployment!"
echo "📖 Read HEROKU_DEPLOYMENT_GUIDE.md for detailed deployment instructions"