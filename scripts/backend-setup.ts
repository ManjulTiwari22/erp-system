// NestJS Backend Setup Script
// This would typically be in a separate backend project

const backendStructure = {
  "src/main.ts": `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
  `,
  
  "src/app.module.ts": `
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, ModulesModule, UsersModule],
})
export class AppModule {}
  `,
  
  "src/auth/auth.module.ts": `
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
  `,
  
  "src/auth/auth.service.ts": `
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Demo validation - replace with real user validation
    if (username === 'admin' && password === 'password') {
      return { id: 1, username: 'admin', role: 'administrator' };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
  `,
  
  "src/auth/auth.controller.ts": `
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.authService.login(user);
  }
}
  `
}

console.log('NestJS Backend Structure:')
console.log(JSON.stringify(backendStructure, null, 2))

// Instructions for setting up the backend
console.log(`
To set up the NestJS backend:

1. Create a new NestJS project:
   npm i -g @nestjs/cli
   nest new erp-backend

2. Install required dependencies:
   npm install @nestjs/jwt @nestjs/passport passport passport-jwt

3. Create the file structure shown above

4. Run the backend:
   npm run start:dev

The backend will run on http://localhost:3001
`)
