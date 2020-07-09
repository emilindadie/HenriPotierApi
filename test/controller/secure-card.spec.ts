import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from '../../src/entities';
import { CardService } from '../../src/services/card.service';
import { cardDtoMock, icardMock, getAllCardMock, oneCardDtoMock, cardTransactionDtoMock } from '../../test-files';
import { ICard } from '../../src/models';
import { ApiResponse } from '../../src/models/api-response/api-response.model';
import { SecureCardController } from '../../src/controllers/secure-card.controller';
import { SecureCardService } from '../../src/services/secure-card.service';

describe('SecureCardController', () => {
  let module: TestingModule;
  let controller: SecureCardController;
  let service: CardService;
  let secureService: SecureCardService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CardService, SecureCardService,
          {
              provide: getRepositoryToken(CardEntity),
              useClass: Repository,
          },
      ],
      controllers: [SecureCardController],
    }).compile();
    controller = module.get<SecureCardController>(SecureCardController);
    service = module.get<CardService>(CardService);
    secureService = module.get<SecureCardService>(SecureCardService);
  });

  it('should be defined', () => {
      expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    // Arrange
    const inputCardDto = cardDtoMock;
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue(icardMock);

    // Act
    const output: ApiResponse<ICard> = await controller.create(inputCardDto);

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
    const inputOneCardDto = oneCardDtoMock;
    const getOneSpy = jest.spyOn(service, 'getOne').mockResolvedValue(icardMock);

    const getOneSpyToken = jest.spyOn(secureService, 'createToken').mockResolvedValue({
      accessToken: '',
      data: icardMock
    });

    const output: ApiResponse<ICard> = await controller.getOne(inputOneCardDto);

    expect(output.data.id).toBeDefined();
    expect(getOneSpy).toHaveBeenCalled();
    expect(getOneSpyToken).toHaveBeenCalled();
  });

  it('should do a transaction', async () => {
    const inputcardTransactionDto = cardTransactionDtoMock;

    const createTransactionSpy = jest.spyOn(service, 'doTransaction').mockResolvedValue(icardMock);

    const output: ApiResponse<ICard> = await controller.doTransaction(inputcardTransactionDto);

    expect(output.data.id).toBeDefined();
    expect(createTransactionSpy).toHaveBeenCalled();
  });
});
