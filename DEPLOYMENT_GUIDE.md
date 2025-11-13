# دليل النشر على Render وإعداد الصلاحيات

## 📚 الصلاحيات للعميل في Strapi

### خطوات إعداد دور العميل (Client Role):

#### 1. بعد تشغيل Strapi محلياً:
```bash
npm run develop
```

#### 2. الدخول إلى لوحة التحكم:
- افتح المتصفح على: `http://localhost:1337/admin`
- قم بإنشاء حساب Admin إذا لم يكن موجوداً

#### 3. إنشاء دور جديد للعميل:
- اذهب إلى: **Settings** → **Users & Permissions Plugin** → **Roles**
- اضغط على **Add new role**
- اسم الدور: **Client** أو **Author**

#### 4. تعيين الصلاحيات للدور:

قم بتحديد الصلاحيات التالية:

**Author (كاتب):**
- ✅ Create (إنشاء)
- ✅ Update (تعديل المحتوى الخاص به فقط)
- ✅ Find (عرض)
- ✅ FindOne (عرض التفاصيل)

**Blog (مدونة):**
- ✅ Create
- ✅ Update
- ✅ Find
- ✅ FindOne
- ✅ Delete

**Book (كتب):**
- ✅ Create
- ✅ Update
- ✅ Find
- ✅ FindOne
- ✅ Delete

**White-Paper (أوراق بحثية):**
- ✅ Create
- ✅ Update
- ✅ Find
- ✅ FindOne
- ✅ Delete

**Store (متجر):**
- ✅ Create
- ✅ Update
- ✅ Find
- ✅ FindOne
- ✅ Delete

**Publishing-House (دور النشر):**
- ✅ Find
- ✅ FindOne
- ⚠️ Create/Update/Delete (حسب الحاجة)

**Homepage:**
- ✅ Find
- ✅ FindOne
- ❌ Create/Update/Delete (للـ Admin فقط)

#### 5. حفظ الدور:
- اضغط على **Save**

#### 6. إنشاء مستخدمين جدد:
- اذهب إلى: **Content Manager** → **User** (تحت Collection Types)
- اضغط **Create new entry**
- املأ البيانات:
  - Username: اسم المستخدم
  - Email: البريد الإلكتروني
  - Password: كلمة المرور
  - Role: اختر **Client** أو **Author**
  - Confirmed: ✅
  - Blocked: ❌
- اضغط **Save**

---

## 🚀 خطوات النشر على Render

### الخطوة 1: رفع التعديلات على GitHub
```bash
git add .
git commit -m "Configure for Render deployment with PostgreSQL"
git push origin main
```

### الخطوة 2: إنشاء حساب على Render
1. اذهب إلى: https://render.com
2. قم بالتسجيل أو تسجيل الدخول
3. اربط حسابك مع GitHub

### الخطوة 3: إنشاء قاعدة بيانات PostgreSQL
1. من Dashboard، اضغط **New** → **PostgreSQL**
2. الإعدادات:
   - **Name**: `my-author-site-db`
   - **Database**: `strapi`
   - **User**: سيتم إنشاؤه تلقائياً
   - **Region**: اختر الأقرب لك
   - **Plan**: Free
3. اضغط **Create Database**
4. انتظر حتى تصبح Database متاحة
5. احفظ الـ **Internal Database URL** (ستحتاجه لاحقاً)

### الخطوة 4: إنشاء Web Service
1. من Dashboard، اضغط **New** → **Web Service**
2. اربط repository الخاص بك من GitHub: `Books-blog`
3. الإعدادات:
   - **Name**: `my-author-site`
   - **Region**: نفس region قاعدة البيانات
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: Free

### الخطوة 5: إضافة Environment Variables
في صفحة Web Service، اذهب لـ **Environment** وأضف:

```bash
NODE_VERSION=20.18.0
NODE_ENV=production

# Database
DATABASE_CLIENT=postgres
DATABASE_URL=<الصق Internal Database URL هنا>

# يجب إنشاء قيم عشوائية آمنة لهذه المتغيرات
APP_KEYS=<random-key-1>,<random-key-2>
API_TOKEN_SALT=<random-string>
ADMIN_JWT_SECRET=<random-string>
TRANSFER_TOKEN_SALT=<random-string>
JWT_SECRET=<random-string>
ENCRYPTION_KEY=<random-string>

HOST=0.0.0.0
PORT=10000
```

### الخطوة 6: توليد المفاتيح العشوائية
يمكنك توليد مفاتيح عشوائية آمنة بهذه الطريقة:

```bash
# في PowerShell:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

نفذ هذا الأمر 6 مرات للحصول على 6 مفاتيح مختلفة.

### الخطوة 7: Deploy
1. اضغط **Create Web Service**
2. سيبدأ Render بعملية Build و Deploy
3. انتظر حتى تكتمل العملية (قد تستغرق 5-10 دقائق)

### الخطوة 8: الوصول إلى Strapi
بعد اكتمال Deploy:
1. افتح الرابط الخاص بك: `https://my-author-site.onrender.com/admin`
2. قم بإنشاء حساب Admin جديد
3. ابدأ بإضافة المحتوى!

---

## ⚠️ ملاحظات هامة

### مشاكل شائعة وحلولها:

1. **Build Failed**:
   - تأكد من أن Node version صحيح
   - تحقق من Logs في Render

2. **Database Connection Error**:
   - تأكد من صحة DATABASE_URL
   - تحقق من أن Database جاهزة ومتاحة

3. **Admin Panel لا يفتح**:
   - امسح الـ cache
   - تأكد من أن NODE_ENV=production

4. **Free Plan يتوقف بعد 15 دقيقة**:
   - هذا طبيعي في Free Plan
   - سيعود للعمل عند زيارة الموقع

### الأمان:
- ⚠️ لا تشارك الـ Environment Variables مع أحد
- ⚠️ لا ترفع ملف `.env` على GitHub
- ✅ استخدم مفاتيح عشوائية قوية في Production
- ✅ غيّر كلمات المرور الافتراضية

---

## 🔗 روابط مفيدة

- Strapi Documentation: https://docs.strapi.io
- Render Documentation: https://render.com/docs
- PostgreSQL on Render: https://render.com/docs/databases

---

## 📝 API للعميل

بعد إعداد الصلاحيات، سيتمكن العميل من:

### تسجيل الدخول:
```
POST /api/auth/local
Body: {
  "identifier": "email@example.com",
  "password": "password123"
}
```

### إضافة كتاب جديد:
```
POST /api/books
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "data": {
    "title": "عنوان الكتاب",
    "description": "وصف الكتاب"
  }
}
```

وهكذا لباقي العمليات (Update, Delete, Find).
