import { Module, Logger } from '@nestjs/common';
import { CardModule } from '../card/card.module';
import { SeederService } from 'src/services/seeder.service';


@Module({
    imports: [CardModule],
    providers: [SeederService, Logger],
  })
  export class SeederModule {}
