import { PageStatus } from "@/enums/PageStatus";
import Link from "next/link";
import { getUserList } from "../api/users/route";

const PER_PAGE = 3;

async function getUsers(cur: string) {
  // return fetch(`http://localhost:3000/api/users?cur=${cur}&perPage=2`)
  //   .then(res => res.json());

  return await getUserList(parseInt(cur), PER_PAGE);
}

export default async function User(context: {
  params: {},
  searchParams: {
    cur?: string
  },
}) {
  const {cur='1'} = context.searchParams;
  const users: {result: any[], paging: any}  = await getUsers(cur);
  
  return (
    <div>
      {users.result.map(user => (
        <div key={user.id} className="h-12">
          <div>{user.first_name}</div>
          {/* <div>{user.last_name}</div> */}
        </div>
      ))}
      {Array.from({length: PER_PAGE - users.result.length}).map((_, index) => (
        <div key={index} className="h-12">
        </div>
      ))}
      <div>
        {users.paging.curStatus !== PageStatus.IS_FIRST
        ? <Link href={`/user?cur=${parseInt(cur)-1}`} className="px-2">&lt;</Link>
        : <span className="px-2 text-gray-400">&lt;</span>}

        {users.paging.curStatus !== PageStatus.IS_END
        ? <Link href={`/user?cur=${parseInt(cur)+1}`} className="px-2">&gt;</Link>
        : <span className="px-2 text-gray-400">&gt;</span>}
      </div>
    </div>
  )
}