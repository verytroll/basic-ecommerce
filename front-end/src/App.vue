
<template>
    <Toast></Toast>
    <Navbar></Navbar>
    <div id="app-container" class="grid wide">
        <router-view></router-view>
    </div>
</template>

<script setup>
import Toast from "./components/Toast"
import Navbar from "./components/Navbar"
</script>
