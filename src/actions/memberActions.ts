"use server";

import { getAuthUserId } from "@/actions/authActions";
import { sql } from "@/lib/dml";
import { Member, MemberPhotos } from "@/types/app";

export async function getMembers(): Promise<Member[]> {
  const authUserId = await getAuthUserId();

  const userId = parseInt(authUserId);
  const query = `
  select a.id, a.gender, a.dob, a.description, a.city, a.country, b.name, b.image
    from members a join users b on a.user_id = b.id
    where a.user_id != ?
  `;
  const res = await sql<Member>(query, [userId]);
  return res;
}

export async function getMemberById(id: string): Promise<Member | null> {
  const query = `
  select a.id, a.gender, a.dob, a.description, a.city, a.country, b.name, b.image
    from members a join users b on a.user_id = b.id
    where a.id = ?
  `;
  const res = await sql<Member>(query, [parseInt(id)]);
  if (res.length > 0) {
    return res[0];
  }
  return null;
}

export async function getMemberPhotos(id: string): Promise<MemberPhotos[]> {
  const query = `
    select id, member_id, link, is_public 
    from photos
    where member_id = ? 
 `;
  const res = await sql<MemberPhotos>(query, [parseInt(id)]);
  return res;
}
