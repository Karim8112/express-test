import mongoose from "mongoose";
export declare const Team: mongoose.Model<{
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
}, mongoose.Document<unknown, {}, {
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title?: string | null;
    address?: string | null;
    email?: string | null;
    phoneNumberS: string[];
    summary?: string | null;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags: string[];
    skills: string[];
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Team.d.ts.map