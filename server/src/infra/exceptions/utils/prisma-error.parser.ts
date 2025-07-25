import { Prisma } from "@prisma/client";

export function parsePrismaError(error: any): { message: string; statusCode: number } | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = error.meta?.target as string[] | undefined;
        const fieldList = target?.join(", ") ?? "unknown field";
        return {
          statusCode: 409,
          message: `Unique constraint failed on: ${fieldList}`,
        };
      }
      case "P2025":
        return {
          statusCode: 404,
          message: "Requested record not found",
        };
      default:
        return {
          statusCode: 500,
          message: `Prisma error: ${error.message}`,
        };
    }
  }

  return null;
}
