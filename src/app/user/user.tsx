"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import UserCard from "./userCard";
import { GithubUser, type User } from "./type";
import { useDisplayUserStore } from "@/providers/displayUserStoreProvider";

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
    if (data) actions.updateDisplayUser(data.map((user:GithubUser) => convertUser(user)));
  }, [data])

  const convertUser = (data:GithubUser):User => {
    return {
      id: data.node_id,
      name: data.login,
      imageUrl: data.avatar_url,
      githubUrl: data.html_url,
      isLiked: false
    }
  }

  const userList = displayUser?.map(({ id, name, imageUrl, githubUrl, isLiked=false }:User, index) => {
    return (
      <UserCard key={`${id}-${name}-${index}`} id={id} name={name} imageUrl={imageUrl} githubUrl={githubUrl} isLiked={isLiked} />
    )
  })


  const changeKeyword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleRefetch = () => {
    pageRef.current += 1;
    refetch()
  }
  return (
    <div>
      <input className="border border-slate-50 rounded-lg bg-transparent focus:outline-none" type="text" value={keyword} onChange={changeKeyword} />
      <div className="grid grid-cols-2 gap-4">
        {userList}
      </div>
      <div className="h-12" ref={targetRef}></div>
    </div>
  )
}

export default UserList;