import { getMembers } from "@/actions/memberActions";
import React from "react";
import MemberCard from "@/components/member/memberCard";

const MembersPage = async () => {
  const members = await getMembers();
  // console.log(members);
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((m) => {
          return <MemberCard key={m.id} member={m}></MemberCard>;
        })}
      ;
    </div>
  );
};

export default MembersPage;
