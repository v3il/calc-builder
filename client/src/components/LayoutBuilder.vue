<template>
    <div class="layout-builder">
        <button @click="add">Add</button>
        <button @click="collect">Collect</button>


        <!--<v-card>-->
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <Draggable v-if="containers.length" v-model="containers">
                        <LayoutContainer
                                @removeContainer="removeContainer($event)"
                                v-for="container in containers"
                                :container="container"
                                :key="container.id"
                        ></LayoutContainer>
                    </Draggable>
                </v-layout>
            </v-container>
        <!--</v-card>-->


        <!--<Draggable v-if="containers.length" v-model="containers">-->
            <!--<LayoutContainer-->
                <!--@removeContainer="removeContainer($event)"-->
                <!--v-for="container in containers"-->
                <!--:container="container"-->
                <!--:key="container.id"-->
            <!--&gt;</LayoutContainer>-->
        <!--</Draggable>-->

        <!--<div v-else>-->
            <!--Empty-->
        <!--</div>-->
    </div>
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

                cards: [
                    { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                    { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                    { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
                ]
            }
        },

        methods: {
            add() {
                this.containers.push(new LayoutContainerModel({
                    id: getNextId(this.containers),
                    width: 0.5,
                    float: true,
                    align: 'left',
                    fields: [],
                }));
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
