import * as React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

export const TeamIcon = ({ platform, Icon, user, url }) => (
  <HoverCard.Root openDelay={100} closeDelay={200}>
    <HoverCard.Trigger asChild>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="text-white transition-colors duration-200 hover:text-[--hover-colour] focus:outline-none focus:ring-2 focus:ring-[--hover-colour] rounded-full"
      >
        <Icon size={24} className="hover:bg-(--secondary-accent-colour)" />
      </a>
    </HoverCard.Trigger>

    <HoverCard.Portal>
      <HoverCard.Content
        className="bg-white p-3 rounded-lg shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="font-bold text-gray-900">{platform}</div>
          <div className="text-gray-500">@{user}</div>
          <div className="text-gray-700">
            Click to view my {platform} profile.
          </div>
        </div>

        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);
