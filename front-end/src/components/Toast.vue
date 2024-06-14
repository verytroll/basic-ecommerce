<template>
    <div id="toast">
        <div
            v-for="(toast, index) in toasts"
            class="toast"
            :class="'toast--' + toast.type"
        >
            <div class="toast__icon">
                <i class=""></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">{{toast.title}}</h3>
                <p class="toast__msg">{{toast.msg}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, inject, getCurrentInstance} from "vue";

// let instance = getCurrentInstance();
let test = `sildeToLeft ease 10s, fadeOut linear 1s 3s forwards`;
let $bus = inject("$bus");
let toasts = ref([]);
let intervalId = 0;

function removeToast(index) {
    toasts.value = [...toasts.value.slice(index + 1)];
}

function showToast({type = "info", title = "", msg = ""}) {
    let index = toasts.value.length;
    toasts.value.unshift({type, title, msg});

    setTimeout(() => {
        toasts.value.pop();
    }, 2000);
}
$bus.$on("show-toast-message", showToast);

</script>

<style scoped>
#toast {
    position: fixed;
    top: 32px;
    right: 32px;
    z-index: 999999;
}

.toast {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    min-width: 400px;
    max-width: 450px;
    padding: 20px 0;
    border-left: 4px solid;
    border-radius: 2px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.8);
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

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}

.toast + .toast {
    margin-top: 24px;
}

.toast--success {
    border-color: #47d864;
}

.toast--success .toast__icon {
    color: #47d864;
}

.toast--info {
    border-color: #2f86eb;
}

.toast--info .toast__icon {
    color: #2f86eb;
}

.toast--warning {
    border-color: #ffc021;
}

.toast--warning .toast__icon {
    color: #ffc021;
}

.toast--error {
    border-color: #ff623d;
}

.toast--error .toast__icon {
    color: #ff623d;
}

.toast__icon {
    font-size: 24px;
}

.toast__icon,
.toast__close {
    padding: 0 16px;
}

.toast__body {
    flex-grow: 1;
}

.toast__title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
}

.toast__msg {
    font-size: 14px;
    color: #888888;
    margin-top: 6px;
    line-height: 1.5;
}

.toast__close {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
}
</style>
