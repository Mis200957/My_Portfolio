# بورتفوليو محمد إبراهيم شوقي

موقع شخصي احترافي صفحة واحدة (Single Page) باللغة العربية (RTL) لعرض المشاريع والخدمات.

## التشغيل محلياً

افتح `index.html` مباشرة في المتصفح، أو شغّل سيرفر بسيط:

```bash
python3 -m http.server 8080
# ثم افتح http://localhost:8080
```

## النشر على GitHub Pages

1. ادفع الكود إلى الفرع `main` على GitHub.
2. من إعدادات المستودع: Settings → Pages → Source → Deploy from a branch → `main` / `(root)`.
3. سيكون الرابط: `https://<username>.github.io/<repo>/`.

## الملفات

- `index.html` — هيكل الصفحة والمحتوى.
- `styles.css` — التصميم والثيم الداكن المتجاوب.
- `main.js` — التفاعل (القائمة، الفلاتر، أنيميشن الأعداد).

## التخصيص السريع

- لون الثيم: عدّل المتغيرات داخل `:root` في `styles.css`.
- المشاريع: حرّر بطاقات `.project-card` داخل `index.html` وعيّن `data-cat`.
- بيانات التواصل: حدّث قسم `#contact` في `index.html`.
