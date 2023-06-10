import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'hello page!',
}

const Hello: React.FC<{}> = ({ }) => {
  
  return (
    <>
      <div>Hello World!</div>
      <Link href="/hello/world">Go World Page!</Link>
    </>
  )
}

export default Hello;