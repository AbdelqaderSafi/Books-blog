# 🎨 Frontend Project - Author Website

> مثال على بنية مشروع فرونت إند للاتصال بـ Strapi Backend

---

## 📁 البنية المقترحة

```
frontend/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── api/
│   │   ├── strapi.js          # Strapi API client
│   │   └── endpoints.js       # API endpoints
│   ├── components/
│   │   ├── Blog/
│   │   │   ├── BlogCard.jsx
│   │   │   └── BlogList.jsx
│   │   ├── Book/
│   │   │   ├── BookCard.jsx
│   │   │   └── BookList.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       └── Image.jsx
│   ├── pages/
│   │   ├── index.jsx          # Homepage
│   │   ├── blogs/
│   │   │   ├── index.jsx      # All blogs
│   │   │   └── [id].jsx       # Single blog
│   │   ├── books/
│   │   │   ├── index.jsx
│   │   │   └── [id].jsx
│   │   ├── about.jsx
│   │   └── contact.jsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── components/
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   └── App.jsx
├── .env.local                  # Environment variables
├── .env.example
├── railway.json                # Railway configuration
├── package.json
├── README.md
└── next.config.js / vite.config.js
```

---

## 🚀 التثبيت والتشغيل

### Next.js

#### إنشاء المشروع:
```bash
npx create-next-app@latest frontend
cd frontend
```

#### تثبيت الحزم الإضافية:
```bash
npm install axios
# أو
npm install @tanstack/react-query  # للـ data fetching
```

#### إنشاء .env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

#### التشغيل:
```bash
npm run dev
```

---

### React + Vite

#### إنشاء المشروع:
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

#### تثبيت الحزم:
```bash
npm install axios react-router-dom
```

#### إنشاء .env:
```env
VITE_API_URL=http://localhost:1337/api
VITE_STRAPI_URL=http://localhost:1337
```

#### التشغيل:
```bash
npm run dev
```

---

## 📡 الاتصال بـ Strapi API

### ملف: `src/api/strapi.js`

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
                import.meta.env.VITE_API_URL;

export async function fetchAPI(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export function getStrapiMedia(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return process.env.NEXT_PUBLIC_STRAPI_URL + url;
}
```

### ملف: `src/api/endpoints.js`

```javascript
import { fetchAPI } from './strapi';

export const getBlogs = () => fetchAPI('/blogs?populate=*');
export const getBlogById = (id) => fetchAPI(`/blogs/${id}?populate=*`);
export const getBooks = () => fetchAPI('/books?populate=*');
export const getBookById = (id) => fetchAPI(`/books/${id}?populate=*`);
export const getAuthor = () => fetchAPI('/authors?populate=*');
export const getHomepage = () => fetchAPI('/homepage?populate=deep');
```

---

## 🎨 أمثلة على Components

### BlogCard.jsx (Next.js)

```jsx
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/api/strapi';

export default function BlogCard({ blog }) {
  const { id, attributes } = blog;
  const imageUrl = getStrapiMedia(
    attributes.image?.data?.attributes?.url
  );

  return (
    <div className="blog-card">
      {imageUrl && (
        <Image 
          src={imageUrl} 
          alt={attributes.title}
          width={400}
          height={250}
        />
      )}
      <h3>{attributes.title}</h3>
      <p>{attributes.description}</p>
      <Link href={`/blogs/${id}`}>اقرأ المزيد</Link>
    </div>
  );
}
```

### BlogList Page (Next.js)

```jsx
import { getBlogs } from '@/api/endpoints';
import BlogCard from '@/components/Blog/BlogCard';

export default function BlogsPage({ blogs }) {
  return (
    <div className="blogs-page">
      <h1>المدونات</h1>
      <div className="blogs-grid">
        {blogs.data.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const blogs = await getBlogs();
  return { props: { blogs } };
}
```

---

## 🚂 النشر على Railway

### 1. إنشاء railway.json:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### 2. تحديث package.json:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

### 3. إنشاء .env.example:

```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
NEXT_PUBLIC_STRAPI_URL=https://your-backend.up.railway.app
```

### 4. رفع على GitHub:

```bash
git add .
git commit -m "Frontend ready for Railway"
git push origin main
```

### 5. النشر على Railway:

1. في Railway: **+ New** → **GitHub Repo**
2. اختر مستودع Frontend
3. إذا Monorepo: **Settings** → **Root Directory** → `frontend`
4. في **Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
   NEXT_PUBLIC_STRAPI_URL=https://your-backend.up.railway.app
   ```
5. **Generate Domain** للحصول على رابط

### 6. تحديث CORS في Backend:

في `config/middlewares.ts`:
```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://your-frontend.up.railway.app',
      'http://localhost:3000',
    ],
    credentials: true,
  },
},
```

---

## 🎯 الصفحات المطلوبة

### الحد الأدنى:
- ✅ **Homepage** (`/`) - الصفحة الرئيسية
- ✅ **Blogs** (`/blogs`) - قائمة المدونات
- ✅ **Blog Detail** (`/blogs/[id]`) - مدونة واحدة
- ✅ **Books** (`/books`) - قائمة الكتب
- ✅ **Book Detail** (`/books/[id]`) - كتاب واحد
- ✅ **About** (`/about`) - عن الكاتب

### إضافي:
- **White Papers** (`/white-papers`)
- **Contact** (`/contact`)
- **Store** (`/store`)

---

## 🎨 التصميم

### CSS Frameworks (اختر واحد):

#### Tailwind CSS (موصى به):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Material-UI:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

#### Bootstrap:
```bash
npm install react-bootstrap bootstrap
```

#### Styled Components:
```bash
npm install styled-components
```

---

## 📦 الحزم المفيدة

### Data Fetching:
```bash
npm install @tanstack/react-query
npm install swr  # Alternative
```

### Routing (React):
```bash
npm install react-router-dom
```

### Forms:
```bash
npm install react-hook-form
npm install formik yup  # Alternative
```

### Icons:
```bash
npm install react-icons
```

### Date Formatting:
```bash
npm install date-fns
```

### Markdown Rendering:
```bash
npm install react-markdown
```

---

## 🔍 SEO (Next.js)

### في كل صفحة:

```jsx
import Head from 'next/head';

export default function BlogPage({ blog }) {
  return (
    <>
      <Head>
        <title>{blog.attributes.title} | موقعي</title>
        <meta name="description" content={blog.attributes.description} />
        <meta property="og:title" content={blog.attributes.title} />
        <meta property="og:description" content={blog.attributes.description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      {/* محتوى الصفحة */}
    </>
  );
}
```

---

## 🌐 i18n (متعدد اللغات)

### Next.js:
```bash
npm install next-i18next
```

### React:
```bash
npm install react-i18next i18next
```

---

## 🧪 الاختبار

### Testing Library:
```bash
npm install -D @testing-library/react @testing-library/jest-dom
```

---

## 📚 موارد مفيدة

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Strapi Frontend Integration](https://docs.strapi.io/dev-docs/integrations)
- [Railway Docs](https://docs.railway.app)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✅ Checklist قبل النشر

- [ ] جميع الصفحات تعمل
- [ ] الصور تُحمّل بشكل صحيح
- [ ] API يُستدعى بنجاح
- [ ] لا أخطاء في Console
- [ ] SEO متاحة
- [ ] Mobile Responsive
- [ ] Loading states موجودة
- [ ] Error handling موجود
- [ ] Environment variables مضبوطة
- [ ] Build ينجح: `npm run build`

---

**🎨 جاهز لإنشاء Frontend رائع! استخدم `frontend-api-example.js` للأمثلة الكاملة**
