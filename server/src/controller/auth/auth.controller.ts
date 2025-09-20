


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
      const refreshToken = req.cookies?.refreshToken;
      
      if (!refreshToken) {
         res.status(401).json({ message: "No refresh token" });
         return;
      }

      const { accessToken, refreshToken: newRefreshToken } = await this._authService.refreshToken(refreshToken);
  
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
            
      const refreshToken = req.cookies?.refreshToken;
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
