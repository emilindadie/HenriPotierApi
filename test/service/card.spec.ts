import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardService } from '../../src/services/card.service';
import { CardEntity } from '../../src/entities';
import { cardDtoMock, icardMock, getAllCardMock, cardTransactionDtoMock }  from '../../test-files';

import { ICard } from '../../src/models';

describe('CardService', () => {
  let module: TestingModule;
  let service: CardService;
  let repository: Repository<CardEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CardService,
        {
          provide: getRepositoryToken(CardEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<CardService>(CardService);
    repository = module.get<Repository<CardEntity>>(getRepositoryToken(CardEntity));
  });

  it('should be defined', () => {
      expect(service).toBeDefined();
  });

  it('should create a card', async () => {
    // Arrange
    const intputcardDto = cardDtoMock;
    const findOneSpy = jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    const createSpy = jest.spyOn(repository, 'save').mockResolvedValue(icardMock);

    // Act
    const output: ICard = await service.create(intputcardDto);

    // Assert
    expect(output.id).toBeDefined();
    expect(findOneSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should get all card', async () => {
    const getAllSpy = jest.spyOn(repository, 'find').mockResolvedValue(getAllCardMock);

    const output: ICard[] = await service.getAll();

    expect(output).toBeInstanceOf(Array);
    expect(getAllSpy).toHaveBeenCalled();
  });


  it('should do a transaction', async () => {
    const intputcardTransactionDto = cardTransactionDtoMock;

    const findOneSpy = jest.spyOn(repository, 'findOne').mockResolvedValue(icardMock);

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(icardMock);
    const output: ICard = await service.doTransaction(intputcardTransactionDto.cardId, intputcardTransactionDto.amount);

    expect(output.id).toBeDefined();
    expect(findOneSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
  });
});
