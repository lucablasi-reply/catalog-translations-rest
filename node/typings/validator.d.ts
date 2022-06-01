type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string }

interface IValidator<T> {
  go(value: unknown): Result<T>
}
