export type Optional<T> = { [P in keyof T]?: T[P] };

export type Context<SP={}, P={}> = {
  searchParams: SP
  params: P
}