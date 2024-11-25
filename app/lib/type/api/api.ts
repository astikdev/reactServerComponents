export enum StatusCode {
  Unauthorized = 401,
  Success = 200,
}

export interface ApiResponse {
  status: boolean;
  message?: string;
}

export enum LoadingState {
  NONE = "NONE",
  SUBMIT = "SUBMIT",
  DELETE = "DELETE",
}
