<template>
    <v-card id="asd">
        <v-container fluid grid-list-md>

            <Draggable v-model="fields" class="drag layout row wrap" @add="onAdd" :options="{
                group: 'items',
            }">
                <template v-for="field in fields">
                    <component
                        @removeField="removeField(field)"
                        @optionsUpdate="updateOptions(field, $event)"
                        :key="field.id"
                        :is="field.type"
                        :options="field.params"
                    ></component>
                </template>
            </Draggable>

            {{JSON.stringify(this.fields)}}


        </v-container>
    </v-card>
</template>

<script>
    import LayoutContainerModel from '../models/LayoutContainer';

    import Draggable from 'vuedraggable';
    import LayoutContainer from './LayoutContainer.vue';

    import ButtonField from './fields/ButtonField.vue';
    import TextField from './fields/TextField.vue';

    import getNextId from '../utils/getNextId';

    import ContainerAlignmentPositions from '../constants/ContainerAlignmentPositions';
    import ContainerSizes from '../constants/ContainerSizes';

    export default {
        name: "LayoutBuilder",

        components: {
            Draggable,
            // LayoutContainer,
            ButtonField,
            TextField,
        },

        props: {
            layout: Array,
        },

        data() {
            return {
                fields: this.layout,
            }
        },

        methods: {
            add() {
                this.fields.push(new LayoutContainerModel(getNextId(this.fields)));
            },

            removeField(removedField) {
                this.fields = this.fields.filter(field => field !== removedField);
            },

            collect() {
                console.log(777, JSON.stringify(this.fields))
            },

            onAdd(event) {
                const itemElement = event.item;
                const fieldIndex = event.newIndex;

                this.fields.splice(fieldIndex, 0, {
                    id: getNextId(this.fields),
                    type: itemElement.children[0].dataset.item,
                    params: {},
                });

                itemElement.remove();
            },

            updateOptions(field, newOptions) {
                field.params = newOptions;
            }
        }
    }
</script>

<style scoped lang="scss">
    .drag {
        width: 100%;
        padding: 12px;
        border: 1px dashed royalblue;
        border-radius: 4px;
        min-height: 100px;
    }
</style>
