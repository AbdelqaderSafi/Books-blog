# 📚 My Author Site - Strapi Backend

> نظام إدارة محتوى لموقع كاتب باستخدام Strapi مع دعم الكتب، المدونات، الأوراق البحثية والمزيد.

## 🎯 المحتويات

- [البدء السريع](#-البدء-السريع)
- [المميزات](#-المميزات)
- [النشر](#-النشر)
- [التطوير](#️-التطوير)
- [الوثائق](#-الوثائق)

---

## 🚀 البدء السريع

### المتطلبات

- Node.js >= 20.0.0
- npm >= 6.0.0
- PostgreSQL (للإنتاج) أو SQLite (للتطوير)

### التثبيت

```bash
# تثبيت الحزم
npm install

# تشغيل التطوير
npm run develop
```

افتح المتصفح على: `http://localhost:1337/admin`

---

## ✨ المميزات

### أنواع المحتوى (Content Types):

- 📖 **Books** - إدارة الكتب
- ✍️ **Blog** - المدونة والمقالات
- 📄 **White Papers** - الأوراق البحثية
- 👤 **Author** - معلومات الكاتب
- 🏢 **Publishing House** - دور النشر
- 🛒 **Store** - المتجر
- 🏠 **Homepage** - الصفحة الرئيسية

### المكونات:

- 🔗 **Shared Link** - روابط مشتركة قابلة لإعادة الاستخدام

### الإضافات:

- 🖼️ **ImageKit Integration** - رفع وإدارة الصور
- 👥 **Users & Permissions** - نظام الصلاحيات

---

## 🌐 النشر

### Railway (موصى به) 🚂

#### 🚀 ابدأ بسرعة:

```bash
# 1. توليد المفاتيح
node generate-keys.js

# 2. رفع على GitHub
git push origin main

# 3. اتبع أحد الأدلة أدناه
```

---

### 📖 اختر الدليل المناسب لك:

#### 🎓 **مبتدئ؟**

→ [`BEGINNER_GUIDE.md`](./BEGINNER_GUIDE.md)

- شرح مبسط جداً خطوة بخطوة
- صور توضيحية
- بدون مصطلحات تقنية معقدة
- ⏱️ 15-30 دقيقة

#### ⚡ **تريد السرعة؟**

→ [`QUICK_START.md`](./QUICK_START.md)

- 7 خطوات سريعة
- Backend فقط
- نسخ/لصق مباشر
- ⏱️ 5-10 دقائق

#### 📚 **تريد التفاصيل الكاملة؟**

→ [`RAILWAY_DEPLOYMENT.md`](./RAILWAY_DEPLOYMENT.md)

- دليل شامل كامل
- Backend + Frontend معاً
- جميع السيناريوهات
- حل المشاكل
- ⏱️ 30-45 دقيقة للقراءة

#### ✅ **تريد قائمة تحقق؟**

→ [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)

- قائمة تحقق تفصيلية
- لا تنسى أي خطوة
- تتبع التقدم

#### 🔄 **قادم من Render؟**

→ [`RENDER_VS_RAILWAY.md`](./RENDER_VS_RAILWAY.md)

- المقارنة والفروقات
- خطوات النقل
- نسخ البيانات

#### 🎨 **تريد إضافة Frontend؟**

→ [`FRONTEND_GUIDE.md`](./FRONTEND_GUIDE.md)

- دليل كامل للفرونت إند
- Next.js و React و Vue
- الاتصال بـ API

#### 📋 **نظرة عامة؟**

→ [`SUMMARY.md`](./SUMMARY.md) أو [`FILES_INDEX.md`](./FILES_INDEX.md)

- ملخص جميع الملفات
- خريطة الاستخدام
- البدء السريع

---

#### 🛠️ الأدوات المساعدة:

- [`generate-keys.js`](./generate-keys.js) - توليد المفاتيح السرية
- [`frontend-api-example.js`](./frontend-api-example.js) - أمثلة API للفرونت
- [`api-tester.html`](./api-tester.html) - اختبار API في المتصفح

---

#### مميزات Railway:

- ✅ PostgreSQL مجاني دائماً
- ✅ HTTPS تلقائي
- ✅ Auto-deploy من GitHub
- ✅ $5 رصيد مجاني/شهر
- ✅ Build أسرع من Render
- ✅ واجهة أبسط

---

### Render (القديم)

راجع [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) للنشر على Render.
أو [`RENDER_VS_RAILWAY.md`](./RENDER_VS_RAILWAY.md) للمقارنة والنقل.

---

## ⚙️ أوامر التطوير

### Development

```bash
npm run develop
```

تشغيل Strapi مع إعادة التحميل التلقائي.

### Production

```bash
# بناء المشروع
npm run build

# تشغيل الإنتاج
npm run start
```

### أوامر أخرى

```bash
# Strapi Console
npm run console

# Upgrade Strapi
npm run upgrade

# Dry run upgrade
npm run upgrade:dry
```

---

## 🗄️ قاعدة البيانات

### Development (SQLite)

قاعدة البيانات تُنشأ تلقائياً في `.tmp/data.db`

### Production (PostgreSQL)

#### متغيرات البيئة المطلوبة:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:pass@host:5432/dbname
# أو
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

---

## 🔐 الأمان والمفاتيح

### توليد المفاتيح

```bash
node generate-keys.js
```

### المتغيرات المطلوبة:

- `APP_KEYS` - 4 مفاتيح مفصولة بفواصل
- `JWT_SECRET` - مفتاح JWT
- `API_TOKEN_SALT` - ملح رموز API
- `ADMIN_JWT_SECRET` - مفتاح JWT للـ Admin
- `TRANSFER_TOKEN_SALT` - ملح رموز النقل

⚠️ **لا تشارك هذه المفاتيح أبداً!**

---

## 👥 الصلاحيات

راجع [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) لإعداد:

- دور العميل (Client Role)
- صلاحيات المحتوى
- إنشاء مستخدمين

---

## 🛠️ التكوين

### الملفات الرئيسية:

- `config/database.ts` - تكوين قاعدة البيانات
- `config/server.ts` - إعدادات الخادم
- `config/middlewares.ts` - Middleware و CORS
- `config/admin.ts` - لوحة التحكم
- `config/api.ts` - API
- `config/plugins.ts` - الإضافات

### البيئة:

- `.env` - متغيرات التطوير
- `.env.railway.template` - قالب متغيرات Railway

---

## 📁 هيكل المشروع

```
my-author-site/
├── config/              # التكوينات
├── database/            # الهجرة وقاعدة البيانات
├── public/              # الملفات العامة
│   └── uploads/         # الملفات المرفوعة
├── src/
│   ├── api/             # Content Types
│   │   ├── author/
│   │   ├── blog/
│   │   ├── book/
│   │   ├── homepage/
│   │   ├── publishing-house/
│   │   ├── store/
│   │   └── white-paper/
│   ├── components/      # المكونات المشتركة
│   └── extensions/      # التوسعات
├── types/               # TypeScript types
├── railway.json         # تكوين Railway
├── nixpacks.toml        # تكوين البناء
└── package.json
```

---

## 📚 الوثائق

### أدلة المشروع:

- [`QUICK_START.md`](./QUICK_START.md) - البدء السريع
- [`RAILWAY_DEPLOYMENT.md`](./RAILWAY_DEPLOYMENT.md) - النشر على Railway
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - النشر على Render

### Strapi:

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi CLI](https://docs.strapi.io/dev-docs/cli)
- [Content Types](https://docs.strapi.io/dev-docs/backend-customization/models)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest)

---

## 🤝 المساهمة

هذا مشروع خاص. للاستفسارات تواصل مع المطور.

---

## 📄 الترخيص

Private & Proprietary

---

## 🆘 الدعم

### مشاكل شائعة:

#### Port already in use

```bash
# Windows
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

#### Build Failed

```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Error

تحقق من:

- متغيرات البيئة
- PostgreSQL يعمل
- بيانات الاتصال صحيحة

---

## 🔗 روابط مفيدة

- [Railway](https://railway.app)
- [Strapi](https://strapi.io)
- [PostgreSQL](https://www.postgresql.org)
- [ImageKit](https://imagekit.io)

---

**صُنع بـ ❤️ باستخدام Strapi**
