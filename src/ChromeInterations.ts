/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { withStore, makeDbObj } from "./Utils";

export function markAsFeatured(bookmarkId: string) {
    withStore((store, bookmarks) => {
        const b = bookmarks.find((x) => x.id === bookmarkId && !x.done);
        const newBookmarks = bookmarks.filter((x) => x.id !== bookmarkId);
        store.set(makeDbObj([b!!, ...newBookmarks]));
    });
}

export function markAsDone(bookmarkId: string, callback: () => void) {
    withStore((store, bookmarks) => {
        const bk = bookmarks.find((x) => x.id === bookmarkId);
        if (bk) {
            bk.done = true;
            store.set(makeDbObj(bookmarks), callback);
        }
    });
}

export function markAsUndone(bookmarkId: string, callback: () => void) {
    withStore((store, bookmarks) => {
        const bk = bookmarks.find((x) => x.id === bookmarkId);
        if (bk) {
            bk.done = false;
            store.set(makeDbObj(bookmarks), callback);
        }
    });
}

export function deleteBookmark(bookmarkId: string, callback: () => void) {
    withStore((store, bookmarks) => {
        store.set(
            makeDbObj(bookmarks.filter((x) => x.id !== bookmarkId)),
            callback,
        );
    });
}
