// Script لتوليد المفاتيح السرية المطلوبة لـ Railway
// استخدم: node generate-keys.js

const crypto = require('crypto');

function generateKey(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

console.log('🔐 مفاتيح سرية لـ Railway Environment Variables:\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// APP_KEYS (4 مفاتيح)
console.log('📌 APP_KEYS (انسخ السطر كاملاً):');
const appKeys = [
  generateKey(16),
  generateKey(16),
  generateKey(16),
  generateKey(16)
].join(',');
console.log(`APP_KEYS=${appKeys}\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// JWT_SECRET
console.log('📌 JWT_SECRET:');
console.log(`JWT_SECRET=${generateKey(32)}\n`);

// API_TOKEN_SALT
console.log('📌 API_TOKEN_SALT:');
console.log(`API_TOKEN_SALT=${generateKey(16)}\n`);

// ADMIN_JWT_SECRET
console.log('📌 ADMIN_JWT_SECRET:');
console.log(`ADMIN_JWT_SECRET=${generateKey(32)}\n`);

// TRANSFER_TOKEN_SALT
console.log('📌 TRANSFER_TOKEN_SALT:');
console.log(`TRANSFER_TOKEN_SALT=${generateKey(16)}\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('✅ تم توليد جميع المفاتيح بنجاح!');
console.log('📋 انسخ هذه المتغيرات إلى Railway Variables\n');

console.log('⚠️  ملاحظات هامة:');
console.log('   - لا تشارك هذه المفاتيح مع أحد');
console.log('   - احتفظ بنسخة آمنة من هذه المفاتيح');
console.log('   - استخدم مفاتيح مختلفة للإنتاج والتطوير\n');
