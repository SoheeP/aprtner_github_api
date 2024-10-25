'use client';

import Image from "next/image";
import BookmarkIcon from "../icons/bookmark";
import { User } from "./type";

type Props = {
  user: User,
  onBookmarkClick: (user: User) => void
}

const UserCard = ({user, onBookmarkClick}: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-slate-900 dark:border-slate-50 p-2">
      <button className="ml-auto" onClick={() => onBookmarkClick(user)}>
        <BookmarkIcon isActive={user.isLiked} />
      </button>
      <a className="flex gap-2 items-center" href={user.githubUrl}>
        <Image className="inline-block h-12 w-12 rounded-full ring-2 ring-transparent" src={user.imageUrl} alt={`${user.name} profile image`} width="150" height="150" />
        <div>{user.name}</div>
      </a>
    </div>
  )
}

export default UserCard;