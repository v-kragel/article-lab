import { FieldRepository, FieldService } from "@app/modules/field";
import { Prisma } from "@prisma/client";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

describe("FieldService", () => {
  let service: FieldService;
  let repository: FieldRepository;

  const fieldRepoMock = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldService,
        {
          provide: FieldRepository,
          useValue: fieldRepoMock,
        },
      ],
    }).compile();

    service = module.get<FieldService>(FieldService);
    repository = module.get<FieldRepository>(FieldRepository);

    jest.clearAllMocks();
  });

  it("should return all fields from repository", async () => {
    const mockFields: Prisma.FieldCreateInput[] = [
      {
        id: randomUUID(),
        name: "Field 1",
        type: "string",
      },
      {
        id: randomUUID(),
        name: "Field 2",
        type: "string",
      },
    ];

    fieldRepoMock.findAll.mockResolvedValue(mockFields);

    const result = await service.getAll();

    expect(result).toEqual(mockFields);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array if no fields found", async () => {
    fieldRepoMock.findAll.mockResolvedValue([]);

    const result = await service.getAll();

    expect(result).toEqual([]);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if repository throws", async () => {
    fieldRepoMock.findAll.mockRejectedValue(new Error("Database Error"));

    await expect(service.getAll()).rejects.toThrow("Database Error");
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });
});
