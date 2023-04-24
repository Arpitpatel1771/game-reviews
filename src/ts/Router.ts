import { BaseComponent } from "./components/BaseComponent"
import { getPathFromURL, getWindowPath } from "./functions"

interface RouterOptions {
    element: HTMLElement | null
}

interface Route {
    path: string,
    component: BaseComponent
}

export class Router {

    element?: HTMLElement
    isAttached: Boolean = false
    routes: Array<Route> = []

    constructor(options: RouterOptions) {
        if (options.element) {
            this.attach(options.element)
        }

        this.addEventListeners()
    }

    attach(element: HTMLElement) {
        this.element = element
        this.isAttached = true
    }

    add(route: Route) {
        if (!this.isAttached) {
            throw Error("Router isn't attached to an element. Use the method 'attach' to attach an element to this router")
        }
        this.routes.push(route)
        this.forceCheck()
    }

    handleRouteComponent(component: BaseComponent) {
        if (component && this.element) {
            component.loadComponentInto(this.element)
        }
    }

    getRouteComponent(path: string){
        for (let route of this.routes) {
            if (route.path === path) {
                return route.component
            }
        }
        return null
    }

    forceCheck(){
        let currentPath = getWindowPath()
        let component = this.getRouteComponent(currentPath)
        if (component) this.handleRouteComponent(component)
    }

    addEventListeners() {
        document.addEventListener("click", (event)=> {
            let target = event.target as HTMLElement
            if (target.tagName === "A"){
                let link = target as HTMLAnchorElement
                let component = this.getRouteComponent(getPathFromURL(link.href))
                if (component) {
                    event.preventDefault()
                    this.handleRouteComponent(component)
                    window.history.pushState("", "", getPathFromURL(link.href))
                }
            }
        })
    }
}