import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;

const router = express.Router();

router.get(`/tours`, (req, res) => {
  const tours = JSON.parse(
    String(
      fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`),
    ),
  );
  res.status(200);
  res.json({
    status: "success",
    size: tours.length,
    data: {
      tours,
    },
  });
});

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default router;
