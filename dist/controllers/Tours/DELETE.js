import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;
function DeleteTour(req, res) {
    const { id } = req.params;
    let tours = JSON.parse(String(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)));
    let foundTour = tours.find((el) => el.id === Number(id));
    if (!foundTour) {
        res.status(404).json({
            message: "element not found",
        });
        // ////////////////////////////////
    }
    else {
        tours = tours.filter((el) => el.id !== foundTour.id);
        // ---------------------------------
        console.log(tours);
        fs.writeFile(`${__dirname}/../../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
            if (err) {
                res.status(404).json({
                    message: "failed to delete",
                });
            }
            else {
                res.status(200);
            }
        });
        res.status(200);
        res.json(null);
    }
}
export default DeleteTour;
//# sourceMappingURL=DELETE.js.map