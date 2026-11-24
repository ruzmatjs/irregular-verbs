# Irregular Verbs Trainer

Ingliz tilidagi 100 ta notoʻgʻri feʻlni yodlash uchun mashq sayti. Oʻzbek tilida.

**Sayt:** https://ruzmatjs.github.io/irregular-verbs/

## Imkoniyatlari

- Soʻzlarni bittalab soʻraydi: V2, V3 va tarjimani yozasiz
- Nechta soʻz soʻralishini oʻzingiz tanlaysiz (5, 10, 20, 50, hammasi yoki istalgan son)
- Tartib: ketma-ket (xohlagan raqamdan boshlab), aralash yoki eng zaif soʻzlar avval
- Qaysi shakl soʻralishi sozlanadi — faqat V2+V3, faqat tarjima yoki teskarisi (tarjima berilib, feʻl soʻraladi)
- Har bir soʻz uchun 0–5 level: toʻgʻri javob +1, xato −1
- Xato soʻzlar alohida roʻyxatga tushadi va ularni alohida mashq qilish mumkin
- Talaffuz: har bir feʻlni eshitish, ovoz va tezlikni tanlash
- Har bir shakl tagida oʻqilishi oʻzbek harflarida (`be — bi`, `was/were — uoz/uyor`)
- Mashq paytida oldingi soʻzga qaytish, soʻzga yulduzcha qoʻyish va «Yodladim» bilan darhol level 5 qilish
- Faqat xatolar, hali koʻrilmaganlar, yodlanmaganlar yoki yulduzchalilar boʻyicha mashq
- Hammasini klaviatura bilan boshqarish mumkin
- Natijalar brauzer xotirasida saqlanadi

Tutuq belgisini qanday yozsangiz ham qabul qiladi (`boʻlmoq`, `bo'lmoq`, `bolmoq`), `was/were` kabi ikki variantning bittasi ham toʻgʻri hisoblanadi.

## A1 soʻzlar

Alohida sahifa: https://ruzmatjs.github.io/irregular-verbs/words.html

- A1 kursining 24 ta unitidagi 1372 ta soʻz (inglizcha — oʻzbekcha), unit va soʻz turkumi boʻyicha
- Ikki usul: javobni yozish yoki kartochka (javobni ochib, «Bildim» / «Bilmadim»)
- Yoʻnalish: inglizcha → oʻzbekcha, oʻzbekcha → inglizcha yoki aralash
- Har bir inglizcha soʻz tagida oʻqilishi oʻzbek harflarida (`workplace — uoʻrkpleys`, `think — θink`) — mashqda, kartochkada, jadvalda va xatolar roʻyxatida
- Oʻzbekcha feʻllar `ishlash`, `ishlamoq`, `ishla` shaklida ham qabul qilinadi, kichik imlo xatosi kechiriladi
- Level, xatolar, yulduzcha, «Yodladim», koʻrilmaganlar filtri va klaviatura — feʻllar sahifasidagidek
- Natijalari feʻllar natijalaridan alohida saqlanadi

## A2 soʻzlar

Alohida sahifa: https://ruzmatjs.github.io/irregular-verbs/a2.html

- A2 kursining 24 ta unitidagi 1028 ta soʻz (unitlar boʻyicha 3000 ta yozuv), A1 sahifasidagi barcha imkoniyatlar bilan
- Turkumlar: otlar, feʻllar, frazali feʻllar, sifatlar, ravishlar, olmoshlar va iboralar
- Bir soʻz bir necha unitda uchrasa, mashqda bir marta soʻraladi va natijasi umumiy; jami sonlar ham takrorsiz
- Natijalari A1 va feʻllar natijalaridan alohida saqlanadi

## A2 Listening va Speaking

Sahifalar: https://ruzmatjs.github.io/irregular-verbs/a2-listening.html va https://ruzmatjs.github.io/irregular-verbs/a2-speaking.html

- Listening: dialogni tinglash (mp3 yoki brauzer ovozi), tezlik, qatorma-qator oʻtish, savollar, matn va tarjimasi
- Speaking: savolga ovoz chiqarib javob berish, oʻzini yozib eshitish (yozuv hech qayerga yuborilmaydi), namuna javob
- Listening'da Student's Book va Workbook'ning 48 ta audiosi (24 + 24 unit) bor: `audio/a2/student/` va `audio/a2/workbook/` (64 kbps mono mp3), matnlari `a2-listening-data.js` da (audiodan avtomatik chiqarilgan, xato boʻlishi mumkin). Bu darslarda savollar va oʻzbekcha tarjima hali yoʻq: darsga `q` va qatorlarga tarjima qoʻshilsa, sahifa oʻzi koʻrsatadi.
- Hozircha har birida bittadan namuna dars bor. Yangi dars — `a2-listening.html` yoki `a2-speaking.html` ichidagi `LESSONS` roʻyxatiga qoʻshiladi (koʻrinishi shu yerda izohda), mp3 fayllar — `audio/` papkasiga

## Statistika

Alohida sahifa: https://ruzmatjs.github.io/irregular-verbs/stats.html

- Barcha boʻlimlar natijalari bitta joyda: bugungi javoblar, ketma-ket mashq qilingan kunlar 🔥, jami yodlangan soʻzlar va aniqlik foizi
- Kunlik faollik grafigi (7, 30 yoki 90 kun): har kuni nechta javob, nechtasi toʻgʻri, nechta soʻz yodlandi
- Har bir boʻlim uchun umumiy yodlash foizi, level boʻyicha taqsimot va eng qiyin 5 ta soʻz
- Kunlik tarix ushbu versiyadan boshlab yoziladi; boshqa oynada mashq qilinsa, sahifa oʻzi yangilanadi

## Tuzilishi

- `ui.css` — barcha sahifalar uchun umumiy koʻrinish, `ui.js` — navigatsiya (boʻlim va koʻnikma qoʻshish uchun `SECTIONS` ga bitta qator yoziladi)
- `lessons.css`, `lessons.js` — listening va speaking uchun umumiy qism, `a2-units.js` — A2 unitlari nomi

## Ishlatish

Server kerak emas: `index.html` (feʻllar), `words.html` (A1 soʻzlar), `a2.html` (A2 soʻzlar), `a2-listening.html`, `a2-speaking.html` yoki `stats.html` (statistika) ni brauzerda ochsangiz kifoya. GitHub Pages uchun `sh build.sh` ularning hammasidan `docs/` ichida toʻliq sahifa yasaydi.
