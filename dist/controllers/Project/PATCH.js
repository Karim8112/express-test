import { Project } from "../../models/Project.js";
import express from "express";
async function patchProject(req, res) {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
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
export default patchProject;
//# sourceMappingURL=PATCH.js.map