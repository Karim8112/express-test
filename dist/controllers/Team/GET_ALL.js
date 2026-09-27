import express from "express";
import { Team } from "../../models/Team.js";
async function GetAllTeam(req, res) {
    try {
        const team = await Team.find();
        res.status(200).json({
            status: "sucess",
            results: team.length,
            data: { team },
        });
    }
    catch { }
}
export default GetAllTeam;
//# sourceMappingURL=GET_ALL.js.map