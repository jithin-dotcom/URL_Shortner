


import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../services/auth/IAuthServices";

export class AuthController {
  
  constructor(private _authService: IAuthService) {}
  

  async register(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { name, email, password } = req.body;
      const { user, accessToken, refreshToken } = await this._authService.register(
        name,
        email,
        password
      );

      
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

      res.status(201).json({ user, accessToken });
    } catch (err) {
      next(err);
    }
  };



  async login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this._authService.login(
        email,
        password
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ user, accessToken });
    } catch (err) {
      next(err);
    }
  };




  async refresh(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
    //   const refreshToken = req.cookies?.refreshToken;
    //   console.log("refreshToken : ",refreshToken);
      const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2JlMzdlY2MzZGY2MDVlMTgwNDllMiIsImlhdCI6MTc1ODI4MjA5MiwiZXhwIjoxNzU4ODg2ODkyfQ.7qJvV-I1cg-osfqF0sBuc0svDFGPEUjeZ_8Hbk2MczA"
      if (!refreshToken) {
         res.status(401).json({ message: "No refresh token" });
         return;
      }


      const { accessToken, refreshToken: newRefreshToken } =
        await this._authService.refreshToken(refreshToken);

      
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (err) {
      next(err);
    }
  };




  async logout(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
    //   const refreshToken = req.cookies?.refreshToken;
    const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2Q0MWUwOTllY2JiNTU5NjNmYzc2NyIsImlhdCI6MTc1ODI4MjQ3NiwiZXhwIjoxNzU4ODg3Mjc2fQ.suqLVgw8Xw9W1sWxxlyNbb87IyHF1UOYcaFxdm-PLe4" 
      if (refreshToken) {
        await this._authService.logout(refreshToken);
      }

      res.clearCookie("refreshToken");
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  };




  async me(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const userId = (req as any).userId;
      const result = await this._authService.me(userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };


}
