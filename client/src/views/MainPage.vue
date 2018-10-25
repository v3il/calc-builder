<template>
    <div class="page">
        <div class="header">
            <div class="header_title">Calc constructor</div>
        </div>

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
        background-color: #263238;
        border-color: #263238;
        color: #fff;
        align-items: center;
        display: flex;
        padding: 0 24px;
        box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
        z-index: 3;
    }

    .header_title {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: .02em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .content {
        margin-top: 64px;
        height: calc(100vh - 64px);
    }
</style>
