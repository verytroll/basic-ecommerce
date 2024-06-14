
<template>
    <h1 class="title-page">Products</h1>
    <div class="row">
        <div
            v-for="(product, index) in products"
            class="col l-4 m-6 c-12"
            :key="product.id"
        >
            <div class="product-item">
                <img :src="product.image" alt="" class="product-image" />
                <h3 class="product-name">
                    {{product.name}}
                    <br />
                    ({{product.model}})
                </h3>
                <p class="product-price">${{product.price}}</p>
                <router-link :to="'/product/' + product._id" class="btn btn-primary btn-view-details">View Details</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";

let products = ref([]);

fetch("http://localhost:8000/", {
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
        products.value = [...data];
    })
    .catch((err) => {
        console.log("error: " + err);
    });

</script>

<style scoped>
.product-item {
    padding: 16px 24px;
    margin-top: 10px;
    text-align: center;
    border-radius: 9px;
    background: #F6F6F6;
}
.product-image {
    width: 160px;
    object-fit: contain;
}
.product-name {
    color: #000;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 24px; /* 150% */
    margin-top: 16px;
}
.product-price {
    color: #000;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 24px; /* 100% */
    letter-spacing: 0.72px;
    margin-top: 16px;
}
.btn-view-details {
    margin-top: 24px;
}
</style>
