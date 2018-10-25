<template>
    <div class="page">
        <div class="header"></div>

        <div class="content">
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
                items: [
                    {
                        id: 0,
                        type: 'ButtonField',
                        text: 'Кнопка',
                    },
                    {
                        id: 1,
                        type: 'TextField',
                        text: 'Текстовое поле',
                    }
                ],

                drawer: true
            }
        },

        components: {
            Draggable,
        },

        props: {
            source: String
        },
    };
</script>

<style lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        /*padding: 12px 24px;*/

        min-height: 100vh;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 64px;
        background-color: #000;
    }

    .content {
        margin-top: 64px;
        height: calc(100vh - 64px);
    }
</style>
