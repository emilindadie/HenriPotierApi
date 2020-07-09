import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';
import { SecureCardService } from 'src/services/secure-card.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly secureCardService: SecureCardService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWTSECRET,
        });
    }

    async validate(payload: any) {
       const card = await this.secureCardService.validateCard(payload.id);
       const dateNow = new Date();
        if (!card || card.expiration.getTime() > dateNow.getTime()){
            throw new UnauthorizedException();
        }
        return card;
    }
}