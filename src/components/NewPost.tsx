"use client";

import axios from "axios";
import { AuthUser } from "@/model/user";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Button from "./atoms/Button";
import FilesIcon from "./atoms/icons/FilesIcon";
import PostUserAvatar from "./PostUserAvatar";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface IProps {
  user: AuthUser;
}

export default function NewPost({ user }: IProps) {
  const { username, image } = user;

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    setDragging(false);

    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    try {
      await axios.post("/api/posts/", formData);
      router.push("/", { scroll: false });
    } catch (error: any) {
      if (error.response) {
        setError(`${error.response.status} ${error.response.statusText}`);
      } else {
        setError(error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl flex flex-col mx-auto items-center pt-10 px-4">
      {loading && (
        <div className="fixed inset-0 z-20 text-center pt-[40%] bg-neutral-900/80">
          <ClipLoader color="white" />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2 mb-20" onSubmit={handleSubmit}>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`w-full aspect-square flex flex-col items-center justify-center ${
            !file && "border-2 border-dashed"
          }`}
        >
          {dragging && (
            <div className="absolute inset-0 z-50 w-full h-full bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p className="text-xs mt-4 text-neutral-500">
                드래그나 클릭을 해서 사진을 업로드하세요.
              </p>
            </div>
          )}
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="local file"
              className="w-full object-cover aspect-square"
              width={500}
              height={500}
            />
          )}
        </label>
        <textarea
          name="text"
          id="input-text"
          required
          rows={8}
          placeholder={"내용을 입력하세요."}
          className="outline-none text-md bg-transparent border border-neutral-100/20 resize-none my-6 px-4 py-2 rounded-md"
          ref={textRef}
        />
        <Button text="작성하기" onClick={() => {}} />
      </form>
    </section>
  );
}
