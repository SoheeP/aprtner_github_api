"use client";
import { useQuery } from "@tanstack/react-query";
import { GithubUser, User } from "./type";

const BOOKMARK_STORAGE_KEY = "BOOKMARK_NODE_IDS";

export const getBookmarkNodeIds = (): User[] => {
  return JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || "[]");
};

export const bookmarkToggle = (user: User) => {
  const bookmarkNodeIds = getBookmarkNodeIds();
  const findIndex = bookmarkNodeIds.findIndex(
    (bookmarked) => bookmarked.id === user.id
  );
  if (findIndex !== -1) {
    const deleted = bookmarkNodeIds.filter(
      (bookmarked) => bookmarked.id !== user.id
    );
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(deleted));
  } else {
    localStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify([
        ...bookmarkNodeIds,
        {
          ...user,
          isLiked: true,
        },
      ])
    );
  }
};

export const isBookmarked = (id: string) => {
  return getBookmarkNodeIds().findIndex((user) => user.id === id) !== -1;
};

export const convertUser = (data: GithubUser): User => {
  const defaultUser: User = {
    id: "tiny ping",
    name: "Tiny Ping",
    imageUrl:
      "https://static.wikia.nocookie.net/catchteenieping/images/a/ac/%ED%95%98%EC%B8%84%EC%9E%89_%EC%8B%9C%EC%A6%8C_2.png/revision/latest/thumbnail/width/360/height/450?cb=20211024200626&path-prefix=ko",
    githubUrl: "https://github.com",
    isLiked: false,
  };

  return {
    id: data.node_id || defaultUser.id,
    name: data.login || defaultUser.name,
    imageUrl: data.avatar_url || defaultUser.imageUrl,
    githubUrl: data.html_url || defaultUser.githubUrl,
    isLiked: isBookmarked(data.node_id),
  };
};

export const useGithubUserQuery = (keyword: string, page: number) => {
  return useQuery({
    queryKey: ["users", keyword],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(
        `https://api.github.com/search/${queryKey[0]}?q=${keyword}&per_page=20&page=${page}`
      );
      const jsonData = await response.json();
      return jsonData.items;
    },
    enabled: !!keyword,
  });
};
