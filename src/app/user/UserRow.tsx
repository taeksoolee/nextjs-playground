'use client'

import { useRouter } from "next/navigation"

export default function UserRow({
  user
}: {
  user: any
}) {
  const router = useRouter();

  return (
    <div
      className="h-12 border-b-2 border-slate-400 pl-2 cursor-pointer bg-slate-800 hover:bg-slate-700" 
      role="button"
      onClick={() => router.push(`/user/${user.id}`)}
    >
      <div className="h-full flex items-center">{user.first_name}</div>
      {/* <div>{user.last_name}</div> */}
    </div>
  )
}