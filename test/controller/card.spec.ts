import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from '../../src/entities';
import { CardService } from '../../src/services/card.service';
import { CardController } from '../../src/controllers/card.controller';
import { cardDtoMock, icardMock, getAllCardMock } from '../../test-files';
import { ICard } from '../../src/models';
import { ApiResponse } from 'src/models/api-response/api-response.model';

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
    const intputCardDto = cardDtoMock;
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue(icardMock);

    // Act
    const output: ApiResponse<ICard> = await controller.create(intputCardDto);

    // Assert
    expect(output.data.id).toBeDefined();
    expect(createSpy).toHaveBeenCalled();
  });


  it('should get all card', async () => {
    const getAllSpy = jest.spyOn(service, 'getAll').mockResolvedValue(getAllCardMock);

    const output: ApiResponse<ICard[]> = await controller.getAll();

    expect(output.data).toBeInstanceOf(Array);
    expect(getAllSpy).toHaveBeenCalled();
  });
});
