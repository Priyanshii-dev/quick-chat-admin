import { GlobalAppError } from "./app-error";

export function mapApiError(status: number) {
  switch (status) {
    case 401:
      throw new GlobalAppError("UNAUTHORIZED");

    case 403:
      throw new GlobalAppError("FORBIDDEN");

    case 404:
      throw new GlobalAppError("NOT_FOUND");

    case 503:
      throw new GlobalAppError("MAINTENANCE");

    default:
      throw new GlobalAppError("SERVER");
  }
}
