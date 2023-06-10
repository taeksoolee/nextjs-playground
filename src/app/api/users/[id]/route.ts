import { NextResponse } from "next/server";

import { run, select } from "@/db";
import { Context } from "@/types";

export async function getUser(id: number) {
  let user: any = null;
  await run(async (conn) => {
    const result = await select<any>(conn, `select 
    u.*, r.role_name 
    from users u left join roles r on u.role_id = r.id
    where u.id = ?;`, [id]);
    [user] = result;
    return;
  });

  return {
    result: user,
  };
}

export async function GET(req: Request, context: Context<{ cur: number, perPage: number }, {id: number}>) {
  const id = context.params!.id;

  const r = await getUser(id);

  return NextResponse.json({
    result: r.result,
  });
}