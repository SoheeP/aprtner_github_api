"use client";
import { useEffect, useRef, useState } from "react";
import UserCard from "./userCard";
import { GithubUser, type User } from "./type";
import { useDisplayUserStore } from "@/providers/displayUserStoreProvider";
import { bookmarkToggle, convertUser, useGithubUserQuery } from "./service";
import UserCardSkeleton from "./userCardSkeleton";
import useDebounce from "@/hooks/useDebounce";

const UserList = () => {
  const [keyword, setKeyword] = useState("");
  const pageRef = useRef(1);
  const targetRef = useRef<HTMLDivElement>(null);
  const { displayUser, actions } = useDisplayUserStore((state) => state);
  const debouncedKeyword = useDebounce(keyword, 500);
  const {
    data: githubUser,
    refetch,
    isFetching,
  } = useGithubUserQuery(debouncedKeyword, pageRef.current);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (keyword !== "") {
            refetch().then(() => {
              pageRef.current += 1;
            });
          }
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (targetRef.current) observer.observe(targetRef.current);
    return () => {
      observer.disconnect();
    };
  }, [targetRef, refetch, keyword]);

  useEffect(() => {
    if (githubUser)
      actions.addDisplayUsers(
        githubUser.map((user: GithubUser) => convertUser(user))
      );
  }, [githubUser, actions]);

  const onBookmarkClick = (user: User) => {
    bookmarkToggle(user);
    actions.updateDisplayUser({
      ...user,
      isLiked: !user.isLiked,
    });
  };
  const userList = displayUser?.map((user, index) => {
    return (
      <UserCard
        key={`${user.id}-${user.name}-${index}`}
        user={user}
        onBookmarkClick={onBookmarkClick}
      />
    );
  });

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    actions.initDisplayUser();
    pageRef.current = 1;
  };

  return (
    <>
      <div className="p-4">
        <input
          className="mb-2 border border-slate-900 dark:border-slate-50 rounded-lg bg-transparent focus:outline-none"
          type="text"
          value={keyword}
          onChange={changeKeyword}
        />
        {displayUser.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {userList}
              {isFetching && <UserCardSkeleton />}
            </div>
          </>
        )}
      </div>
      <div className="h-12" ref={targetRef}></div>
    </>
  );
};

export default UserList;
