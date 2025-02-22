import React from "react";
import ListTab from "@/components/lists/ListTab";
import { fetchLikedMembers } from "@/actions/likeActions";

const Lists = async ({ searchParams }: { searchParams: { type: string } }) => {
  const { type } = await searchParams;
  const members = await fetchLikedMembers(type);
  return (
    <div>
      <ListTab members={members} />
    </div>
  );
};

export default Lists;
