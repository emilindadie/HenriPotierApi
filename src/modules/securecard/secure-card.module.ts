import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/Config/passport';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CardModule } from '../card/card.module';
import { SecureCardService } from 'src/services/secure-card.service';
import { SecureCardController } from 'src/controllers/secure-card.controller';

@Module({
  imports: [
    CardModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: process.env.JWTSECRET,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN }
    })
],
  providers: [SecureCardService, JwtStrategy],
  exports: [SecureCardService],
  controllers: [SecureCardController],
})
export class SecureCardModule {}
