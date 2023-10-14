import { SimplePost } from "@/app/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
  ...,
  "username": author -> username,
  "userImage": author -> image,
  "image": photo,
  "likes": likes[] -> username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author -> username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc) {${simplePostProjection}}`,
      undefined,
      { cache: "no-store" }
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0] {
      ...,
      "username": author -> username,
      "userImage": author -> image,
      "image": photo,
      "likes": likes[] -> username,
      comments[] {comment, "username": author -> username, "image": author -> image},
      "id": _id,
      "createdAt": _createdAt,
    }`,
      undefined,
      { cache: "no-store" }
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author -> username == "${username}"]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`,
      undefined,
      { cache: "no-store" }
    )
    .then(mapPosts);
}

export async function getLikedOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[] -> username]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`,
      undefined,
      { cache: "no-store" }
    )
    .then(mapPosts);
}

export async function getSavedOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`,
      undefined,
      { cache: "no-store" }
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) //
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId) //
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: { _ref: userId, _type: "reference" },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref == "${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref == "${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  return client.assets //
    .upload("image", file)
    .then((result) => {
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo: { asset: { _ref: result._id } },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: "reference" },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
}