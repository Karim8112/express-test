import fs from "fs";
import express from "express";
const __dirname = import.meta.dirname;
function GetAllTours(req, res) {
    const tours = JSON.parse(String(fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)));
    res.status(200);
    res.json({
        status: "success",
        size: tours.length,
        data: {
            tours,
        },
    });
}
export default GetAllTours;
//# sourceMappingURL=GET_ALL.js.map