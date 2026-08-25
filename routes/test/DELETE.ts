import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;

const router = express.Router();

router.delete(`/tours/:id`, (req, res) => {
  const { id } = req.params;

  let tours = JSON.parse(
    String(
      fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`),
    ),
  );
  let foundTour = tours.find((el: any) => el.id === Number(id));

  if (!foundTour) {
    res.status(404).json({
      message: "element not found",
    });
    // ////////////////////////////////
  } else {
    tours = tours.filter((el: any) => el.id !== foundTour.id);
    // ---------------------------------
    console.log(tours);
    fs.writeFile(
      `${__dirname}/../../dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        if (err) {
          res.status(404).json({
            message: "failed to delete",
          });
        } else {
          res.status(200);
        }
      },
    );
    res.status(200);
    res.json(null);
  }
});

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default router;
