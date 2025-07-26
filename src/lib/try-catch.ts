type Success<T> = {
  data: T
  error: null
}

type Failure<TError> = {
  data: null
  error: TError
}

type Result<T, TError = Error> = Success<T> | Failure<TError>

export async function tryCatch<T, TError = Error>(
  promise: Promise<T>,
): Promise<Result<T, TError>> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as TError }
  }
}
