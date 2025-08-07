"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export function Button({
  href,
  icon,
  leading,
  label,
  size = "base",
  color = "dark",
  variant = "solid",
  block = false,
  onClick,
  className,
  openFile = false,
}) {
  const inputRef = useRef(null);
  const router = useRouter();

  const handleClick = (e) => {
    if (openFile) {
      e.preventDefault();
      inputRef.current?.click();
    } else if (onClick) {
      onClick(e);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      router.push("/upload");
    }
  };

  const iconClass = cn(
    size === "base" && "size-5",
    size === "small" && "size-4",
    variant === "link" && "group-hover:translate-x-1 duration-100 ease-in-out"
  );

  const Tag = href && !openFile ? "a" : "button";

  return (
    <>
      <Tag
        href={href}
        onClick={handleClick}
        className={cn(
          "group inline-flex gap-2 items-center rounded-full leading-none duration-200 ease-in-out",
          size === "base" && "text-sm px-6 py-4",
          size === "small" && "text-sm px-4 py-2",
          color === "primary" &&
            variant === "solid" &&
            "bg-primary-500 text-primary-50 hover:bg-primary-600",
          color === "primary" &&
            variant === "link" &&
            "text-primary-500 bg-transparent px-0 py-1",
          color === "dark" &&
            "bg-base-800 text-base-50 hover:bg-base-950 dark:invert",
          color === "light" &&
            "bg-base-200 text-base-600 hover:bg-white dark:invert",
          color === "white" && "bg-white text-base-600 hover:bg-base-200",
          color === "transparent" && "bg-transparent text-base-600",
          variant !== "link" && "hover:scale-95",
          block && "w-full justify-center",
          className
        )}
      >
        {leading && icon && <Icon icon={icon} className={iconClass} />}
        {label}
        {!leading && icon && <Icon icon={icon} className={iconClass} />}
      </Tag>

      {openFile && (
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple={false}
        />
      )}
    </>
  );
}
