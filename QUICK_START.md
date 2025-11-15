# ⚡ دليل النشر السريع على Railway

## 🎯 الخطوات السريعة (5 دقائق)

### 1️⃣ توليد المفاتيح السرية
```bash
node generate-keys.js
```
احتفظ بالمفاتيح المولدة، ستحتاجها في الخطوة 4.

---

### 2️⃣ رفع الكود على GitHub
```bash
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

---

### 3️⃣ إنشاء المشروع على Railway

1. **سجل دخول**: https://railway.app
2. **New Project** → **Provision PostgreSQL**
3. في نفس المشروع: **+ New** → **GitHub Repo** → اختر `Books-blog`

---

### 4️⃣ إضافة المتغيرات (Backend Service)

في تبويب **Variables** للـ Backend service، أضف:

#### نسخ سريع (استبدل المفاتيح):
```env
NODE_ENV=production
NODE_VERSION=20.18.0
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_URL=${DATABASE_URL}
DATABASE_HOST=${PGHOST}
DATABASE_PORT=${PGPORT}
DATABASE_NAME=${PGDATABASE}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}
DATABASE_SSL=false
```

أضف المفاتيح من الخطوة 1:
```env
APP_KEYS=المفاتيح_المولدة_من_generate-keys
JWT_SECRET=المفتاح_المولد
API_TOKEN_SALT=المفتاح_المولد
ADMIN_JWT_SECRET=المفتاح_المولد
TRANSFER_TOKEN_SALT=المفتاح_المولد
```

---

### 5️⃣ انتظر النشر
- راقب **Deployments** → **View Logs**
- عند النجاح، ستظهر: ✅ **Deployment Successful**

---

### 6️⃣ احصل على الرابط
- **Settings** → **Networking** → **Generate Domain**
- انسخ الرابط: `https://your-app.up.railway.app`

---

### 7️⃣ اختبر API
افتح في المتصفح:
```
https://your-app.up.railway.app/api
https://your-app.up.railway.app/admin
```

---

## 🎨 إضافة الفرونت إند

### الطريقة 1: مشروع منفصل

#### إذا كان لديك مشروع فرونت جاهز:
1. ارفع الفرونت على GitHub (مستودع منفصل أو في نفس المستودع)
2. في Railway: **+ New** → **GitHub Repo**
3. اختر مشروع الفرونت
4. أضف متغير البيئة:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
   # أو
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```

### الطريقة 2: إنشاء فرونت جديد

#### Next.js (موصى به):
```bash
# في جذر المشروع
npx create-next-app@latest frontend
cd frontend

# أنشئ .env.local
echo "NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api" > .env.local

# اختبر محلياً
npm run dev
```

#### أضف railway.json في مجلد frontend:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start"
  }
}
```

#### ارفع وانشر:
```bash
cd ..
git add .
git commit -m "Add frontend"
git push

# في Railway: + New → GitHub Repo
# Settings → Root Directory: frontend
# Variables → أضف NEXT_PUBLIC_API_URL
```

---

## 🔗 ربط Frontend بـ Backend

### تحديث CORS في Backend

عدّل `config/middlewares.ts`:
```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://your-frontend.up.railway.app',  // أضف رابط Frontend
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  },
},
```

```bash
git add config/middlewares.ts
git commit -m "Update CORS for frontend"
git push
```

Railway سيعيد النشر تلقائياً.

---

## ✅ قائمة التحقق

- [ ] Backend يعمل: `https://your-backend.up.railway.app/api`
- [ ] Admin يعمل: `https://your-backend.up.railway.app/admin`
- [ ] PostgreSQL متصل (لا أخطاء في Logs)
- [ ] Frontend يعمل: `https://your-frontend.up.railway.app`
- [ ] Frontend يتصل بـ API بنجاح
- [ ] CORS مضبوط

---

## 🆘 مشاكل شائعة

### ❌ Build Failed
```bash
# تحقق من package.json
# تأكد من وجود "build": "strapi build"
```

### ❌ Database Connection Error
```bash
# تأكد من المتغيرات:
DATABASE_CLIENT=postgres
DATABASE_URL=${DATABASE_URL}
```

### ❌ CORS Error
```bash
# أضف رابط Frontend في config/middlewares.ts
# أعد النشر
```

### ❌ 404 Not Found
```bash
# تأكد من Generate Domain في Settings → Networking
```

---

## 🎓 الدليل الكامل

راجع `RAILWAY_DEPLOYMENT.md` للتفاصيل الكاملة.

---

## 💡 نصائح

1. **استخدم Railway CLI** للنشر السريع:
   ```bash
   npm i -g @railway/cli
   railway login
   railway up
   ```

2. **راقب الاستخدام**: Railway → Project → Usage
3. **Logs مهمة**: دائماً راجع Logs عند حدوث مشاكل
4. **Environment Variables**: يمكن تعديلها بدون إعادة Build

---

**🎉 مبروك! مشروعك الآن على Railway**
