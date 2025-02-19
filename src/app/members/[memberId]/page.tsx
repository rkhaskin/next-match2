import { getMemberById } from "@/actions/memberActions";
import { notFound } from "next/navigation";
import { CardHeader, Divider, CardBody } from "@heroui/react";
import React from "react";

export default async function MemberDetailsPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = await getMemberById(memberId);
  if (!member) {
    return notFound();
  }

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
