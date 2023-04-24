import "../style.css"
import { Router } from "./Router"
import { GameDisplay, Library, Sidebar } from "./components/Library"


document.getElementById("app")?.append("asd")

const router = new Router({element: document.getElementById("app")})

const library = new Library(new Sidebar(), new GameDisplay())

router.add({
    "path": "/show",
    "component": library
})

