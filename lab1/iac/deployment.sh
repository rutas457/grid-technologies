#!/bin/bash

ssh -i lab1_vm_keypair.pem ec2-user@ec2-16-170-241-103.eu-north-1.compute.amazonaws.com << 'ENDSSH'

# Check for Node.js and install if not exists
if ! type "node" > /dev/null; then
   echo "Node.js not found. Installing..."
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo yum install -y nodejs
fi

# Check for npm and install if not exists
if ! type "npm" > /dev/null; then
   echo "npm not found. Installing..."
   sudo yum install -y npm
fi

# Deployment steps
# Navigate to the backend directory
cd /app/backend

# Pull latest code
git pull origin main

# Install backend dependencies
npm install

# Navigate to the frontend directory
cd /app/frontend

# Pull latest frontend code
git pull origin main

# Build the React app
npm install
npm run build

# Start the backend server
cd /app/backend
npm start &

ENDSSH
