import { DateTime } from "next-auth/providers/kakao";

type Member = {
  id: number;
  user_id?: number;
  gender: string;
  dob: Date;
  created_on: DateTime;
  updated_on?: DateTime;
  description: string;
  city: string;
  country: string;
  name: string;
  image?: string;
};

type MemberPhotos = {
  id: number;
  member_id: number;
  link: string;
  is_public: string;
};

type MemberLikes = {
  id: number;
  target_member_id: number;
  source_member_id: number;
};
