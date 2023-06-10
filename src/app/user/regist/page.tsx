import { getroleList } from "@/app/api/users/route";
import BackButton from "@/components/BackButton";
import RegistForm from "./RegistForm";

const fetchroles = async () => {
  return await getroleList();
}

export default async function UserRegist() {
  const roles = await fetchroles();

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-2xl">User Regist Form</h2>
      </div>
      <div>
        <BackButton />
      </div>
      <div className="mt-2">
        <RegistForm roles={roles} />
      </div>
    </div>
  )
}