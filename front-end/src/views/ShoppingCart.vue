
<template>
    <h1 class="title-page">Shopping Cart Page</h1>
    <div
        v-if="cartItems.length > 0"
        v-for="(product, index) in cartItems"
        :key="product._id"
        class="cart-item"
    >
        <img :src="product.image" alt="image" class="cart-item-image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">{{product.name}}</h3>

            <span class="cart-item-price">{{product.price}}</span>
            <span class="cart-item-multiply">x</span>
            <span class="cart-item-quantity">{{product.quantity}}</span>

            <button
                class="btn-remove-cart btn btn-primary"
                @click="removeFromCart(product._id)"
            >Remove from cart</button>
        </div>
    </div>
    <button
        class="btn-checkout btn btn-primary"
        @click="checkout"
    >Proceed to Checkout</button>

    <p v-if="cartItems.length < 0">You current have no items in your cart!</p>
</template>

<script setup>
import {ref, inject} from "vue";

let $bus = inject("$bus");

let cartItems = ref([]);
fetch(`http://localhost:8000/users/1/cart`, {
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
        cartItems.value = data;
    })
    .catch((err) => {
        console.log("[error] " + error);
    })

function removeFromCart(productId) {
    fetch(`http://localhost:8000/users/1/cart/`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({productId}),
    })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            cartItems.value = data;
        })
        .catch((err) => {
            console.log("[error] " + err);
        })
}

function checkout() {
    $bus.$emit("show-toast-message", {type: "info", title: "Checkout fail!", msg: "This feature has not implemented."});
}
</script>

<style scoped>
.cart-item {
    display: flex;
    align-items: center;
}
.cart-item + .cart-item{
    margin-top: 24px;
}
.cart-item-image {
    width: 90px;
    object-fit: contain;
}
.cart-item-name {
    font-size: 2rem;
}
.cart-item-info {
    display: flex;
    align-items: center;
    width: 100%;
}
.cart-item-price {
    font-size: 1.6rem;
    margin-left: auto;
}
.cart-item-multiply {
    font-size: 1.4rem;
    margin: 0 4px;
}
.cart-item-quantity {
    font-size: 1.6rem;
}
.btn-remove-cart {
    margin-left: 64px;
}
.btn-checkout {
    width: 100%;
    margin-top: 24px;
}
</style>
