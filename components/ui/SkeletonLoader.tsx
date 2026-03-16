import { HTMLAttributes } from "react";

interface SkeletonLoaderProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: string;
}

export default function SkeletonLoader({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
  ...props
}: SkeletonLoaderProps) {
  return (
    <div
      className={`
        ${width} ${height} ${rounded}
        bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50
        bg-[length:400%_100%] animate-shimmer
        ${className}
      `}
      {...props}
    />
  );
}
