import mongoose from "mongoose";
export declare const Project: mongoose.Model<{
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name?: string | null;
    donor?: string | null;
    value?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    projectType?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Project.d.ts.map