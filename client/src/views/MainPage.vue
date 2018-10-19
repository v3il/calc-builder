<template>
    <div class="page">
        <div class="sidebar">
            Sidebar

            <Draggable :options="{
                group: {name: 'items', pull: 'clone', put: false,},
                sort: false,
            }">
                <div v-for="i in items">{{i}}</div>
            </Draggable>
        </div>

        <div class="content">

            <router-link :to="{name: 'constructor'}">Constructor</router-link>
            <router-link :to="{name: 'formula'}">Formula</router-link>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';

    export default {
        name: 'MainPage',

        data() {
            return {
                items: [1, 2, 3, 4, 5, 6]
            }
        },

        components: {
            Draggable,
        }
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
