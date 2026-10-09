import { Project } from "../../models/Project.js";
import express from "express";
async function GetProjectById(req, res) {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        res.status(200).json(project);
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
}
// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل
export default GetProjectById;
//# sourceMappingURL=GET.js.map