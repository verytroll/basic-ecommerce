
<template>
    <div class="product-item" v-if="product">
        <div class="row">
            <div class="col l-6">
                <img :src="product.image" alt="image-item">
            </div>
            <div class="col l-6">
                <div class="product-detail">
                <h1 class="product-name">{{product.name}}</h1>
                <h3 class="product-price">${{product.price}}</h3>
                <button
                    class="btn-add-cart btn btn-primary"
                    @click="addToCart"
                >Add to cart</button>
            </div>
            </div>
        </div>
    </div>

    <NotFound v-else/>
</template>

<script setup>
import {ref, inject} from "vue";
import NotFound from "./NotFound.vue"

let $bus = inject("$bus");

let {productId} = defineProps(["productId"]);
let product = ref(null);
fetch(`http://localhost:8000/product/${productId}`, {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        product.value = data;
    })
    .catch((err) => {
        console.log("[error] " + err);
    });

function addToCart() {
    fetch(`http://localhost:8000/users/1/cart/`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({productId}),
    })
        .then(() => {
            $bus.$emit("show-toast-message", {type: "success",title: "Add success", msg: ""});
        })
        .catch((err) => {
            $bus.$emit("show-toast-message", {type: "error",title: "Add fail", msg: ""});
        })
}
</script>

<style scoped>
.product-name {
    font-size: 4rem;
    font-weight: 600;
    line-height: 4rem;
    margin: 24px 0;
}
.product-price {
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 4.8rem;
    letter-spacing: 0.96px;
}
.btn-add-cart {
    margin-top: 32px;
}
@keyframes slideToLeft {
    from {
        opacity: 0;
        transform: translateX(calc(100% + 32px));
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
