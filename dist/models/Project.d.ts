import mongoose from "mongoose";
export declare const Project: mongoose.Model<{
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    donor?: string | null;
    value?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    projectType: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Project.d.ts.map