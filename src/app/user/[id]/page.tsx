import { getUser } from "@/app/api/users/[id]/route";
import BackButton from "@/components/BackButton";

async function getUserDetail(id: number) {
  return getUser(id);
}

export default async function UserDetail(context: {
  params: { id: string },
  searchParams: {},
}) {

  const user = await getUserDetail(parseInt(context.params.id));

  if(!user.result) {
    return (
      <div>
        <h2 className="text-2xl">Unknown User</h2>
        <div>
          <BackButton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-2">
        <h2 className="text-2xl">User Detail</h2>
      </div>
      <div>
        <BackButton />
      </div>
      <div className="mt-2">
        <div>FirstName : {user.result.first_name}</div>
        <div>LastName : {user.result.last_name}</div>
        <div>Role : {user.result.role_name}</div>
        <div>UreatedAt : {new Date(user.result.updated_at).toString()}</div>
      </div>
    </div>
  )
}