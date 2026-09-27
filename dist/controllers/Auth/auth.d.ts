import express from "express";
interface AuthRequestBody {
    userName?: string;
    password?: string;
}
declare function login(req: express.Request<AuthRequestBody>, res: express.Response): Promise<void>;
export default login;
//# sourceMappingURL=auth.d.ts.map