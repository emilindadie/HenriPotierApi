import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from '../../src/entities';
import { CardService } from '../../src/services/card.service';
import { cardDtoMock, icardMock, getAllCardMock, oneCardDtoMock } from '../../test-files';
import { ICard } from '../../src/models';
import { ApiResponse } from 'src/models/api-response/api-response.model';
import { SecureCardController } from 'src/controllers/secure-card.controller';

describe('SecureCardController', () => {
  let module: TestingModule;
  let controller: SecureCardController;
  let service: CardService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CardService,
          {
              provide: getRepositoryToken(CardEntity),
              useClass: Repository,
          },
      ],
      controllers: [SecureCardController],
    }).compile();
    controller = module.get<SecureCardController>(SecureCardController);
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


  it('should get one card', async () => {
    const intputOneCardDto = oneCardDtoMock;
    const getAllSpy = jest.spyOn(service, 'getOne').mockResolvedValue(icardMock);

    const output: ApiResponse<ICard> = await controller.getOne(intputOneCardDto);

    expect(output.data.id).toBeDefined();
    expect(getAllSpy).toHaveBeenCalled();
  });
});
