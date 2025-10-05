# 📺 YouTube Playlist Tracker

A simple and effective web app to track your progress watching YouTube playlists (courses, series, etc).

## ✨ Features

- 🚀 **Auto-fetch**: Paste any YouTube playlist link and get all videos automatically
- ✅ **Progress tracking**: Check off each video as you complete it
- 📊 **Progress bar**: See your completion percentage for each playlist
- 📁 **Collapse/Expand**: Click the arrow next to any playlist to hide/show it
- 💾 **Auto-save**: Everything is saved in your browser (localStorage)
- 🎨 **Modern UI**: Beautiful and easy-to-use design
- 🌙 **Dark Mode**: Easy on the eyes with preference saving
- 🌍 **Bilingual**: Full interface in Arabic and English with easy toggle
- 🌐 **RTL/LTR**: Automatically switches based on language
- 📱 **Responsive**: Works on mobile, tablet, and desktop

## 🚀 How to Use

### Step 1: Initial Setup (one-time only)

1. Open the `index.html` file in your browser
2. Get a free YouTube API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable **YouTube Data API v3**
   - Create an **API Key** from the Credentials page
   - Copy the key and paste it in the app

**Note:** The key is completely free and provides 10,000 requests per day (enough for thousands of playlists!)

### Step 2: Add Playlists

1. Go to any YouTube playlist
2. Copy the playlist link (contains `list=`)
3. Paste the link in the app
4. (Optional) Add a custom name for the playlist
5. Click "Fetch Playlist"

### Step 3: Track Your Progress

- ✅ Check off each video after you finish it
- 📊 Watch the progress bar move
- 📁 Click the arrow (▼) to collapse/expand playlists for better organization
- 🔄 Reset progress if you want to start over
- 🗑️ Delete playlists you no longer need

## 📁 Files

- `index.html` - Main interface
- `styles.css` - Design and colors
- `app.js` - Logic and functions
- `README.md` - This file

## 🔐 Privacy

- All your data is saved **locally** in your browser only
- No data is sent to any server
- Your API key is stored locally and is not shared with anyone

## 💡 Tips

- Use a descriptive name for each playlist for organization
- Click ⚙️ to change your API key at any time
- You can add the same playlist multiple times with different names
- Click 🌙 to toggle between light and dark mode
- **Click EN / ع to switch between English and Arabic** 🌍
- **Click the arrow ▼ to collapse playlists** - great if you have many playlists!
- Your preferences (language + dark mode + progress + playlist states) are saved automatically

## 🐛 Troubleshooting

### Videos don't show up
- Check that your API key is correct
- Make sure the playlist link contains "list=" followed by the playlist ID
- Verify the playlist is public (not private)

### "Daily quota exceeded" error
- You've exceeded 10,000 requests in one day (very rare!)
- Try again tomorrow

### Progress not saving
- Make sure your browser allows localStorage
- Don't use incognito/private browsing mode

## 📝 License

This project is free and open source. Use it as you wish! ❤️

## ☕ Support

If you like this project and want to support me, you can:
- ⭐ Star the project
- 💝 Donate via [PayPal](https://paypal.me/Ahmedkamel245)
- 🐛 Report bugs and issues
- 💡 Suggest new features

Every bit of support helps me develop more free projects! 🙏

---

**Made by Ahmed Kamel ❤️**

[☕ Support Me on PayPal](https://paypal.me/Ahmedkamel245)

---
---

# 📺 متتبع قوائم تشغيل YouTube

تطبيق ويب بسيط وفعّال لتتبع تقدمك في مشاهدة قوائم تشغيل YouTube (الدورات التعليمية، السلاسل، إلخ).

## ✨ المميزات

- 🚀 **جلب تلقائي**: الصق رابط أي قائمة تشغيل واحصل على جميع الفيديوهات تلقائياً
- ✅ **تتبع التقدم**: حدد كل فيديو بعد إنهائه
- 📊 **شريط تقدم**: شاهد نسبة إكمالك لكل قائمة
- 📁 **طي/فتح القوائم**: اضغط على السهم بجانب كل قائمة لإخفائها أو إظهارها
- 💾 **حفظ تلقائي**: يتم حفظ كل شيء في متصفحك (localStorage)
- 🎨 **واجهة عصرية**: تصميم جميل وسهل الاستخدام
- 🌙 **وضع ليلي**: Dark Mode لراحة العين مع حفظ التفضيل
- 🌍 **دعم لغتين**: واجهة كاملة بالعربية والإنجليزية مع تبديل سهل
- 🌐 **RTL/LTR**: يتبدل تلقائياً حسب اللغة
- 📱 **متجاوب**: يعمل على الجوال والتابلت والكمبيوتر

## 🚀 كيفية الاستخدام

### الخطوة 1: الإعداد الأولي (مرة واحدة فقط)

1. افتح ملف `index.html` في متصفحك
2. احصل على مفتاح YouTube API مجاناً:
   - اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
   - أنشئ مشروع جديد
   - فعّل **YouTube Data API v3**
   - أنشئ **مفتاح API** من صفحة Credentials
   - انسخ المفتاح والصقه في التطبيق

**ملاحظة:** المفتاح مجاني 100% ويوفر 10,000 طلب يومياً (كافٍ لآلاف القوائم!)

### الخطوة 2: إضافة قوائم التشغيل

1. اذهب إلى أي قائمة تشغيل على YouTube
2. انسخ رابط القائمة (يحتوي على `list=`)
3. الصق الرابط في التطبيق
4. (اختياري) أضف اسماً مخصصاً للقائمة
5. اضغط "جلب القائمة"

### الخطوة 3: تتبع تقدمك

- ✅ حدد كل فيديو بعد إنهائه
- 📊 شاهد شريط التقدم يتحرك
- 📁 اضغط السهم (▼) لطي/فتح القوائم لتنظيم أفضل
- 🔄 أعد تعيين التقدم إذا أردت البدء من جديد
- 🗑️ احذف القوائم التي لم تعد بحاجتها

## 📁 الملفات

- `index.html` - الواجهة الرئيسية
- `styles.css` - التصميم والألوان
- `app.js` - المنطق والوظائف
- `README.md` - هذا الملف

## 🔐 الخصوصية

- جميع بياناتك محفوظة **محلياً** في متصفحك فقط
- لا يتم إرسال أي بيانات لأي خادم
- مفتاح API الخاص بك يُحفظ محلياً ولا يُشارك مع أي أحد

## 💡 نصائح

- استخدم اسماً وصفياً لكل قائمة تشغيل للتنظيم
- اضغط ⚙️ لتغيير مفتاح API في أي وقت
- يمكنك إضافة نفس القائمة مرات متعددة بأسماء مختلفة
- اضغط 🌙 للتبديل بين الوضع النهاري والليلي
- **اضغط EN / ع للتبديل بين العربية والإنجليزية** 🌍
- **اضغط على السهم ▼ لطي القوائم** - رائع لو عندك قوائم كتيرة!
- تفضيلاتك (اللغة + Dark Mode + التقدم + حالة القوائم) تُحفظ تلقائياً

## 🐛 حل المشاكل

### لا تظهر الفيديوهات
- تأكد من صحة مفتاح API
- تأكد من أن رابط القائمة يحتوي على "list=" متبوعاً بمعرف القائمة
- تأكد من أن القائمة عامة (public) وليست خاصة

### خطأ "تجاوز الحد اليومي"
- تجاوزت 10,000 طلب في اليوم (نادر جداً!)
- حاول مرة أخرى غداً

### لا يتم حفظ التقدم
- تأكد من أن المتصفح يسمح بـ localStorage
- لا تستخدم وضع التصفح الخفي

## 📝 الترخيص

هذا المشروع مجاني ومفتوح المصدر. استخدمه كما تشاء! ❤️

## ☕ الدعم

إذا أعجبك هذا المشروع وتريد دعمي، يمكنك:
- ⭐ وضع نجمة على المشروع
- 💝 التبرع عبر [PayPal](https://paypal.me/Ahmedkamel245)
- 🐛 الإبلاغ عن الأخطاء والمشاكل
- 💡 اقتراح ميزات جديدة

كل دعم يساعدني على تطوير المزيد من المشاريع المجانية! 🙏

---

**صنع بواسطة Ahmed Kamel ❤️**

[☕ ادعمني على PayPal](https://paypal.me/Ahmedkamel245)
