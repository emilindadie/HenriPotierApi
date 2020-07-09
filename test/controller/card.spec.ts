import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from 'src/entities';
import { CardService } from 'src/services/card.service';
import { CardController } from 'src/controllers/card.controller';
import { cardDto, icard } from 'test-files';
import { ICard } from 'src/models';

describe('CardController', () => {
  let module: TestingModule;
  let controller: CardController;
  let service: CardService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CardService,
          {
              provide: getRepositoryToken(CardEntity),
              useClass: Repository,
          },
      ],
      controllers: [CardController],
    }).compile();
    controller = module.get<CardController>(CardController);
    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
      expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    // Arrange
    const intputCardDto = cardDto;
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue(icard);

    // Act
    const ouput: ICard = await controller.create(intputCardDto);

    // Assert
    expect(ouput.id).toBeDefined();
    expect(createSpy).toHaveBeenCalled();
  });
});
