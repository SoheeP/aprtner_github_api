export type GithubUser = {
  login: string;
  node_id: string;
  avatar_url: string;
  html_url: string;
};

export type User = {
  id: string;
  name: string;
  imageUrl: string;
  githubUrl: string;
  isLiked: boolean;
};
