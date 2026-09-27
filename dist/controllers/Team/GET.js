import { Team } from "../../models/Team.js";
import express from "express";
async function GetTeamById(req, res) {
    const { id } = req.params;
    try {
        const team_member = await Team.findById(id);
        res.status(200).json({
            status: "success",
            data: {
                ...team_member,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
}
// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل
export default GetTeamById;
//# sourceMappingURL=GET.js.map