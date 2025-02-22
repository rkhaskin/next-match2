"use server";

import { getAuthUserId } from "@/actions/authActions";
import { sql, execute, UpdateResult } from "@/lib/dml";
import { Member } from "@/types/app";

export async function toggleLikeMember(
  targetUserId: number,
  isLiked: boolean
): Promise<void> {
  const sourceMemberId = parseInt(await getAuthUserId());

  let query: string;
  if (isLiked) {
    query = `delete from likes where target_member_id = ? and user_id = ?`;
  } else {
    query = "insert into likes (target_member_id, user_id) values(?, ?)";
  }
  const res = await execute<UpdateResult>(query, [
    targetUserId,
    sourceMemberId,
  ]);
  console.log("result ", res);
}

export async function fetchLikedMembers(type = "source"): Promise<Member[]> {
  const userId = parseInt(await getAuthUserId());

  switch (type) {
    case "source":
      return await fetchSourceLikes(userId);
    case "target":
      return await fetchTargetLikes(userId);
    case "mutual":
      return await fetchMutualLikes(userId);
    default:
      return [];
  }
}

// fetch users who are liked by the logged in user
async function fetchSourceLikes(userId: number): Promise<Member[]> {
  const query = `
    select a.target_member_id as id, b.gender, b.dob, b.description, b.city, b.country, c.name, c.image, 'Y' as isLiked
      from likes a 
         join members b on b.id = a.target_member_id
         join users c on c.id = b.user_id
     where a.user_id = ?
    `;

  const res = await sql<Member>(query, [userId]);
  return res;
}

// fetch users who like logged in user
async function fetchTargetLikes(userId: number): Promise<Member[]> {
  const query = `
  select c.id, c.gender, c.dob, c.description, c.city, c.country, d.name, d.image, 'Y' as isLiked
    from likes a 
       join members b on a.target_member_id = b.id
       join members c on c.user_id = a.user_id
       join users d on d.id = c.user_id
   where b.user_id = ?
   `;
  const res = await sql<Member>(query, [userId]);
  return res;
}

// fetch mutually liked users
async function fetchMutualLikes(userId: number): Promise<Member[]> {
  const query = `
     select members.id, members.gender, members.dob, members.description, members.city, members.country, users.name, users.image, 'Y' as isLiked
        from (
      select a.target_member_id as member_id
        from (
         select a.target_member_id, b.id as source_member_id
        -- likes by logged in user, pass user id
          from likes a 
            join members b on b.user_id = a.user_id
            join members c on c.id = a.target_member_id
            join users d on d.id = c.user_id
         where b.user_id = ?
        ) a join (
        select c.id as other_member_id, b.id as source_member_id
        -- logged in user liked by other users, 
          from likes a 
            join members b on a.target_member_id = b.id
            join members c on c.user_id = a.user_id
          where b.user_id = ?
        ) b on a.target_member_id = b.other_member_id 
            and a.source_member_id = b.source_member_id
      ) inn join members on inn.member_id = members.id
            join users on users.id = members.user_id 
    `;
  const res = await sql<Member>(query, [userId, userId]);
  return res;
}
