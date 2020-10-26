/*global chrome*/
/*exported makeElement, makeAnchor, makeDbObj, withStore, getShowHideElement */

function makeDbObj(obj) {
    return {
        bookmarkieDatabase: JSON.stringify({
            saved: obj,
        }),
    };
}

function withStore(callback) {
    const store = chrome.storage.sync;
    store.get(null, ({ bookmarkieDatabase }) => {
        const oldBookmarks = JSON.parse(bookmarkieDatabase).saved;
        callback(store, oldBookmarks);
    });
}

function getShowHideElement() {
    return document.getElementById("showHideDone");
}

function makeElement(type, classes, attributes = {}, children = []) {
    const e = document.createElement(type);
    e.className = classes;

    for (const [key, value] of Object.entries(attributes)) {
        e.setAttribute(key, value);
    }

    children.forEach((child) => e.appendChild(child));

    return e;
}

function makeAnchor(classes, title, url, id) {
    return makeElement(
        "a",
        classes,
        {
            href: url,
            id,
        },
        [document.createTextNode(title)]
    );
}
