export type ErrorType =
  "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "SERVER" | "MAINTENANCE";

export class GlobalAppError extends Error {
  type: ErrorType;
  status?: number;

  constructor(type: ErrorType, message?: string, status?: number) {
    super(message);
    this.type = type;
    this.status = status;
  }
}
