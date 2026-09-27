import express from "express";
import { Team } from "../../models/Team.js";
const PostTeam = async (req, res) => {
    try {
        const success = await Team.create(req.body);
        if (success) {
            res.status(201).json({
                status: "success",
                data: {
                    team_member: req.body,
                },
            });
        }
        else {
            res.status(400).json({
                status: "failed",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
};
// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل
export default PostTeam;
// ------------------------------------------------------------------
//# sourceMappingURL=POST.js.map