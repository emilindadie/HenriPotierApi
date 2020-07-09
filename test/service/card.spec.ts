import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardService } from '../../src/services/card.service';
import { CardEntity } from '../../src/entities';
import { cardDto, icard }  from '../../test-files';

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
    const intputcardDto = cardDto;
    const createSpy = jest.spyOn(repository, 'save').mockResolvedValue(icard);

    // Act
    const ouput: ICard = await service.create(intputcardDto);

    // Assert
    expect(ouput.id).toBeDefined();
    expect(createSpy).toHaveBeenCalled();
  });
});
