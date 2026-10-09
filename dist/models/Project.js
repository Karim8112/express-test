import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the project name"],
    },
    donor: {
        type: String,
        required: false,
    },
    value: {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    projectType: {
        type: String,
        required: [true, "please add the project type"],
    },
});
export const Project = mongoose.model("Project", ProjectSchema);
//# sourceMappingURL=Project.js.map