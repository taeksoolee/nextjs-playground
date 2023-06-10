import { run, select } from "@/db";
import { PageStatus } from "@/enums/PageStatus";
import { Context } from "@/types";
import { NextResponse } from "next/server";


export const totalUserSQL = `
select count(*) as count from users
`;

export const paginationUserListSQL = `
select * from (
	select u.*, ROW_NUMBER() over (order by id desc) as row_num from users as u
) as u where u.row_num >= ? limit ?;
`;

export const getUserList = async (cur: number, perPage: number) => {
  const list: any[] = [];
  const paging = {
    pageCnt: 0,
    total: 0,
    curStatus: PageStatus.NORMAL, // 1: start, 2 : end
  }
  await run(async (conn) => {
    const [totalResult] = await select<{count: number}[]>(conn, totalUserSQL);
    const total = totalResult.count;
    
    const start = ((cur-1) * perPage) + 1;
    paging.total = total;
    paging.pageCnt = Math.ceil(total/perPage);

    if (cur <= 1) paging.curStatus = PageStatus.IS_FIRST;
    if (cur >= paging.pageCnt) paging.curStatus = PageStatus.IS_END;
    
    const result =  await select(
      conn,
      paginationUserListSQL,
      [start, perPage]
    );
    
    if (Array.isArray(result)) {
      result.forEach(r => list.push(r));
    }
  });
  return {
    result: list,
    paging,
  }
}

export async function GET(req: Request, context: Context<{ cur?: number, perPage?: number }, {}>) {
  
  const url = req.url as string;
  const qs = url.split('?')[1] ?? '';
  const searchParams = qs.split('&').map(v => v.split('=')).reduce<Record<string, number>>((a, c) => {
    const num = parseInt(c[1]);
    if (!isNaN(num)) {
      a[c[0]] = num;
    }
    return a;
  }, {});

  const cur = searchParams.cur || 1;
  const perPage = searchParams.perPage || 2;
  
  const r = await getUserList(cur, perPage);

  return NextResponse.json({
    result: r.result,
    paging: r.paging,
  });
}