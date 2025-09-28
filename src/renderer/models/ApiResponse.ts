export interface ApiResponse<T> {
  error: string | null;
  content: T;
}
