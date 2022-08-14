import { createRouter, createWebHistory } from 'vue-router'
import Store from "../components/TheStore"
import ShoppingCart from "../components/ShoppingCart"
import Checkout from "../components/TheCheckout"
import OrderThanks from "../components/OrderThanks"
import Authentication from "../components/admin/TheAuthentication"
import Admin from "../components/admin/TheAdmin"
import ProductAdmin from "../components/admin/ProductAdmin"
import OrderAdmin from "../components/admin/OrderAdmin"
import ProductEditor from "../components/admin/ProductEditor"
import dataStore from "../store"

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Store },
        { path: "/cart", component: ShoppingCart },
        { path: "/checkout", component: Checkout },
        { path: "/thanks/:id", component: OrderThanks },
        { path: "/login", component: Authentication },
        { path: "/admin", component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next()
                } else {
                    next("/login")
                }
            },
            children: [
                { path: "products/:op(create|edit)/:id(\\d+)?",
                    component: ProductEditor },
                { path: "products", component: ProductAdmin },
                { path: "orders", component: OrderAdmin },
                { path: "", redirect: "/admin/products" },
            ] 
        },
        { path: "/:catchAll(.*)", redirect: "/" }
    ]
})