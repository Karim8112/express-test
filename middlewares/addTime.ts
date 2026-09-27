// declare global {
//   namespace Express {
//     interface Request {
//       requestTime?: string; // نضع علامة الاستفهام لجعلها اختيارية، لأنها لن تتوفر إلا بعد مرور الطلب بهذا الـ Middleware
//     }
//   }
// }

import express from "express";
function AddTimeMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  (req as any).requestTime = new Date().toISOString(); // إضافة توقيت الطلب [11، 12]
  next();
}

export default AddTimeMiddleware;
