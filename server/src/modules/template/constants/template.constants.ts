export const TEMPLATE_ERRORS = {
  NOT_FOUND: "Template not found",
  FIELDS_NOT_FOUND: (ids: string[]) => `Field(s) not found: ${ids.join(", ")}`,
};
