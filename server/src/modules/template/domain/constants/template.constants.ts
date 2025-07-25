export const TEMPLATE_ERRORS = {
  NOT_FOUND: "Template not found or already deleted",
  NAME_EXISTS: "Template with this name already exists",
  FIELDS_NOT_FOUND: (ids: string[]) => `Template field(s) not found: ${ids.join(", ")}`,
};
