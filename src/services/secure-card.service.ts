import { CardService } from "./card.service";
import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { ICard } from "src/models";

@Injectable()
export class SecureCardService {
  constructor(private cardService: CardService) {}

  async validateCard(id: number): Promise<ICard> {
    return await this.cardService.getCardById(id);
  }

  async createToken(data : any){
    const payload = { id: data.id };
    const accessToken = sign(payload, process.env.JWTSECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIREIN });
    return {
        accessToken: accessToken,
        data: data,
    };
  }
}