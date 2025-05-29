const fs = require('fs');
const path = './.env.local';

const mode = process.argv[2]; // 'up' or 'down'
const flag = mode === 'down' ? 'true' : 'false';

let envContent = '';

if (fs.existsSync(path)) {
  envContent = fs.readFileSync(path, 'utf8');
}

if (envContent.includes('NEXT_PUBLIC_MAINTENANCE_MODE=')) {
  envContent = envContent.replace(/NEXT_PUBLIC_MAINTENANCE_MODE=.*/g, `NEXT_PUBLIC_MAINTENANCE_MODE=${flag}`);
} else {
  envContent += `\nNEXT_PUBLIC_MAINTENANCE_MODE=${flag}`;
}

fs.writeFileSync(path, envContent.trim() + '\n');
console.log(`Site is under maintaince ${flag}`);
