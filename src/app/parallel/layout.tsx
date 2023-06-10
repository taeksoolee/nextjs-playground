import { PropsWithChildren, ReactNode } from "react";

export default function ParallelLayout({
  children, foo, bar
}: PropsWithChildren<{
  foo: ReactNode,
  bar: ReactNode
}>) {
  return (
    <div>
      <h1>Parallel Page</h1>
      {children}
      <section>
        {foo}
      </section>
      <section>
        {bar}
      </section>
    </div>
  )
}