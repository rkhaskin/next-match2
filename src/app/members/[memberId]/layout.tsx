import React, { ReactNode } from "react";
import { getMemberById } from "@/actions/memberActions";
import MemberSidebar from "@/components/member/memberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@heroui/react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = await getMemberById(memberId);
  if (!member) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member}></MemberSidebar>
      </div>

      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}
