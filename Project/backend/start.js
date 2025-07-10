#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting School Attachment System Backend...\n');

// Check if .env file exists
const envPath = path.join(__dirname, 'src', 'config', '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database Configuration
DB_USER=postgres
DB_HOST=127.0.0.1
DB_NAME=attachment_db
DB_PASSWORD=Bdan@112233
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=4h

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8080
`;

  // Create config directory if it doesn't exist
  const configDir = path.dirname(envPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Check if package.json has the correct scripts
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (!packageJson.scripts.dev) {
    console.log('📝 Updating package.json scripts...');
    packageJson.scripts = {
      ...packageJson.scripts,
      "dev": "nodemon src/server.js",
      "start": "node src/server.js"
    };
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json updated successfully!');
  }
}

console.log('\n🎯 Backend setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure PostgreSQL is running');
console.log('2. Create a database named "attachment_db"');
console.log('3. Run the database schema (see README.md)');
console.log('4. Start the backend with: npm run dev');
console.log('5. Start the frontend with: cd ../IS/School-Attachment-System/project && npm run dev');
console.log('\n🌐 Backend will be available at: http://localhost:3000');
console.log('🔗 API endpoints will be available at: http://localhost:3000/api');
console.log('💚 Health check: http://localhost:3000/api/health');

console.log('\n🚀 Starting the server...\n');

// Start the server
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.log('\n💡 Try running manually: npm run dev');
  process.exit(1);
} 