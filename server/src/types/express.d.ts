import { REQUEST } from "@app/constants";
import "express";

declare module "express" {
  export interface Request {
    [REQUEST.REQUEST_ID_TOKEN]?: string;
  }
}
