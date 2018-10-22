<template>
    <div>
        <button @click="add">Add</button>
        <button @click="collect">Collect</button>


        <Draggable v-if="containers.length" v-model="containers">
            <LayoutContainer
                @removeContainer="removeContainer($event)"
                v-for="container in containers"
                :container="container"
                :key="container.id"
                ref="container"
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
                containers: this.layout.concat(new LayoutContainerModel({
                    id: key++,
                    width: 0.5,
                    float: true,
                    pullToRight: false,
                    fields: [
                        {
                            type: 'Text1',
                            params: {
                                text: 'Test input'
                            }
                        }
                    ],
                })),
            }
        },

        methods: {
            add() {
                this.containers.push(new LayoutContainerModel({
                    id: key++,
                    width: 0.5,
                    float: true,
                    pullToRight: false,
                    fields: [],
                }));
            },

            removeContainer(removedContainer) {
                this.containers = this.containers.filter(container => container !== removedContainer);
            },

            collect() {
                // const fields = [...this.$children[0].$children[0].$children[0].$children].map(child => {
                //     return child.getData();
                // });
                //
                // console.log(fields)

                // console.log(JSON.stringify(this.containers));

                this.$nextTick(() => {
                    var a = this.containers.map(container => {
                        return container;
                    })

                    console.log(777, JSON.stringify(this.containers))

                    // console.log(JSON.stringify(a))
                })
            }
        }
    }
</script>

<style scoped>

</style>