<template>

    <div class="layout-builder">
        <div class="layout-builder-menu">
            <div>Доступные элементы</div>

            <Draggable element="ul" :options="{
                group: {name: 'items', pull: 'clone', put: false,},
                sort: false,
            }">
                <li v-for="item in items" :key="item.id" :data-item="item.type" class="js-item">
                    {{item}}
                </li>
            </Draggable>

            <br>
            <br>

            {{JSON.stringify(this.fields)}}
        </div>

        <div class="layout-builder-wrapper">
            <Draggable v-model="fields" class="drag" @add="onAdd" :options="{
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


        </div>
    </div>
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
            ButtonField,
            TextField,
        },

        props: {
            layout: Array,
        },

        data() {
            return {
                fields: this.layout,

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

                console.log(event)

                const itemElement = event.item;
                const fieldIndex = event.newIndex;

                this.fields.splice(fieldIndex, 0, {
                    id: getNextId(this.fields),
                    type: itemElement./*children[0].*/dataset.item,
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
        min-height: calc(100vh - 112px);
        margin: 0 auto;
        max-width: 1000px;
    }

    .layout-builder {
        height: 100%;
    }

    .layout-builder-wrapper {
        padding: 24px;
        overflow-y: auto;
        margin-left: 350px;
    }

    .layout-builder-menu {
        width: 350px;
        padding: 12px 24px;
        background-color: darkcyan;
        position: fixed;
        top: 64px;
        bottom: 0;
    }
</style>
