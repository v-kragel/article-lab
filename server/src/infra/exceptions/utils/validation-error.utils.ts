import { ValidationError } from "@nestjs/common";

export function extractValidationErrors(errors: ValidationError[], parentPath = ""): string[] {
  return errors.flatMap((error) => {
    const propertyPath = parentPath
      ? Array.isArray(error.target)
        ? `${parentPath}[${error.property}]`
        : `${parentPath}.${error.property}`
      : error.property;

    const messages = error.constraints
      ? Object.values(error.constraints).map((msg) => `${propertyPath}: ${msg}`)
      : [];

    const childrenMessages = error.children?.length
      ? extractValidationErrors(error.children, propertyPath)
      : [];

    return [...messages, ...childrenMessages];
  });
}
