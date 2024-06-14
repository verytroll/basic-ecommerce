<template>
    <nav class="navbar">
        <div class="grid wide">
            <router-link
                to="/"
            >
                <img :src="logo" alt="logo" />
            </router-link>
            <router-link to="/cart" class="btn btn-primary">Shopping Cart</router-link>
        </div>
    </nav>
</template>

<script setup>
import logo from "../assets/logo.svg";

</script>

<style scoped>
.navbar > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
</style>
