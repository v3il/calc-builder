<template>

    <div class="layout-builder">
        <div class="layout-builder-menu">

            <div v-if="selectedField">
                edit field

                {{selectedField}}

                {{400 * selectedField.params.width}}

                <br>


                <el-button @click="selectedField = null" size="mini" type="primary">Сохранить</el-button>

                <br>




                <br>

                <div class="block">
                    <span class="demonstration">Ширина элемента {{selectedField.params.width}}%</span>
                    <el-slider
                        v-model="selectedField.params.width"
                        :step="sizes[0]"
                        :min="sizes[0]"
                        :max="sizes[3]"
                        :format-tooltip="(value) => `${value}%`"
                    ></el-slider>
                </div>


                <el-checkbox v-model="selectedField.params.float">Обтекаемый элемент</el-checkbox>

                <div>Сдвиг элемента слева {{selectedField.params.marginLeft}}%</div>

                <el-slider
                    v-model="selectedField.params.marginLeft"
                    :max="100 - selectedField.params.width"
                    :disabled="selectedField.params.float"
                    :format-tooltip="(value) => `${value}%`"
                ></el-slider>

                <el-input v-model="selectedField.params.label"></el-input>
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
            <el-form @submit.native.prevent>
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
            </el-form>

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
            draggerWidth() {
                if (this.selectedField) {
                    if (this.selectedField.params.float) {
                        return 400;
                    } else {
                        return 400 / 100 * this.selectedField.params.width
                    }
                }

                return 0
                // return this.selectedField ? 400 * this.selectedField.params.size.width : 0;
            }
        },

        data() {
            return {
                sizes: ContainerSizes.sizes,

                fields: this.layout,

                selectedField: null,

                // left: 0,
                // mousepressed: false,
                // pressX: 0,
                //
                //
                // x: 0,
                // w: 50,


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

            // onDrag(newRect) {
            //     this.selectedField.params.marginLeft = Math.ceil(newRect.left / 400 * 100);
            // }
        },

        watch: {
            // draggerWidth() {
            //     if (this.selectedField) {
            //         this.$children[1].left = 0;
            //         this.selectedField.params.marginLeft = 0;
            //     }
            // }
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
        overflow-x: hidden;
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

    /*.size-selector {*/
        /*width: 100%;*/
        /*border: 1px solid royalblue;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*border-radius: 4px;*/
        /*position: relative;*/
    /*}*/

    /*.size-selector-item {*/
        /*height: 18px;*/
        /*cursor: pointer;*/
        /*border-top: 1px solid royalblue;*/
        /*border-bottom: 1px solid royalblue;*/
        /*border-right: 1px solid #555;*/

        /*&.selected {*/
            /*background: royalblue;*/
        /*}*/
    /*}*/

    /*.vdr {*/
        /*background: royalblue;*/
    /*}*/
</style>
