'use client';

import Image from "next/image";
import BookmarkIcon from "../icons/bookmark";
import { User } from "./type";


const defaultUser:User = {
  id: "tiny ping",
  name: "Tiny Ping",
  imageUrl: "https://static.wikia.nocookie.net/catchteenieping/images/a/ac/%ED%95%98%EC%B8%84%EC%9E%89_%EC%8B%9C%EC%A6%8C_2.png/revision/latest/thumbnail/width/360/height/450?cb=20211024200626&path-prefix=ko",
  githubUrl: "https://github.com",
  isLiked: false
}

const UserCard = ({ name=defaultUser.name, imageUrl=defaultUser.imageUrl, githubUrl=defaultUser.githubUrl, isLiked=defaultUser.isLiked }: User) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-slate-50 p-2">
      <button className="ml-auto">
        <BookmarkIcon isActive={isLiked} />
      </button>
      <a className="flex gap-2 items-center" href={githubUrl}>
        <Image className="inline-block h-12 w-12 rounded-full ring-2 ring-transparent" src={imageUrl} alt={`${name} profile image`} width="150" height="150" />
        <div>{name}</div>
      </a>
    </div>
  )
}

export default UserCard;