import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;

const router = express.Router();

router.get(`/tours/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);

  const tours = JSON.parse(
    String(
      fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`),
    ),
  );

  const tour = tours.find((el: any) => el?.id === Number(id));

  if (!tour) {
    res.status(404).json({
      message: "element not found",
    });
  } else {
    res.status(200);
    res.json({
      status: "success",
      data: {
        ...tour,
      },
    });
  }
});

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default router;

// import functions from controllers

// export router.
// route(`route`).
// get(function).
// get(getone).
// post(,,)
// .patch()
// .delete()

// inside the app.ts, use(`/${baseURL}`, toursRoute)
