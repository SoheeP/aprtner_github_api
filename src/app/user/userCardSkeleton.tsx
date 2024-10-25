"use client";
const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md dark:bg-gray-700 p-2">
      <div className="animate-pulse flex gap-2 items-center">
        <div className="inline-block h-12 w-12 rounded-full bg-gray-400" />
        <div className="w-3/12 flex flex-col gap-2">
          <div className="w-full h-3 bg-gray-400 rounded"></div>
          <div className="w-full h-1 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};
const UserCardSkeleton = () => {
  const emptyArray = new Array(5).fill(0);
  return (
    <>
      {emptyArray.map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};

export default UserCardSkeleton;
