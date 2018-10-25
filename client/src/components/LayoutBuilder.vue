<template>

    <div class="layout-builder">
        <div class="layout-builder-menu">

            <div v-if="selectedField">
                edit field

                {{selectedField}}

                {{400 * selectedField.params.size.width}}

                <br>

                <button @click="selectedField = null">Сохранить</button>
                <br>
                <br>
                <br>
                <br>


                <div class="size-selector">
                    <div
                        v-for="size in sizes"
                        @click="selectedField.params.size.width = size"
                        :class="{selected: size <= selectedField.params.size.width}"
                        :style="{width: `${100 / sizes.length}%`}"
                        class="size-selector-item"
                    ></div>
                </div>

                <div>Float</div>
                <input type="checkbox" v-model="selectedField.params.size.float">

                <div>Alignment</div>
                <div>Left</div>
                <input type="radio" value="left" name="a" v-model="selectedField.params.size.position">
                <div>Center</div>
                <input type="radio" value="center" name="a" v-model="selectedField.params.size.position">
                <div>Right</div>
                <input type="radio" value="right" name="a" v-model="selectedField.params.size.position">


                <div class="size-selector">
                    <div
                            v-for="size in sizes"
                            :style="{width: `${100 / sizes.length}%`}"
                            class="size-selector-item"
                    ></div>

                    <VueDragResize :parentLimitation="true" axis="x" :resizable="false" :w="a" @dragging="onDrag">
                    </VueDragResize>





                </div>
            </div>

            <div v-else>
                <div>Доступные элементы</div>

                <Draggable element="ul" :options="{
                    group: {name: 'items', pull: 'clone', put: false,},
                    sort: false,
                }">
                    <li v-for="item in items" :key="item.id" :data-item="item.type" class="js-item">
                        {{item.text}}
                    </li>
                </Draggable>


            </div>


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
                        @editField="triggerFieldEdit(field)"
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

        computed: {
            a() {
                return this.selectedField ? 400 * this.selectedField.params.size.width : 0;
            }
        },

        data() {
            return {
                sizes: ContainerSizes.sizes,

                fields: this.layout,

                selectedField: null,

                left: 0,
                mousepressed: false,
                pressX: 0,


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

            triggerFieldEdit(field) {
                this.selectedField = field;
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
            },

            onDrag(left) {
                console.log(left / 400 * 100)
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
        margin-left: 450px;
        background: #fafafa;
    }

    .layout-builder-menu {
        width: 450px;
        padding: 12px 24px;
        position: fixed;
        top: 64px;
        bottom: 0;
        background-color: #fff;
        border-right: 1px solid rgba(0,0,0,0.12);
        z-index: 2;
    }

    li {
        align-items: center;
        color: inherit;
        display: flex;
        font-size: 16px;
        font-weight: 400;
        height: 48px;
        margin: 0;
        padding: 0 16px;
        position: relative;
        text-decoration: none;
        cursor: pointer;
    }

    .size-selector {
        width: 100%;
        border: 1px solid royalblue;
        display: flex;
        align-items: center;
        border-radius: 4px;
        position: relative;
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

    .vdr {
        background: royalblue;
    }
</style>
