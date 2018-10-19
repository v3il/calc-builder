<template>
    <div class="page">
        <div class="sidebar">
            Sidebar
        </div>

        <div class="content">

            <router-link :to="{name: 'constructor'}">Constructor</router-link>
            <router-link :to="{name: 'formula'}">Formula</router-link>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainPage',
    };
</script>

<style scoped>
    .page {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        flex-basis: 300px;
        background: darkslategray;
    }

    .content {
        flex: 1;
        padding: 18px 36px;
    }
</style>
