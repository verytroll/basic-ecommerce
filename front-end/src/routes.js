
import {createRouter, createWebHistory} from "vue-router";
import ShoppingCart from "./views/ShoppingCart.vue"
import Products from "./views/Products.vue"
import ProductDetail from "./views/ProductDetail.vue"
import NotFound from "./views/NotFound.vue"

let router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {path: "/product/:productId", component: ProductDetail, props: true,},
        {path: "/cart", component: ShoppingCart,},
        {path: "/", component: Products,},
        {path: "/:pathMatch(.*)*", component: NotFound,},
    ],
});

export default router;
