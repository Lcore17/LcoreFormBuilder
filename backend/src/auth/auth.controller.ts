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
	async login(@Body() dto: LoginDto) {
		const { token, user } = await this.authService.login(dto);
		// Return JWT in response body for frontend to store in localStorage
		return { token, user };
	}

	@Post('logout')
	async logout() {
		// No cookie to clear; frontend should remove JWT from localStorage
		return { success: true };
	}

	@Get('me')
	@UseGuards(AuthGuard('jwt'))
	async me(@Req() req: any) {
		// AuthGuard will extract JWT from Authorization header
		const userId = req.user?.userId;
		const user = await this.users.findById(userId);
		return { user };
	}
}

