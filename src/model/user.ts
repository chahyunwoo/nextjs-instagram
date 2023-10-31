export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
}

export interface SearchUser {
  id: string;
  name: string;
  userImage: string;
  username: string;
}

export interface SimpleUser extends Pick<AuthUser, "username" | "image"> {}

export interface HomeUser extends AuthUser {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}

export interface ProfileSearchUser extends AuthUser {
  following: number;
  followers: number;
}

export interface ProfileUser extends ProfileSearchUser {
  posts: number;
}
