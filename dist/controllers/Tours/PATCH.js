import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;
function patchTour(req, res) {
    const { id } = req.params;
    let tours = JSON.parse(String(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)));
    let foundTour = tours.find((el) => el.id === Number(id));
    if (!foundTour) {
        res.status(404).json({
            message: "element not found",
        });
    }
    else {
        foundTour = { ...foundTour, ...req.body };
        tours = tours.filter((el) => el.id != foundTour.id);
        tours.push(foundTour);
        fs.writeFile(`${__dirname}/../../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
            if (err) {
                res.status(404).json({
                    message: "failed to update",
                });
            }
            else {
                res.json({
                    status: "success",
                    data: {
                        ...foundTour,
                    },
                });
            }
        });
        res.status(200);
    }
}
// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل
export default patchTour;
//# sourceMappingURL=PATCH.js.map