import { Project } from "../../models/Project.js";
import express from "express";
async function deleteProject(req, res) {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndDelete(id);
        res.status(200).json({ status: "success", data: { project } });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
}
// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل
export default deleteProject;
//# sourceMappingURL=DELETE.js.map