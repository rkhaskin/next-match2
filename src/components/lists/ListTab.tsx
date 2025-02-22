"use client";

import { Member } from "@/types/app";
import { Tabs, Tab } from "@heroui/react";
import { Key } from "@react-types/shared";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MemberCard from "../member/memberCard";
import { useTransition } from "react";
import LoadingComponent from "../util/LoadingComponent";

type Props = {
  members: Member[];
};

export default function ListTab({ members }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members who like me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  function tabChangeHandler(key: Key): void {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  }

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => tabChangeHandler(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {members.map((member) => {
                      return (
                        <MemberCard
                          key={member.id}
                          member={member}
                        ></MemberCard>
                      );
                    })}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
