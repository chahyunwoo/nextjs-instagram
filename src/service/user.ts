import { SearchUser } from "@/app/model/user";
import { client } from "./sanity";

interface OAuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string | null;
}

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0] {
      ...,
      "id": _id,
      following[] -> {username, image},
      followers[] -> {username, image},
      "bookmarks": bookmarks[] -> _id
    }`
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";

  return client
    .fetch(
      `*[_type =="user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `,
      undefined,
      {
        cache: "no-store",
      }
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0] {
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author -> username == "${username}"])
    }`,
      undefined,
      {
        cache: "no-store",
      }
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}