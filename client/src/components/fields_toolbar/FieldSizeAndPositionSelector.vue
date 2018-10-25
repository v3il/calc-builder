<template>

    <button>
        <i class="material-icons">settings</i>
    </button>

    <!--<div>-->
        <!--<v-btn small icon @click="" slot="activator">-->
            <!--<v-icon>control_camera</v-icon>-->
        <!--</v-btn>-->

        <!--<v-card dark>-->
            <!--<v-list class="options-list">-->
                <!--<v-list-tile>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>Размеры и положение</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
            <!--</v-list>-->

            <!--<v-divider></v-divider>-->

            <!--<v-list class="options-list">-->
                <!--<v-list-tile>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title>Размер поля</v-list-tile-title>-->

                        <!--{{sizes}}-->
                        <!--<br>-->
                        <!--{{params.width}}-->
                        <!--<br>-->

                        <!--<div class="size-selector">-->
                            <!--<div-->
                                <!--v-for="size in sizes"-->
                                <!--@click="setSize(size)"-->
                                <!--:class="{selected: size <= params.width}"-->
                                <!--:style="{width: `${100 / sizes.length}%`}"-->
                                <!--class="size-selector-item"-->
                            <!--&gt;</div>-->
                        <!--</div>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->

                <!--<v-list-tile>-->
                    <!--<v-list-tile-action>-->
                        <!--<v-switch dark color="purple"></v-switch>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-title>Enable hints</v-list-tile-title>-->
                <!--</v-list-tile>-->
            <!--</v-list>-->
        <!--</v-card>-->
    <!--</v-menu>-->
    <!--</div>-->
</template>

<script>
    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        name: "FieldSizeAndPositionSelector",

        props: {
            options: Object,
        },

        data() {
            return {
                params: this.options,
                sizes: ContainerSizes.sizes,
            }
        },

        methods: {
            setSize(size) {
                this.params.width = size;
            }
        }
    }
</script>

<style scoped lang="scss">
    .options-list {
        background: #263238 !important;
        color: white;
        min-width: 250px;
    }

    .size-selector {
        width: 100%;
        border: 1px solid royalblue;
        display: flex;
        align-items: center;
        border-radius: 4px;
    }

    .size-selector-item {
        height: 18px;
        cursor: pointer;
        border-top: 1px solid royalblue;
        border-bottom: 1px solid royalblue;
        border-right: 1px solid #555;

        &.selected {
            background: royalblue;
        }
    }
</style>