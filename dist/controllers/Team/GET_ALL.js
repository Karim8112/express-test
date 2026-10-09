import express from "express";
import { Team } from "../../models/Team.js";
async function GetAllTeam(req, res) {
    try {
        const team = await Team.find();
        res.status(200).json({
            status: "success",
            results: team.length,
            data: team,
        });
    }
    catch {
        res.status(400).json({
            status: "fail",
            message: "Failed to fetch teams",
        });
    }
}
export default GetAllTeam;
//# sourceMappingURL=GET_ALL.js.map