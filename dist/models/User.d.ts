import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name?: string | null;
    userName?: string | null;
    password?: string | null;
    startDate?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map