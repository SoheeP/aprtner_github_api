import { User } from "./type"

const BOOKMARK_STORAGE_KEY = 'BOOKMARK_NODE_IDS'

export const getBookmarkNodeIds = (): User[] => {
  return JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_KEY) || '[]')
}

export const bookmarkToggle = (user: User) => {
  const bookmarkNodeIds = getBookmarkNodeIds();
  const findIndex = bookmarkNodeIds.findIndex((bookmarked) => bookmarked.id === user.id)
  if (findIndex !== -1) {
    const deleted = bookmarkNodeIds.filter(bookmarked => bookmarked.id !== user.id)
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(deleted))
  } else {
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify([...bookmarkNodeIds, {
      ...user,
      isLiked: true
    }]))
  }
}


export const isBookmarked = (id: string) => {
  return getBookmarkNodeIds().findIndex((user) => user.id === id) !== -1
}