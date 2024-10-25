"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import UserCard from "./userCard";
import { GithubUser, type User } from "./type";
import { useDisplayUserStore } from "@/providers/displayUserStoreProvider";
import { bookmarkToggle, isBookmarked } from "./service";

const UserList = () => {
  const [keyword, setKeyword] = useState("");
  const pageRef = useRef(1);
  const targetRef = useRef<HTMLDivElement>(null);
  const { displayUser, actions } = useDisplayUserStore((state) => state);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleRefetch();
      }
    }, {
      threshold: 1.0
    })
    if (targetRef.current) observer.observe(targetRef.current);
    return (() => {
      observer.disconnect();
    })
  }, [targetRef])

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/search/users?q=k&per_page=20&page=${pageRef.current}`);
      const jsonData = await response.json();
      return jsonData.items
    },
  },)

  useEffect(() => {
    if (data) actions.addDisplayUsers(data.map((user:GithubUser) => convertUser(user)));
  }, [data])

  const convertUser = (data:GithubUser):User => {
    const defaultUser:User = {
      id: "tiny ping",
      name: "Tiny Ping",
      imageUrl: "https://static.wikia.nocookie.net/catchteenieping/images/a/ac/%ED%95%98%EC%B8%84%EC%9E%89_%EC%8B%9C%EC%A6%8C_2.png/revision/latest/thumbnail/width/360/height/450?cb=20211024200626&path-prefix=ko",
      githubUrl: "https://github.com",
      isLiked: false
    }

    return {
      id: data.node_id || defaultUser.id,
      name: data.login || defaultUser.name,
      imageUrl: data.avatar_url || defaultUser.imageUrl,
      githubUrl: data.html_url || defaultUser.githubUrl,
      isLiked: isBookmarked(data.node_id)
    }
  }

  const onBookmarkClick = (user:User) => {
    bookmarkToggle(user);
    actions.updateDisplayUser({
      ...user,
      isLiked: !user.isLiked
    })
  }
  const userList = displayUser?.map((user, index) => {
    return (
      <UserCard key={`${user.id}-${user.name}-${index}`} user={user} onBookmarkClick={onBookmarkClick} />
    )
  })

  const changeKeyword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleRefetch = async () => {
    await refetch();
    pageRef.current += 1;
  }
  return (
    <div className="p-4">
      <input className="mb-2 border border-slate-900 dark:border-slate-50 rounded-lg bg-transparent focus:outline-none" type="text" value={keyword} onChange={changeKeyword} />
      <div className="grid grid-cols-2 gap-4">
        {userList}
      </div>
      <div className="h-12" ref={targetRef}></div>
    </div>
  )
}

export default UserList;