import { PageStatus } from "@/enums/PageStatus";
import Link from "next/link";
import { getUserList } from "../api/users/route";
import UserRow from "./UserRow";

const PER_PAGE = 3;

async function getUsers(cur: string) {
  // return fetch(`http://localhost:3000/api/users?cur=${cur}&perPage=2`)
  //   .then(res => res.json());

  return await getUserList(parseInt(cur), PER_PAGE);
}

export default async function User(context: {
  searchParams: {
    cur?: string
  },
}) {
  const {cur='1'} = context.searchParams;
  const users: {result: any[], paging: any}  = await getUsers(cur);
  
  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl">User List</h1>
      </div>
      <div className="w-80 flex justify-between">
        <div>
          {users.paging.curStatus !== PageStatus.IS_FIRST
          ? <Link href={`/user?cur=${parseInt(cur)-1}`} className="px-2">&lt;</Link>
          : <span className="px-2 text-gray-400">&lt;</span>}

          <span>{cur} / {users.paging.pageCnt}</span>
          {users.paging.curStatus !== PageStatus.IS_END
          ? <Link href={`/user?cur=${parseInt(cur)+1}`} className="px-2">&gt;</Link>
          : <span className="px-2 text-gray-400">&gt;</span>}
        </div>
        <div>
          <Link href="/user/regist" className="text-lg">+</Link>
        </div>
      </div>
      <div className="w-80">
        {users.result.map(user => (
          <UserRow key={user.id} user={user} />
        ))}
        {Array.from({length: PER_PAGE - users.result.length}).map((_, index) => (
          <div key={index} className="h-12">
          </div>
        ))}
      </div>
    </div>
  )
}