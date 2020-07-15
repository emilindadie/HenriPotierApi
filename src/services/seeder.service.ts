import { Injectable, Logger } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly cardService: CardService,
  ) {}
  async seed() {
    await this.cards()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding cards...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding cards...');
        Promise.reject(error);
      });
  }
  async cards() {
    return await Promise.all(this.cardService.seedInit())
      .then(createdCards=> {
        this.logger.debug(
          'No. of cards created : ' +
            createdCards.filter(
              nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}