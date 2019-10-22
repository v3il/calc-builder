<template>

    <div class="layout-builder">
        <div class="layout-builder-menu">

            <div v-if="selectedField">
                <h3>Редактирование элемента</h3>

                <el-button @click="selectedField = null" size="mini" type="primary">Сохранить</el-button>

                <component
                        :fieldData="selectedField"
                        :is="selectedField.type + 'Settings'"
                        :key="`settings-component-${selectedField.id}`"
                ></component>

            </div>

            <div v-else>
                <h3>Доступные элементы</h3>

                <el-row class="tac">
                    <el-col :span="24">
                        <Draggable element="el-menu" class="el-menu-vertical-demo menu" :options="{
                            group: {name: 'items', pull: 'clone', put: false,},
                            sort: false,
                        }">
                            <el-menu-item
                                    v-for="item in items"
                                    :key="item.id"
                                    index="`${item.id}`"
                                    :data-item="item.type"
                                    class="menu-item js-item"
                            >
                                <i class="material-icons menu-item-icon">extension</i>
                                <span>{{item.text}}</span>
                            </el-menu-item>
                        </Draggable>
                    </el-col>
                </el-row>
            </div>


            <br>
            <br>

            <pre>
                {{JSON.stringify(this.fields, null, 2)}}
            </pre>
        </div>

        <div class="layout-builder-wrapper">
            <Draggable
                v-model="row.fields"
                v-for="row in rows"
                class="row"
                @add="(event) => onAdd(row, event)"
                @update="updateLayout"
                v-bind="sortableOptions"
            >
                <component
                    v-for="field in row.fields"
                    @remove-field="removeField(row, field)"
                    @edit-field="triggerFieldEdit(field)"
                    :key="field.id"
                    :is="field.type"
                    :field="field"
                ></component>
            </Draggable>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';

    import {TextField, TextFieldSettings} from './fields/text_field';
    import {TextAreaField, TextAreaFieldSettings} from './fields/textarea_field';
    import {SelectField, SelectFieldSettings} from './fields/select_field';
    import {ButtonField, ButtonFieldSettings} from './fields/button_field';
    import {SliderField, SliderFieldSettings} from './fields/slider_field';
    import {CheckBoxField, CheckBoxFieldSettings} from './fields/checkbox_field';
    import {RadioButtonField, RadioButtonFieldSettings} from './fields/radiobutton_field';

    import ImageField from './fields/image_field/ImageField.vue';

    import getNextId from '../utils/getNextId';

    import availableFields from '../constants/AvailableFields';

    import {mapGetters} from 'vuex';

    export default {
        name: 'LayoutBuilder',

        components: {
            Draggable,

            ButtonField,
            ButtonFieldSettings,
            TextField,
            TextFieldSettings,
            TextAreaField,
            TextAreaFieldSettings,
            SelectField,
            SelectFieldSettings,
            SliderField,
            SliderFieldSettings,
            CheckBoxField,
            CheckBoxFieldSettings,
            RadioButtonField,
            RadioButtonFieldSettings,

            ImageField,
        },

        props: {
            calculator: Object,
        },

        computed: {
            ...mapGetters([
                'selectedCalculator',
            ]),
        },

        data() {
            return {
                fields: this.calculator.layout,

                selectedField: null,

                items: availableFields,

                rows: this.calculator.layout || [
                    { fields: [] },
                    { fields: [] },
                    { fields: [] },
                ],

                sortableOptions: {
                    group: 'items',
                    handle: '.js-drag-field',
                }
            };
        },

        methods: {
            removeField(row, removedField) {
                row.fields = row.fields.filter(field => field !== removedField);

                if (removedField === this.selectedField) {
                    this.selectedField = null;
                }

                this.updateLayout();
            },

            triggerFieldEdit(field) {
                console.log(field);
                this.selectedField = field;
            },

            onAdd(row, { item, newIndex }) {
                row.fields.splice(newIndex, 0, {
                    id: Math.random(),
                    type: item.dataset.item,
                });

                item.remove();

                this.updateLayout();
            },

            updateLayout() {
                this.$emit('layoutUpdate', this.rows);
            },
        },
    };
</script>

<style scoped lang="scss">

    .row {
        min-height: 50px;
        border: 1px solid blue;
        display: flex;
    }

    .drag {
        width: 100%;
        padding: 12px;
        border: 1px dashed royalblue;
        border-radius: 4px;
        min-height: calc(100vh - 112px);
        margin: 0 auto;
        /*max-width: 1000px;*/

        /*display: grid;*/
        /*grid-template-columns: repeat(4, 1fr);*/
        /*grid-gap: 12px;*/
        /*grid-auto-rows: 100px;*/
    }

    .sortable-ghost {
        background: #eee;
        width: 50%;
        display: inline-block;
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
        border-right: 1px solid rgba(0, 0, 0, 0.12);
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

    .menu {
        margin-top: 12px;
        border-right: none;
    }

    .menu-item-icon {
        color: #909399 !important;
        margin-right: 12px;
    }
</style>
