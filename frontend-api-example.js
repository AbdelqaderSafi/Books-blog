// مثال على كيفية الاتصال بـ Strapi API من Frontend
// يمكن استخدامه في Next.js, React, Vue, أو أي framework آخر

// ═══════════════════════════════════════════════════════════
// 📦 التكوين الأساسي
// ═══════════════════════════════════════════════════════════

// Next.js: استخدم NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// React (Vite): استخدم VITE_
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';
// const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// ═══════════════════════════════════════════════════════════
// 🔧 Helper Functions
// ═══════════════════════════════════════════════════════════

/**
 * Helper لتحويل رابط الصورة من Strapi
 * @param {string} url - رابط الصورة من Strapi
 * @returns {string} - الرابط الكامل للصورة
 */
function getStrapiMedia(url) {
  if (!url) return null;
  
  // إذا كان رابط كامل (من ImageKit مثلاً)
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  
  // إذا كان رابط نسبي من Strapi
  return `${STRAPI_URL}${url}`;
}

/**
 * Fetch من Strapi API
 * @param {string} path - المسار (مثل: /blogs, /books/1)
 * @param {object} options - خيارات fetch إضافية
 * @returns {Promise<any>}
 */
async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = `${API_URL}${path}`;
  
  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════
// 📚 أمثلة على استخدام API
// ═══════════════════════════════════════════════════════════

// ------------------------------------
// 1. جلب جميع المدونات (Blogs)
// ------------------------------------
export async function getAllBlogs() {
  const data = await fetchAPI('/blogs', {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 2. جلب مدونة واحدة بالـ ID
// ------------------------------------
export async function getBlogById(id) {
  const data = await fetchAPI(`/blogs/${id}`, {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 3. جلب جميع الكتب (Books)
// ------------------------------------
export async function getAllBooks() {
  const data = await fetchAPI('/books?populate=*', {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 4. جلب كتاب واحد مع العلاقات
// ------------------------------------
export async function getBookById(id) {
  const data = await fetchAPI(`/books/${id}?populate=deep`, {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 5. جلب معلومات الكاتب (Author)
// ------------------------------------
export async function getAuthorInfo() {
  const data = await fetchAPI('/authors?populate=*', {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 6. جلب الأوراق البحثية (White Papers)
// ------------------------------------
export async function getAllWhitePapers() {
  const data = await fetchAPI('/white-papers?populate=*', {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 7. جلب محتوى الصفحة الرئيسية
// ------------------------------------
export async function getHomepage() {
  const data = await fetchAPI('/homepage?populate=deep', {
    method: 'GET',
  });
  return data;
}

// ------------------------------------
// 8. البحث في المدونات
// ------------------------------------
export async function searchBlogs(query) {
  const data = await fetchAPI(
    `/blogs?filters[title][$containsi]=${encodeURIComponent(query)}`,
    {
      method: 'GET',
    }
  );
  return data;
}

// ------------------------------------
// 9. جلب المدونات مع Pagination
// ------------------------------------
export async function getBlogsWithPagination(page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      method: 'GET',
    }
  );
  return data;
}

// ------------------------------------
// 10. جلب المدونات مع Sorting
// ------------------------------------
export async function getBlogsSorted(sortBy = 'publishedAt:desc') {
  const data = await fetchAPI(`/blogs?sort=${sortBy}&populate=*`, {
    method: 'GET',
  });
  return data;
}

// ═══════════════════════════════════════════════════════════
// 📝 أمثلة استخدام في Components
// ═══════════════════════════════════════════════════════════

/**
 * مثال: Next.js Page Component
 */
/*
export default function BlogsPage({ blogs }) {
  return (
    <div>
      <h1>المدونات</h1>
      {blogs.data.map((blog) => (
        <article key={blog.id}>
          <h2>{blog.attributes.title}</h2>
          <p>{blog.attributes.description}</p>
          {blog.attributes.image && (
            <img 
              src={getStrapiMedia(blog.attributes.image.data.attributes.url)} 
              alt={blog.attributes.title}
            />
          )}
        </article>
      ))}
    </div>
  );
}

// Server-side rendering
export async function getServerSideProps() {
  const blogs = await getAllBlogs();
  return {
    props: { blogs },
  };
}
*/

/**
 * مثال: React Component مع useState و useEffect
 */
/*
import { useState, useEffect } from 'react';

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getAllBlogs();
        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.attributes.title}</h2>
          <p>{blog.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}
*/

// ═══════════════════════════════════════════════════════════
// 🔐 Authentication (اختياري)
// ═══════════════════════════════════════════════════════════

/**
 * تسجيل دخول مستخدم
 */
export async function login(identifier, password) {
  const data = await fetchAPI('/auth/local', {
    method: 'POST',
    body: JSON.stringify({
      identifier, // email or username
      password,
    }),
  });
  
  // حفظ JWT في localStorage
  if (data.jwt) {
    localStorage.setItem('jwt', data.jwt);
  }
  
  return data;
}

/**
 * Fetch مع Authentication
 */
export async function fetchAuthenticatedAPI(path, options = {}) {
  const jwt = localStorage.getItem('jwt');
  
  const authenticatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${jwt}`,
    },
  };
  
  return fetchAPI(path, authenticatedOptions);
}

// ═══════════════════════════════════════════════════════════
// 📤 Export للاستخدام
// ═══════════════════════════════════════════════════════════

export {
  API_URL,
  STRAPI_URL,
  getStrapiMedia,
  fetchAPI,
};

// ═══════════════════════════════════════════════════════════
// 📖 ملاحظات مهمة
// ═══════════════════════════════════════════════════════════

/**
 * 1. Populate:
 *    - populate=* : جلب جميع العلاقات من المستوى الأول
 *    - populate=deep : جلب جميع العلاقات (عميق)
 *    - populate[image]=* : جلب علاقة محددة
 * 
 * 2. Filters:
 *    - $eq : يساوي
 *    - $ne : لا يساوي
 *    - $containsi : يحتوي (case-insensitive)
 *    - $gt : أكبر من
 *    - $lt : أقل من
 * 
 * 3. Sorting:
 *    - sort=title:asc : ترتيب تصاعدي
 *    - sort=createdAt:desc : ترتيب تنازلي
 * 
 * 4. Pagination:
 *    - pagination[page]=1
 *    - pagination[pageSize]=10
 *    - pagination[start]=0
 *    - pagination[limit]=10
 * 
 * 5. هيكل البيانات من Strapi:
 *    {
 *      data: [...],      // المحتوى
 *      meta: {           // معلومات إضافية
 *        pagination: {}
 *      }
 *    }
 */
