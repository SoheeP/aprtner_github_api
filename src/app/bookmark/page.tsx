"use client";
import UserCard from "../user/userCard";
import { User } from "../user/type";
import { useDisplayUserStore } from "@/providers/displayUserStoreProvider";
import { bookmarkToggle, getBookmarkNodeIds } from "../user/service";

const Bookmark = () => {
  const { actions } = useDisplayUserStore((state) => state);
  const bookmarkNodeIds = getBookmarkNodeIds();
  const onBookmarkClick = (user:User) => {
    bookmarkToggle(user);
    actions.updateDisplayUser({
      ...user,
      isLiked: !user.isLiked
    })
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {
          bookmarkNodeIds.map((user: User, index: number) => <UserCard key={`${user.id}-${user.name}-${index}`} user={user} onBookmarkClick={onBookmarkClick} />)
        }
      </div>
    </div>
  )
}

export default Bookmark;