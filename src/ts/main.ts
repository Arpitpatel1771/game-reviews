import "../style.css"
import { Router } from "./Router"
import { BaseComponent } from "./components/BaseComponent"

document.getElementById("app")?.append("asd")

const router = new Router({element: document.getElementById("app")})

// router.add({
//     "path": "/home",
// })
