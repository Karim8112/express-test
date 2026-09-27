import express from "express";
import { Project } from "../../models/Project.js";
async function GetAllProject(req, res) {
    try {
        const projects = await Project.find();
        res.status(200).json({
            status: "sucess",
            results: projects.length,
            data: { projects },
        });
    }
    catch { }
}
export default GetAllProject;
//# sourceMappingURL=GET_ALL.js.map