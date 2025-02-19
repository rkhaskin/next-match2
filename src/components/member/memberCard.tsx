import { Member } from "@/types/app";
import { Card, Image, CardFooter } from "@heroui/react";
import Link from "next/link";
import { calculateAge } from "@/lib/util";

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  return (
    <Card fullWidth as={Link} href={`/members/${member.id}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
        width={300}
      />
      <CardFooter className="absolute bottom-0 flex justify-start bg-black overflow-hidden z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dob)}
          </span>
          <span className="font-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
