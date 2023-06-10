'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UserDto {
  firstName: string;
  lastName: string;
  role: string;
}

export default function RegistForm({
  roles
}: {
  roles: any[]
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    // watch,
    formState: {
      errors
    },
  } = useForm<UserDto>({
    defaultValues: {
      firstName: '',
      lastName: '',
      role: `${roles[0].id ?? 0}`
    },
    // shouldFocusError: true,
  });

  const onSubmit = (data: UserDto) => {
    console.log(errors);
    console.log(data)

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      console.log(res);
      router.push('/user')
    })
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label className="inline-block w-20 mr-2">firstName</label>
        <input className="px-2 text-slate-800" autoComplete="off" {...register('firstName', {
          required: {
            message: '값을 입력해주세요.',
            value: true
          },
          maxLength: {
            message: '20자 이하로 입력해주세요.',
            value: 20,
          },
        })} />
        {errors.firstName && <div className="ml-20 pl-2">
          {errors.firstName.message}
        </div>}
      </div>
      <div className="mb-2">
        <label className="inline-block w-20 mr-2">lastName</label>
        <input className="px-2 text-slate-800" autoComplete="off" {...register('lastName', {
          maxLength: {
            message: '20자 이하로 입력해주세요.',
            value: 20
          },
          // validate() {}
        })} />
        {errors.lastName && <div className="ml-20 pl-2">
          {errors.lastName.message}
        </div>}
      </div>
      <div className="mb-2">
      <label className="inline-block w-20 mr-2">role</label>
        <select className="px-2 text-slate-800" {...register('role')}>
          {roles.map(role => <option key={role.id} value={role.id}>{role.role_name}</option>)}
        </select>
      </div>

      <div className="mt-4">
        <button type="submit">Submit</button>
      </div>
    </form>

  )
}