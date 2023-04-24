export abstract class BaseComponent {
    abstract rootElement: HTMLElement
    abstract domString: string
    abstract loadComponentInto(element: HTMLElement): void
}

// export class DOMComponent extends BaseComponent {
//     rootElement = getDOMNodeFromString("<div>Hey this is a basic class</div>")

//     constructor() {

//         super()
//     }

//     loadComponentInto(element: HTMLElement) {
//         element.innerHTML = "";
//         element.appendChild(this.rootElement)
//     }
// }
