/**
 * Add Blog Translations Script
 * Adds comprehensive blog-related translation keys to all language files
 */

const fs = require('fs');
const path = require('path');

const translations = {
  en: {
    blog: {
      title: "Blog & Insights",
      subtitle: "Latest news, technical guides, and industry insights from MSADDI metal fabrication experts",
      categories: "Categories",
      popular_tags: "Popular Tags",
      no_posts: "No blog posts found",
      read_more: "Read More",
      related_articles: "Related Articles",
      share: "Share this article",
      back_to_blog: "Back to Blog",
      search_placeholder: "Search articles...",
      filter_by_category: "Filter by Category",
      filter_by_tag: "Filter by Tag",
      all_categories: "All Categories",
      all_tags: "All Tags",
      reading_time: "min read",
      published_on: "Published on",
      written_by: "Written by",
      updated_on: "Updated on",
      table_of_contents: "Table of Contents",
      tags_label: "Tags",
      category_label: "Category",
      posts_in_category: "Posts in {category}",
      posts_with_tag: "Posts tagged with {tag}",
      subscribe_title: "Subscribe to Our Blog",
      subscribe_description: "Get the latest metal fabrication insights delivered to your inbox",
      subscribe_button: "Subscribe",
      email_placeholder: "Enter your email"
    }
  },
  ar: {
    blog: {
      title: "المدونة والرؤى",
      subtitle: "آخر الأخبار والأدلة التقنية ورؤى الصناعة من خبراء تصنيع المعادن في MSADDI",
      categories: "الفئات",
      popular_tags: "الوسوم الشائعة",
      no_posts: "لم يتم العثور على منشورات",
      read_more: "اقرأ المزيد",
      related_articles: "مقالات ذات صلة",
      share: "شارك هذا المقال",
      back_to_blog: "العودة إلى المدونة",
      search_placeholder: "ابحث في المقالات...",
      filter_by_category: "تصفية حسب الفئة",
      filter_by_tag: "تصفية حسب الوسم",
      all_categories: "جميع الفئات",
      all_tags: "جميع الوسوم",
      reading_time: "دقيقة قراءة",
      published_on: "نُشر في",
      written_by: "بقلم",
      updated_on: "تم التحديث في",
      table_of_contents: "جدول المحتويات",
      tags_label: "الوسوم",
      category_label: "الفئة",
      posts_in_category: "المنشورات في فئة {category}",
      posts_with_tag: "المنشورات الموسومة بـ {tag}",
      subscribe_title: "اشترك في مدونتنا",
      subscribe_description: "احصل على آخر رؤى تصنيع المعادن في بريدك الإلكتروني",
      subscribe_button: "اشترك",
      email_placeholder: "أدخل بريدك الإلكتروني"
    }
  },
  tr: {
    blog: {
      title: "Blog ve İçgörüler",
      subtitle: "MSADDI metal işleme uzmanlarından en son haberler, teknik kılavuzlar ve sektör içgörüleri",
      categories: "Kategoriler",
      popular_tags: "Popüler Etiketler",
      no_posts: "Blog yazısı bulunamadı",
      read_more: "Devamını Oku",
      related_articles: "İlgili Makaleler",
      share: "Bu makaleyi paylaş",
      back_to_blog: "Blog'a Dön",
      search_placeholder: "Makalelerde ara...",
      filter_by_category: "Kategoriye Göre Filtrele",
      filter_by_tag: "Etikete Göre Filtrele",
      all_categories: "Tüm Kategoriler",
      all_tags: "Tüm Etiketler",
      reading_time: "dk okuma",
      published_on: "Yayınlanma",
      written_by: "Yazan",
      updated_on: "Güncellenme",
      table_of_contents: "İçindekiler",
      tags_label: "Etiketler",
      category_label: "Kategori",
      posts_in_category: "{category} kategorisindeki yazılar",
      posts_with_tag: "{tag} etiketli yazılar",
      subscribe_title: "Blog'umuza Abone Olun",
      subscribe_description: "En son metal işleme içgörülerini e-postanıza alın",
      subscribe_button: "Abone Ol",
      email_placeholder: "E-postanızı girin"
    }
  },
  fr: {
    blog: {
      title: "Blog et Perspectives",
      subtitle: "Dernières nouvelles, guides techniques et perspectives de l'industrie des experts en fabrication métallique MSADDI",
      categories: "Catégories",
      popular_tags: "Tags Populaires",
      no_posts: "Aucun article de blog trouvé",
      read_more: "Lire la Suite",
      related_articles: "Articles Connexes",
      share: "Partager cet article",
      back_to_blog: "Retour au Blog",
      search_placeholder: "Rechercher des articles...",
      filter_by_category: "Filtrer par Catégorie",
      filter_by_tag: "Filtrer par Tag",
      all_categories: "Toutes les Catégories",
      all_tags: "Tous les Tags",
      reading_time: "min de lecture",
      published_on: "Publié le",
      written_by: "Écrit par",
      updated_on: "Mis à jour le",
      table_of_contents: "Table des Matières",
      tags_label: "Tags",
      category_label: "Catégorie",
      posts_in_category: "Articles dans {category}",
      posts_with_tag: "Articles avec le tag {tag}",
      subscribe_title: "Abonnez-vous à Notre Blog",
      subscribe_description: "Recevez les dernières perspectives sur la fabrication métallique dans votre boîte mail",
      subscribe_button: "S'abonner",
      email_placeholder: "Entrez votre email"
    }
  },
  de: {
    blog: {
      title: "Blog und Einblicke",
      subtitle: "Neueste Nachrichten, technische Anleitungen und Brancheneinblicke von MSADDI Metallverarbeitungsexperten",
      categories: "Kategorien",
      popular_tags: "Beliebte Tags",
      no_posts: "Keine Blog-Beiträge gefunden",
      read_more: "Weiterlesen",
      related_articles: "Verwandte Artikel",
      share: "Diesen Artikel teilen",
      back_to_blog: "Zurück zum Blog",
      search_placeholder: "Artikel durchsuchen...",
      filter_by_category: "Nach Kategorie filtern",
      filter_by_tag: "Nach Tag filtern",
      all_categories: "Alle Kategorien",
      all_tags: "Alle Tags",
      reading_time: "Min. Lesezeit",
      published_on: "Veröffentlicht am",
      written_by: "Geschrieben von",
      updated_on: "Aktualisiert am",
      table_of_contents: "Inhaltsverzeichnis",
      tags_label: "Tags",
      category_label: "Kategorie",
      posts_in_category: "Beiträge in {category}",
      posts_with_tag: "Beiträge mit Tag {tag}",
      subscribe_title: "Abonnieren Sie Unseren Blog",
      subscribe_description: "Erhalten Sie die neuesten Einblicke in die Metallverarbeitung in Ihrem Posteingang",
      subscribe_button: "Abonnieren",
      email_placeholder: "Geben Sie Ihre E-Mail ein"
    }
  },
  nl: {
    blog: {
      title: "Blog en Inzichten",
      subtitle: "Laatste nieuws, technische gidsen en branche-inzichten van MSADDI metaalverwerkingsexperts",
      categories: "Categorieën",
      popular_tags: "Populaire Tags",
      no_posts: "Geen blogberichten gevonden",
      read_more: "Lees Meer",
      related_articles: "Gerelateerde Artikelen",
      share: "Deel dit artikel",
      back_to_blog: "Terug naar Blog",
      search_placeholder: "Artikelen zoeken...",
      filter_by_category: "Filteren op Categorie",
      filter_by_tag: "Filteren op Tag",
      all_categories: "Alle Categorieën",
      all_tags: "Alle Tags",
      reading_time: "min lezen",
      published_on: "Gepubliceerd op",
      written_by: "Geschreven door",
      updated_on: "Bijgewerkt op",
      table_of_contents: "Inhoudsopgave",
      tags_label: "Tags",
      category_label: "Categorie",
      posts_in_category: "Berichten in {category}",
      posts_with_tag: "Berichten met tag {tag}",
      subscribe_title: "Abonneer op Onze Blog",
      subscribe_description: "Ontvang de laatste inzichten in metaalverwerking in uw inbox",
      subscribe_button: "Abonneren",
      email_placeholder: "Voer uw e-mail in"
    }
  },
  zh: {
    blog: {
      title: "博客与见解",
      subtitle: "来自MSADDI金属加工专家的最新新闻、技术指南和行业见解",
      categories: "分类",
      popular_tags: "热门标签",
      no_posts: "未找到博客文章",
      read_more: "阅读更多",
      related_articles: "相关文章",
      share: "分享此文章",
      back_to_blog: "返回博客",
      search_placeholder: "搜索文章...",
      filter_by_category: "按类别筛选",
      filter_by_tag: "按标签筛选",
      all_categories: "所有分类",
      all_tags: "所有标签",
      reading_time: "分钟阅读",
      published_on: "发布于",
      written_by: "作者",
      updated_on: "更新于",
      table_of_contents: "目录",
      tags_label: "标签",
      category_label: "类别",
      posts_in_category: "{category} 分类中的文章",
      posts_with_tag: "标签为 {tag} 的文章",
      subscribe_title: "订阅我们的博客",
      subscribe_description: "在您的收件箱中获取最新的金属加工见解",
      subscribe_button: "订阅",
      email_placeholder: "输入您的电子邮件"
    }
  },
  ru: {
    blog: {
      title: "Блог и Идеи",
      subtitle: "Последние новости, технические руководства и отраслевые идеи от экспертов по металлообработке MSADDI",
      categories: "Категории",
      popular_tags: "Популярные Теги",
      no_posts: "Записи блога не найдены",
      read_more: "Читать Далее",
      related_articles: "Связанные Статьи",
      share: "Поделиться этой статьей",
      back_to_blog: "Вернуться к Блогу",
      search_placeholder: "Поиск статей...",
      filter_by_category: "Фильтр по Категории",
      filter_by_tag: "Фильтр по Тегу",
      all_categories: "Все Категории",
      all_tags: "Все Теги",
      reading_time: "мин чтения",
      published_on: "Опубликовано",
      written_by: "Автор",
      updated_on: "Обновлено",
      table_of_contents: "Содержание",
      tags_label: "Теги",
      category_label: "Категория",
      posts_in_category: "Записи в категории {category}",
      posts_with_tag: "Записи с тегом {tag}",
      subscribe_title: "Подпишитесь на Наш Блог",
      subscribe_description: "Получайте последние идеи по металлообработке на вашу почту",
      subscribe_button: "Подписаться",
      email_placeholder: "Введите ваш email"
    }
  }
};

const locales = ['en', 'ar', 'tr', 'fr', 'de', 'nl', 'zh', 'ru'];
const messagesDir = path.join(__dirname, '..', 'messages');

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);

  try {
    // Read existing translations
    const existingContent = fs.readFileSync(filePath, 'utf8');
    const existingTranslations = JSON.parse(existingContent);

    // Merge blog translations
    existingTranslations.blog = translations[locale].blog;

    // Write back with proper formatting
    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2) + '\n',
      'utf8'
    );

    console.log(`✅ Updated ${locale}.json with blog translations`);
  } catch (error) {
    console.error(`❌ Error updating ${locale}.json:`, error.message);
  }
});

console.log('\n✅ All language files updated with blog translations!');
console.log(`📊 Added ${Object.keys(translations.en.blog).length} translation keys per language`);
