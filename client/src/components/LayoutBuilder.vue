<template>
    <div>
        <button @click="add">Add</button>
        <button @click="collect">Collect</button>


        <Draggable v-if="containers.length" v-model="containers" @start="drag=true" @end="drag=false">
            <LayoutContainer
                @removeContainer="removeContainer($event)"
                v-for="container in containers"
                :container="container"
                :key="container.id"
            ></LayoutContainer>
        </Draggable>

        <div v-else>
            Empty
        </div>
    </div>
</template>

<script>

    var key = 1;

    import LayoutContainerModel from '../models/LayoutContainer';

    import Draggable from 'vuedraggable';
    import LayoutContainer from './LayoutContainer.vue';

    export default {
        name: "LayoutBuilder",

        components: {
            Draggable,
            LayoutContainer,
        },

        props: {
            layout: Array,
        },

        data() {
            return {
                containers: this.layout,
            }
        },

        methods: {
            add() {
                this.containers.push(new LayoutContainerModel({
                    id: key++,
                    width: 0.5,
                    float: true,
                    pullToRight: false,
                }));
            },

            removeContainer(removedContainer) {
                this.containers = this.containers.filter(container => container !== removedContainer);
            },

            collect() {
                console.log(JSON.stringify(this.containers));
            }
        }
    }
</script>

<style scoped>

</style>