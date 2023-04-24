export function lg() {
    console.log(...arguments)
}

export function getDOMNodeFromString(domString: string){
    const parser = new DOMParser()
    let document = parser.parseFromString(domString, "text/html").getRootNode() as Document
    return document.body.firstChild as HTMLElement
}

export function getDOMStringFromNode(element: HTMLElement){
    const parent = document.createElement("div")
    parent.appendChild(element)
    return parent.innerHTML
}

export function getWindowPath() {
    let path = window.location.pathname
    if (path.length > 1 && path[path.length-1] === "/") {
        path = path.substring(0, path.length-1)
    }
    return path
}

export function getPathFromURL(url: string) {
    return "/" + url.split("/").splice(3).join("/");
}