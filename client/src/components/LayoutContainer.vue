<template>
    <div class="layout-container" :style="{width: containerData.width * 100 + '%'}" :class="{
        'non-float': !containerData.float,
        'pulled-right': containerData.pullToRight,
    }">
        <button @click="remove">Remove</button>
        <button @click="float">Float</button>
        <button @click="right">Right</button>

        <button @click="resize(-1)">-</button>
        <button @click="resize(1)">+</button>
        <br>
        {{containerData}}
    </div>
</template>

<script>

    const sizes = [/*0.25, */0.3333, 0.5, 0.6666, /*0.75,*/ 1];

    export default {
        name: 'LayoutContainer',

        props: {
            container: Object,
        },

        data() {
            return {
                containerData: this.container,
            };
        },

        methods: {
            remove() {
                this.$emit('removeContainer', this.container);
            },

            resize(direction) {
                const currentIndex = sizes.indexOf(this.containerData.width);
                this.containerData.width = sizes[currentIndex + direction];
            },

            float() {
                this.containerData.float = !this.containerData.float;

                if (this.containerData.float) {
                    this.containerData.pullToRight = false;
                }
            },

            right() {
                if (!this.containerData.float) {
                    this.containerData.pullToRight = !this.containerData.pullToRight;
                } else {
                    this.containerData.pullToRight = false;
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .layout-container {
        display: inline-block;
        border: 1px solid gray;
        padding: 12px 24px;

        &.non-float {
            display: block;
        }

        &.pulled-right {
            margin-left: auto;
        }
    }

    .resize {
        width: 100px;
        height: 50px;
        background: black;
    }
</style>