"use server";

import { getAuthUserId } from "@/actions/authActions";
import { sql, execute, UpdateResult } from "@/lib/dml";
import { MemberLikes } from "@/types/app";

export async function toggleLikeMember(
  targetUserId: number,
  isLiked: boolean
): Promise<void> {
  const sourceMemberId = parseInt(await getAuthUserId());

  let query: string;
  if (isLiked) {
    query = `delete from likes where target_member_id = ? and source_member_id = ?`;
  } else {
    query =
      "insert into likes (target_member_id, source_member_id) values(?, ?)";
  }
  const res = await execute<UpdateResult>(query, [
    targetUserId,
    sourceMemberId,
  ]);
  console.log("result ", res);
}

export async function getSourceUserLikes(): Promise<MemberLikes[]> {
  const sourceMemberId = parseInt(await getAuthUserId());

  const query = `
      select likes.id, likes.source_member_id, likes.target_member_id,
             users.name, members.city, members.country, members.dob
        from likes 
             join members on likes.target_member_id = members.id
             join users on members.user_id = users.id
       where source_member_id = ?
    `;
  const res = await sql<MemberLikes>(query, [sourceMemberId]);
  return res;
}
