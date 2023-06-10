import { NextResponse } from "next/server";

import { run, select } from "@/db";
import { Context } from "@/types";

export async function GET(req: Request, context: Context<{ cur: number, perPage: number }, {id: number}>) {
  const id = context.params!.id;

  let user: any = null;
  await run(async (conn) => {
    const result = await select<any>(conn, `select * from users where id = ?;`, [id]);
    [user] = result;
    return;
  });

  return NextResponse.json({
    result: user,
  });
}