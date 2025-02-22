"use client";

import { toggleLikeMember } from "@/actions/likeActions";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type Props = {
  targetMemberId: number;
  hasLiked: boolean;
};

export default function LikeButton({ targetMemberId, hasLiked }: Props) {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(targetMemberId, hasLiked);
    router.refresh();
  }

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
