import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private users: UsersService) {}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { token, user } = await this.authService.login(dto);
		const isProd = process.env.NODE_ENV === 'production';
		const cookieOptions: any = {
			httpOnly: true,
			sameSite: isProd ? 'none' : 'lax',
			secure: isProd,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		};
		if (isProd && process.env.COOKIE_DOMAIN) {
			cookieOptions.domain = process.env.COOKIE_DOMAIN;
		}
		// Fallback: do NOT set domain if not specified, to maximize compatibility
		res.cookie('access_token', token, cookieOptions);
		return { user };
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('access_token');
		return { success: true };
	}

	@Get('me')
	@UseGuards(AuthGuard('jwt'))
	async me(@Req() req: any) {
        console.log('Auth /me request', {
          cookies: req.cookies,
          headers: req.headers,
          origin: req.headers.origin,
        });
		const userId = req.user?.userId;
		const user = await this.users.findById(userId);
		return { user };
	}
}

