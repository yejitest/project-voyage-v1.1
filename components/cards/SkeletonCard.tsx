export default function SkeletonCard() {
  return (
    <div>
      <div className="w-full aspect-square rounded-2xl mb-[10px] bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50 bg-[length:400%_100%] animate-shimmer" />
      <div className="h-[14px] rounded-md bg-gray-50 mb-1.5 w-[70%] animate-shimmer" />
      <div className="h-[14px] rounded-md bg-gray-50 mb-1.5 w-1/2 animate-shimmer" />
      <div className="h-[14px] rounded-md bg-gray-50 w-2/3 animate-shimmer" />
    </div>
  );
}
