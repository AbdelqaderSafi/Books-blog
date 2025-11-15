# ✅ Checklist: نقل المشروع من Render إلى Railway

## 📋 قبل البدء

- [ ] حساب على Railway (railway.app)
- [ ] حساب GitHub متصل بـ Railway
- [ ] كود Backend على GitHub
- [ ] معلومات قاعدة البيانات من Render (للنسخ الاحتياطي)

---

## 🎯 خطوات Backend

### 1. إعداد المشروع محلياً
- [ ] تأكد من وجود `railway.json`
- [ ] تأكد من وجود `nixpacks.toml`
- [ ] ولد المفاتيح: `node generate-keys.js`
- [ ] احتفظ بالمفاتيح في مكان آمن

### 2. رفع على GitHub
```bash
git add .
git commit -m "Configure for Railway"
git push origin main
```
- [ ] تم الرفع بنجاح

### 3. إنشاء المشروع على Railway
- [ ] سجل دخول: https://railway.app
- [ ] New Project
- [ ] Provision PostgreSQL
- [ ] انسخ `DATABASE_URL` من PostgreSQL Variables

### 4. إضافة Backend Service
- [ ] في نفس المشروع: + New → GitHub Repo
- [ ] اختر مستودع `Books-blog`
- [ ] انتظر اكتشاف المشروع

### 5. تكوين المتغيرات (Backend)
في تبويب Variables، أضف:

#### أساسيات:
- [ ] `NODE_ENV=production`
- [ ] `NODE_VERSION=20.18.0`
- [ ] `HOST=0.0.0.0`
- [ ] `PORT=1337`

#### قاعدة البيانات:
- [ ] `DATABASE_CLIENT=postgres`
- [ ] `DATABASE_URL=${DATABASE_URL}`
- [ ] `DATABASE_HOST=${PGHOST}`
- [ ] `DATABASE_PORT=${PGPORT}`
- [ ] `DATABASE_NAME=${PGDATABASE}`
- [ ] `DATABASE_USERNAME=${PGUSER}`
- [ ] `DATABASE_PASSWORD=${PGPASSWORD}`
- [ ] `DATABASE_SSL=false`

#### المفاتيح (من generate-keys.js):
- [ ] `APP_KEYS=key1,key2,key3,key4`
- [ ] `JWT_SECRET=...`
- [ ] `API_TOKEN_SALT=...`
- [ ] `ADMIN_JWT_SECRET=...`
- [ ] `TRANSFER_TOKEN_SALT=...`

#### اختياري (ImageKit):
- [ ] `IMAGEKIT_PUBLIC_KEY=...`
- [ ] `IMAGEKIT_PRIVATE_KEY=...`
- [ ] `IMAGEKIT_URL_ENDPOINT=...`

### 6. انتظر النشر
- [ ] راقب Deployments → View Logs
- [ ] تأكد من Build Successful
- [ ] تأكد من Deployment Active

### 7. تفعيل Domain
- [ ] Settings → Networking → Generate Domain
- [ ] انسخ الرابط: `https://_____.up.railway.app`

### 8. اختبار Backend
- [ ] افتح: `https://your-app.up.railway.app/api`
- [ ] افتح: `https://your-app.up.railway.app/admin`
- [ ] سجل دخول كـ Admin
- [ ] تأكد من البيانات موجودة (أو أنشئ محتوى جديد)

---

## 🎨 خطوات Frontend

### اختر الطريقة:

#### ✅ إذا كان لديك Frontend جاهز:

- [ ] ارفع Frontend على GitHub
- [ ] في Railway: + New → GitHub Repo
- [ ] اختر مستودع Frontend
- [ ] إذا كان في نفس المستودع: Settings → Root Directory → `frontend`

#### ✅ إنشاء Frontend جديد:

##### Next.js:
```bash
npx create-next-app@latest frontend
cd frontend
```
- [ ] تم إنشاء المشروع

##### React + Vite:
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```
- [ ] تم إنشاء المشروع

### تكوين Frontend:

#### 1. أنشئ `.env.local` (Next.js) أو `.env` (Vite):
```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
NEXT_PUBLIC_STRAPI_URL=https://your-backend.up.railway.app
```
أو
```env
VITE_API_URL=https://your-backend.up.railway.app/api
VITE_STRAPI_URL=https://your-backend.up.railway.app
```
- [ ] تم إنشاء ملف البيئة

#### 2. أنشئ `railway.json` في مجلد Frontend:
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
- [ ] تم إنشاء railway.json

#### 3. اختبر محلياً:
```bash
npm run dev
```
- [ ] Frontend يعمل محلياً
- [ ] الاتصال بـ API يعمل

#### 4. ارفع على GitHub:
```bash
git add .
git commit -m "Add frontend"
git push
```
- [ ] تم الرفع

#### 5. نشر على Railway:
- [ ] + New → GitHub Repo (أو نفس المستودع)
- [ ] إذا Monorepo: Settings → Root Directory → `frontend`
- [ ] أضف متغيرات البيئة في Variables
- [ ] انتظر النشر

#### 6. احصل على رابط Frontend:
- [ ] Settings → Networking → Generate Domain
- [ ] انسخ: `https://your-frontend.up.railway.app`

---

## 🔗 ربط Frontend بـ Backend

### تحديث CORS في Backend:

#### عدّل `config/middlewares.ts`:
```typescript
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
```
- [ ] تم تحديث CORS
- [ ] رفع التعديل على GitHub
- [ ] Railway أعاد نشر Backend تلقائياً

### اختبار الاتصال:
- [ ] افتح Frontend في المتصفح
- [ ] تأكد من ظهور البيانات من API
- [ ] تحقق من عدم وجود CORS errors في Console
- [ ] اختبر الصور (إذا كنت تستخدم ImageKit/Upload)

---

## 📊 نقل البيانات من Render

### الطريقة 1: Backup/Restore PostgreSQL

#### من Render:
```bash
# احصل على DATABASE_URL من Render
pg_dump $RENDER_DATABASE_URL > backup.sql
```
- [ ] تم تصدير البيانات

#### إلى Railway:
```bash
# احصل على DATABASE_URL من Railway Variables
psql $RAILWAY_DATABASE_URL < backup.sql
```
- [ ] تم استيراد البيانات

### الطريقة 2: Content Manager (يدوي)
- [ ] صدّر المحتوى من Render Admin
- [ ] استورد في Railway Admin

### الطريقة 3: API Migration (للمشاريع الكبيرة)
- [ ] استخدم script لنسخ البيانات عبر API

---

## 🔐 الأمان

- [ ] تم تغيير جميع المفاتيح من الافتراضية
- [ ] `APP_KEYS` فريدة (4 مفاتيح)
- [ ] `JWT_SECRET` قوي (32+ حرف)
- [ ] لم تشارك المفاتيح مع أحد
- [ ] `.env` موجود في `.gitignore`
- [ ] CORS محدد بالنطاقات الصحيحة فقط

---

## 🎯 اختبار نهائي

### Backend:
- [ ] `/api` يعمل ويرجع بيانات
- [ ] `/admin` يفتح لوحة التحكم
- [ ] تسجيل الدخول يعمل
- [ ] Content Types تظهر
- [ ] الصور تُرفع وتظهر
- [ ] PostgreSQL متصل (لا أخطاء)

### Frontend:
- [ ] الصفحة الرئيسية تفتح
- [ ] البيانات تُجلب من API
- [ ] الصور تظهر بشكل صحيح
- [ ] الروابط تعمل
- [ ] لا أخطاء في Console
- [ ] Mobile responsive

### الأداء:
- [ ] وقت التحميل مقبول (< 3 ثواني)
- [ ] لا تسريبات ذاكرة
- [ ] Logs نظيفة (لا أخطاء)

---

## 🎊 ما بعد النشر

### Monitoring:
- [ ] فعّل Notifications في Railway
- [ ] راقب Usage (Metrics)
- [ ] تابع Logs بانتظام

### النطاق المخصص (اختياري):
- [ ] اشتري نطاق (domain)
- [ ] في Railway: Settings → Networking → Custom Domain
- [ ] أضف DNS Records عند مزود النطاق
- [ ] انتظر propagation (24-48 ساعة)

### النسخ الاحتياطي:
- [ ] جدول backup لقاعدة البيانات
- [ ] احتفظ بنسخة من `.env` في مكان آمن
- [ ] احتفظ بالمفاتيح السرية

### التحسين:
- [ ] فعّل Caching إذا لزم
- [ ] استخدم CDN للصور (ImageKit)
- [ ] راقب استهلاك Railway credits

---

## 💰 التكاليف

### Railway Free Plan:
- [x] $5 رصيد مجاني/شهر
- [x] كافي للمشاريع الصغيرة
- [ ] راقب الاستهلاك: Project → Usage

### إذا تجاوزت الحد:
- [ ] فكّر في Hobby Plan ($5/month)
- [ ] أو Pro Plan ($20/month)
- [ ] أو حسّن الاستهلاك (قلل Requests/Resources)

---

## 🆘 استكشاف الأخطاء

### إذا فشل Build:
- [ ] راجع Build Logs
- [ ] تحقق من `package.json` scripts
- [ ] تأكد من `engines.node` صحيح
- [ ] راجع `railway.json` و `nixpacks.toml`

### إذا فشل Database:
- [ ] تحقق من `DATABASE_URL`
- [ ] تأكد من PostgreSQL service يعمل
- [ ] راجع Database Logs
- [ ] تحقق من Connections limit

### إذا CORS Error:
- [ ] راجع `config/middlewares.ts`
- [ ] أضف رابط Frontend الصحيح
- [ ] أعد نشر Backend
- [ ] امسح Cache في المتصفح

---

## 📚 المصادر

- [ ] `QUICK_START.md` - دليل سريع
- [ ] `RAILWAY_DEPLOYMENT.md` - دليل شامل
- [ ] `frontend-api-example.js` - أمثلة API
- [ ] `api-tester.html` - اختبار API
- [ ] Railway Docs: https://docs.railway.app
- [ ] Strapi Docs: https://docs.strapi.io

---

## ✅ اكتمل النشر!

عند إكمال جميع النقاط أعلاه:
- [x] Backend على Railway ✅
- [x] Frontend على Railway ✅
- [x] قاعدة البيانات تعمل ✅
- [x] البيانات منقولة ✅
- [x] CORS مضبوط ✅
- [x] الأمان محقق ✅

**🎉 مبروك! مشروعك الآن Live على Railway**

---

**آخر تحديث:** نوفمبر 2025
**الإصدار:** 1.0
