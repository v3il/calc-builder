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

        <br>

        {{JSON.stringify(containerData.fields)}}

        <br>

        <Draggable v-model="containerData.fields" class="drag" @add="onAdd" :options="{
            group: 'items',
        }">
            <template v-for="field in containerData.fields">
                <component :is="field"></component>
            </template>


        </Draggable>
    </div>
</template>

<script>

    import Draggable from 'vuedraggable';

    import Button from './fields/Button.vue';
    import Text from './fields/Text.vue';

    const sizes = [/*0.25, */0.3333, 0.5, 0.6666, /*0.75,*/ 1];

    export default {
        name: 'LayoutContainer',

        props: {
            container: Object,
        },

        components: {
            Draggable,
            Button,
            Text1: Text,
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
            },

            onAdd(event) {
                var itemEl = event.item;  // dragged HTMLElement

                this.containerData.fields.push(itemEl.children[0].dataset.item);

                console.log(this.containerData.fields)

                itemEl.remove();

                console.log(111, itemEl.children[0].dataset.item, event)
            }
        },
    }
</script>

<style scoped lang="scss">
    .layout-container {
        display: inline-block;
        border: 1px solid gray;
        padding: 12px 24px;
        vertical-align: top;

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

    .drag {
        width: 100px;
        height: 100px;
        border: 1px dashed royalblue;
    }
</style>