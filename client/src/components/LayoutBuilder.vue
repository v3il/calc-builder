<template>
    <v-card>
        <v-container fluid grid-list-md>
            <Draggable v-if="containers.length" v-model="containers" class="layout wrap row" :options="{
                handle: '.js-drag-icon'
            }">
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
        </v-container>
    </v-card>
</template>

<script>
    import LayoutContainerModel from '../models/LayoutContainer';

    import Draggable from 'vuedraggable';
    import LayoutContainer from './LayoutContainer.vue';

    import getNextId from '../utils/getNextId';

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
                this.containers.push(new LayoutContainerModel(getNextId(this.containers)));
            },

            removeContainer(removedContainer) {
                this.containers = this.containers.filter(container => container !== removedContainer);
            },

            collect() {
                console.log(777, JSON.stringify(this.containers))
            }
        }
    }
</script>

<style scoped>
</style>
