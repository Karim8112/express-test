import mongoose from "mongoose";
export declare const Team: mongoose.Model<{
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
}, mongoose.Document<unknown, {}, {
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    address?: string | null;
    email?: string | null;
    phoneNumberS?: string[] | null;
    summary: string;
    imageLeft?: string | null;
    imageRight?: string | null;
    tags?: string[] | null;
    skills: string[];
    experience?: mongoose.Types.DocumentArray<{
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }, {}, {}> & {
        role: string;
        period: string;
        company: string;
        description?: string | null;
    }> | null;
    education: string[];
    languages: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Team.d.ts.map