"use client";

import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "./atoms/Avatar";

import "swiper/css";
import useMe from "@/hooks/useMe";

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <section className="w-full flex justify-center items-center py-2 mb-4 min-h-[120px] border-b  border-b-neutral-100/10 overflow-x-auto">
      {isLoading ? (
        <ClipLoader size={40} color="darkgray" />
      ) : (
        (!users || users.length === 0) && <p>No Followings</p>
      )}
      {users && users.length > 0 && (
        <Swiper
          slidesPerView={4}
          scrollbar={{ draggable: true }}
          breakpoints={{
            576: {
              slidesPerView: 5,
            },
            640: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 8,
            },
          }}
        >
          {users.map(({ image, username }) => (
            <SwiperSlide key={username}>
              <Link
                className="flex flex-col items-center w-20"
                href={`/user/${username}`}
                scroll={false}
              >
                <Avatar image={image} highlight />
                <p className="w-full text-xs mt-1 text-ellipsis overflow-hidden text-center font-thin">
                  {username}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
