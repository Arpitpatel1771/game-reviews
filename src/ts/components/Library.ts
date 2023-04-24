import { getDOMNodeFromString } from "../functions";
import { BaseComponent } from "./BaseComponent";

export class GameDisplay extends BaseComponent {

    rootElement: HTMLElement;
    domString: string;

    constructor() {
        super()

        this.domString = `
            <div>
                Hey this game's name is ${"asd"}
            </div>
        `

        this.rootElement = getDOMNodeFromString(this.domString)

    }

    loadComponentInto(element: HTMLElement): void {
        element.appendChild(this.rootElement)
    }
}

export class Sidebar extends BaseComponent {
    rootElement: HTMLElement;
    domString: string;

    constructor() {
        super()

        this.domString = `
            <div>
                This is the sidebar
            </div>
        `

        this.rootElement = getDOMNodeFromString(this.domString)
    }

    loadComponentInto(element: HTMLElement): void {
        element.appendChild(this.rootElement)
    }
}

export class Library extends BaseComponent {
    rootElement: HTMLElement;
    domString: string;

    constructor(sidebar?: Sidebar, gameDisplay?: GameDisplay) {
        super()

        this.domString = `
            <div>
                This wraps the sidebar and gamedisplay component
                Sidebar -> ${sidebar?sidebar.domString:""},
                GameDisplay -> ${gameDisplay?gameDisplay.domString:""}
            </div>
        `

        this.rootElement = getDOMNodeFromString(this.domString)
    }

    loadComponentInto(element: HTMLElement): void {
        element.appendChild(this.rootElement)
    }
}