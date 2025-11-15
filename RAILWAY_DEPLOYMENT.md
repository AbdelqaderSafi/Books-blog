# 🚂 دليل النشر على Railway - Backend & Frontend

## 📋 نظرة عامة

هذا الدليل يشرح كيفية نقل مشروع Strapi من Render إلى Railway، مع إضافة الفرونت إند على نفس الاستضافة.

---

## 🎯 الخطوة 1: إعداد المشروع للنشر على Railway

### 1.1 التأكد من وجود الملفات الضرورية

تأكد من وجود الملفات التالية في مشروعك:
- ✅ `railway.json` - تكوين Railway
- ✅ `nixpacks.toml` - تكوين البناء
- ✅ `.gitignore` - لتجاهل الملفات غير الضرورية

### 1.2 رفع التعديلات على GitHub

```bash
# إضافة جميع الملفات
git add .

# حفظ التغييرات
git commit -m "Configure for Railway deployment"

# رفع على GitHub
git push origin main
```

---

## 🗄️ الخطوة 2: إنشاء قاعدة بيانات PostgreSQL على Railway

### 2.1 إنشاء حساب على Railway
1. اذهب إلى: https://railway.app
2. سجل دخول باستخدام GitHub

### 2.2 إنشاء مشروع جديد
1. اضغط على **"New Project"**
2. اختر **"Provision PostgreSQL"**
3. ستظهر قاعدة بيانات جديدة تلقائياً

### 2.3 الحصول على بيانات الاتصال
1. افتح قاعدة البيانات PostgreSQL
2. اذهب إلى تبويب **"Variables"**
3. انسخ القيم التالية:
   - `DATABASE_URL` (أو `DATABASE_PRIVATE_URL` للاتصال الداخلي)
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

---

## 🚀 الخطوة 3: نشر الـ Backend (Strapi)

### 3.1 إضافة Backend Service
1. في نفس المشروع، اضغط **"+ New"**
2. اختر **"GitHub Repo"**
3. اختر مستودع `Books-blog`
4. Railway سيكتشف أنه مشروع Node.js تلقائياً

### 3.2 تكوين متغيرات البيئة للـ Backend

اذهب إلى تبويب **"Variables"** وأضف المتغيرات التالية:

#### متغيرات Strapi الأساسية:
```env
NODE_ENV=production
NODE_VERSION=20.18.0
HOST=0.0.0.0
PORT=1337
```

#### مفاتيح التطبيق (APP_KEYS):
قم بتوليد 4 مفاتيح عشوائية بطول 32 حرف:
```env
APP_KEYS=key1,key2,key3,key4
```

لتوليد المفاتيح، استخدم:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```
كرر الأمر 4 مرات وافصل المفاتيح بفواصل.

#### متغيرات قاعدة البيانات:
```env
DATABASE_CLIENT=postgres
DATABASE_URL=${DATABASE_URL}
DATABASE_HOST=${PGHOST}
DATABASE_PORT=${PGPORT}
DATABASE_NAME=${PGDATABASE}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}
DATABASE_SSL=false
```

💡 **ملاحظة**: Railway يربط المتغيرات تلقائياً بين الخدمات، استخدم `${VARIABLE_NAME}` للإشارة إلى متغيرات PostgreSQL.

#### متغيرات JWT:
```env
JWT_SECRET=your-jwt-secret-here-min-32-chars
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

#### متغيرات اختيارية (ImageKit أو Upload):
```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 3.3 النشر
1. اضغط **"Deploy"** - سيبدأ النشر تلقائياً
2. انتظر حتى يكتمل البناء (Build Logs)
3. بعد النجاح، ستحصل على رابط مثل: `https://your-app.up.railway.app`

### 3.4 تفعيل الـ Domain
1. اذهب إلى تبويب **"Settings"**
2. في **"Networking"** → **"Public Networking"**
3. اضغط **"Generate Domain"** للحصول على رابط عام

---

## 🎨 الخطوة 4: إعداد ونشر الفرونت إند

### 4.1 هيكل مشروع الفرونت إند

إذا كان لديك مشروع فرونت إند منفصل (React, Next.js, Vue, etc.):

#### البنية المقترحة:
```
Books-blog/
├── backend/              # مشروع Strapi الحالي
│   ├── package.json
│   ├── config/
│   └── src/
└── frontend/             # مشروع الفرونت إند الجديد
    ├── package.json
    ├── src/
    └── public/
```

### 4.2 إنشاء مشروع Frontend (إذا لم يكن موجوداً)

#### Next.js (موصى به):
```bash
npx create-next-app@latest frontend
cd frontend
```

#### React + Vite:
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

#### Vue:
```bash
npm create vue@latest frontend
cd frontend
npm install
```

### 4.3 تكوين الاتصال بـ API

في مشروع الفرونت إند، أنشئ ملف `.env`:

**Next.js:**
```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
NEXT_PUBLIC_STRAPI_URL=https://your-backend.up.railway.app
```

**React/Vite:**
```env
VITE_API_URL=https://your-backend.up.railway.app/api
VITE_STRAPI_URL=https://your-backend.up.railway.app
```

### 4.4 نشر الفرونت إند على Railway

#### الطريقة 1: Monorepo (مستودع واحد)
1. ارفع كلا المشروعين على نفس المستودع
2. في Railway، أضف خدمة جديدة **"+ New"** → **"GitHub Repo"**
3. اختر نفس المستودع
4. في **Settings** → **Root Directory**، حدد `frontend`
5. أضف متغيرات البيئة للفرونت

#### الطريقة 2: مستودعات منفصلة
1. ارفع مشروع الفرونت على مستودع منفصل
2. في نفس مشروع Railway، أضف خدمة جديدة
3. اختر مستودع الفرونت إند
4. أضف متغيرات البيئة

### 4.5 تكوين Build للفرونت إند

أضف في `package.json` الخاص بالفرونت:

**Next.js:**
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

**React/Vite:**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview --port $PORT --host 0.0.0.0"
  }
}
```

أنشئ ملف `railway.json` في مجلد الفرونت:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start"
  }
}
```

---

## 🔗 الخطوة 5: ربط الخدمات

### 5.1 في Backend (Strapi)
تأكد من تكوين CORS في `config/middlewares.ts`:

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'ik.imagekit.io',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'ik.imagekit.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://your-frontend.up.railway.app',
        'http://localhost:3000',
        'http://localhost:5173',
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 5.2 في Frontend
استخدم متغير البيئة للاتصال بالـ API:

```javascript
// Next.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// React/Vite
const API_URL = import.meta.env.VITE_API_URL;

// مثال على الاستخدام
fetch(`${API_URL}/blogs`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📊 الخطوة 6: المراقبة والصيانة

### 6.1 مراقبة الخدمات
- **Logs**: تابع السجلات من تبويب "Deployments" → "View Logs"
- **Metrics**: تابع استخدام الموارد من تبويب "Metrics"

### 6.2 إعداد النطاق المخصص (اختياري)
1. في كل خدمة، اذهب إلى **Settings** → **Networking**
2. اضغط **"Custom Domain"**
3. أضف نطاقك (مثل: `api.yourdomain.com` للـ backend)
4. أضف السجلات في مزود DNS الخاص بك

### 6.3 إعداد المتغيرات المشتركة
يمكنك إنشاء **Shared Variables** على مستوى المشروع:
1. اذهب إلى إعدادات المشروع
2. في تبويب **"Shared Variables"**
3. أضف المتغيرات التي تريد مشاركتها بين الخدمات

---

## 🔐 الخطوة 7: الأمان

### 7.1 متغيرات سرية
- لا تشارك `JWT_SECRET` أو `API_TOKEN_SALT` أبداً
- استخدم مفاتيح قوية ومعقدة
- غير المفاتيح الافتراضية فوراً

### 7.2 HTTPS
- Railway يوفر HTTPS تلقائياً لجميع النطاقات
- تأكد من استخدام HTTPS في جميع الطلبات

### 7.3 Rate Limiting
أضف middleware للحد من الطلبات في Strapi إذا لزم الأمر.

---

## 📝 الخطوة 8: النسخ الاحتياطي

### 8.1 قاعدة البيانات
قم بعمل backup دوري:
```bash
# من لوحة Railway، في PostgreSQL service
# اذهب إلى Data → Backup
```

### 8.2 الملفات المرفوعة
إذا كنت تستخدم ImageKit أو S3، فالملفات آمنة.
إذا كنت تستخدم local storage، استخدم خدمة تخزين خارجية.

---

## ✅ قائمة التحقق النهائية

### Backend:
- [ ] قاعدة بيانات PostgreSQL تعمل
- [ ] جميع متغيرات البيئة مضبوطة
- [ ] APP_KEYS موجودة (4 مفاتيح)
- [ ] JWT_SECRET و API_TOKEN_SALT مضبوطة
- [ ] DATABASE_URL متصل بقاعدة البيانات
- [ ] البناء ينجح (Build Successful)
- [ ] الخدمة تعمل (Deployment Active)
- [ ] يمكن الوصول إلى `/api` و `/admin`

### Frontend:
- [ ] متغيرات API_URL مضبوطة
- [ ] Build ينجح
- [ ] الاتصال بالـ API يعمل
- [ ] الصور تظهر بشكل صحيح
- [ ] CORS مضبوط في Backend

### أمان:
- [ ] تم تغيير جميع المفاتيح الافتراضية
- [ ] HTTPS يعمل على كلا الخدمتين
- [ ] CORS محدد بالنطاقات الصحيحة فقط

---

## 🆘 حل المشاكل الشائعة

### المشكلة 1: فشل البناء (Build Failed)
**الحل:**
- تحقق من `package.json` - تأكد من وجود `build` script
- تحقق من إصدار Node.js في `engines`
- راجع Build Logs لمعرفة الخطأ

### المشكلة 2: Database Connection Error
**الحل:**
- تأكد من `DATABASE_URL` صحيح
- تأكد من `DATABASE_CLIENT=postgres`
- تحقق من أن PostgreSQL service يعمل

### المشكلة 3: CORS Error في Frontend
**الحل:**
- أضف رابط Frontend في `config/middlewares.ts`
- أعد نشر Backend
- تأكد من استخدام الرابط الصحيح

### المشكلة 4: Port Already in Use
**الحل:**
- Railway يحدد PORT تلقائياً
- تأكد من استخدام `process.env.PORT` في التطبيق
- لا تحدد port ثابت

### المشكلة 5: Static Files Not Found (Frontend)
**الحل:**
- تأكد من `build` script صحيح
- تأكد من `start` script يخدم الملفات المبنية
- في Next.js، استخدم `next start`
- في Vite/React، استخدم serve أو vite preview

---

## 🎓 موارد إضافية

- [Railway Documentation](https://docs.railway.app)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Discord](https://discord.gg/railway) - للدعم الفني

---

## 💰 التسعير

### Railway Free Plan:
- $5 رصيد مجاني شهرياً
- تُستهلك حسب الاستخدام
- مناسب للتطوير والمشاريع الصغيرة

### Hobby Plan ($5/month):
- $5 رصيد شهري + $5 إضافية
- مناسب للمشاريع المتوسطة

### Pro Plan ($20/month):
- $20 رصيد شهري + دعم أولوية
- للمشاريع الإنتاجية

---

## 📧 الدعم

إذا واجهت أي مشاكل:
1. راجع Logs في Railway
2. تحقق من المتغيرات
3. اطلب المساعدة في Discord
4. راجع هذا الدليل مرة أخرى

---

**تم بنجاح! 🎉**
مشروعك الآن يعمل على Railway مع Backend و Frontend.
