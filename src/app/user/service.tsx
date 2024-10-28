"use client";
import { useQuery } from "@tanstack/react-query";
import { GithubUser, User } from "./type";

const BOOKMARK_STORAGE_KEY = "BOOKMARK_NODE_IDS";

export const getBookmarkNodeIds = (): User[] => {
  return JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || "[]");
};

export const bookmarkToggle = (user: User) => {
  const bookmarkNodeIds = getBookmarkNodeIds();
  const isBookmarked = bookmarkNodeIds.some(
    (bookmarked) => bookmarked.id === user.id
  );
  const updatedBookmarked = isBookmarked
    ? bookmarkNodeIds.filter((bookmarked) => bookmarked.id !== user.id)
    : [
        ...bookmarkNodeIds,
        {
          ...user,
          isLiked: true,
        },
      ];
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updatedBookmarked));
};

export const isBookmarked = (id: string) => {
  return getBookmarkNodeIds().findIndex((user) => user.id === id) !== -1;
};

const defaultUser: User = {
  id: "tiny ping",
  name: "Tiny Ping",
  imageUrl:
    "https://static.wikia.nocookie.net/catchteenieping/images/a/ac/%ED%95%98%EC%B8%84%EC%9E%89_%EC%8B%9C%EC%A6%8C_2.png/revision/latest/thumbnail/width/360/height/450?cb=20211024200626&path-prefix=ko",
  githubUrl: "https://github.com",
  isLiked: false,
};

export const convertUser = (data: GithubUser): User => {
  return {
    id: data.node_id || defaultUser.id,
    name: data.login || defaultUser.name,
    imageUrl: data.avatar_url || defaultUser.imageUrl,
    githubUrl: data.html_url || defaultUser.githubUrl,
    isLiked: isBookmarked(data.node_id),
  };
};

const ITEMS_PER_PAGE = 20;

const fetchGithubUser = async (keyword: string, page: number) =>
  await fetch(
    `https://api.github.com/search/users?q=${keyword}&per_page=${ITEMS_PER_PAGE}&page=${page}`
  );
export const useGithubUserQuery = (keyword: string, page: number) => {
  return useQuery({
    queryKey: ["users", keyword, page],
    queryFn: async () => {
      if (keyword === "") return [];
      const response = await fetchGithubUser(keyword, page);
      const jsonData = await response.json();
      if (jsonData) return jsonData.items;
      return [];
    },
    enabled: !!keyword,
  });
};
