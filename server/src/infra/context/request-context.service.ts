import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

interface ContextData {
  [key: string]: any;
}

@Injectable()
export class RequestContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<ContextData>();

  run<T>(fn: () => T, context: ContextData): T {
    return this.asyncLocalStorage.run(context, fn);
  }

  get<T = any>(key: string): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store ? (store[key] as T) : undefined;
  }

  set(key: string, value: any): void {
    const store = this.asyncLocalStorage.getStore();

    if (store) {
      store[key] = value;
    }
  }
}
