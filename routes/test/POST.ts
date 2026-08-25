import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;

const router = express.Router();

router.post(`/tours`, (req, res) => {
  const tours = JSON.parse(
    String(
      fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`),
    ),
  );
  // 1. حساب الـ ID الجديد بناءً على آخر عنصر [4]
  const newId = tours[tours.length - 1].id + 1;

  console.log(req.body);
  // 2. دمج الـ ID مع البيانات المستلمة لإنشاء كائن المورد الجديد [7، 8]
  const newTour = { id: newId, ...req.body };
  // 3. إضافة المورد الجديد إلى المصفوفة في الذاكرة المؤقتة [5]
  tours.push(newTour);

  // 4. كتابة المصفوفة الجديدة كاملة داخل ملف الـ JSON بشكل غير حاصر (Async) [8، 9]
  fs.writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // تحويل كائن الـ JS إلى نص JSON [9، 10]
    (err) => {
      // الكولباك ينفذ بعد اكتمال الكتابة في الخلفية [6]
      if (err) {
        res.status(500);
        res.json({
          message: "data type error",
        });
      }
      // 5. إرسال الاستجابة للعميل بحالة 201 (Created) [8]
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour, // إرجاع العنصر الجديد الذي تم إنشاؤه تأكيداً للعملية [8]
        },
      });
    },
  );
});

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default router;

// ------------------------------------------------------------------
