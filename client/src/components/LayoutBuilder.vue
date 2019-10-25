<template>
    <section class="layout-builder">
        <aside class="layout-builder__sidebar">
            <div class="layout-builder__settings-editor" v-if="selectedField">
                <h3 class="layout-builder__section-title">Редактирование элемента</h3>

                <button class="layout-builder__settings-editor-save button button--primary" @click="selectedField = null">
                    Сохранить
                </button>

                <component
                    :is="`${selectedField.type}Settings`"
                    :fieldData="selectedField"
                    :key="`settings-component-${selectedField.id}`"
                    class="layout-builder__property-editor"
                ></component>
            </div>

            <div v-else>
                <h3>Доступные элементы</h3>

                <el-row class="tac">
                    <el-col :span="24">
                        <Draggable element="el-menu" class="el-menu-vertical-demo menu"
                                   @start="handleDragStart"
                                   @end="handleDragEnd"
                                   :options="{
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
        </aside>

        <main class="layout-builder__content">
            <Draggable
                v-model="row.fields"
                v-for="(row, rowIndex) in rows"
                class="row"
                :class="{'row--disabled': row.disabled}"
                @add="onAdd(row, $event)"
                @update="updateLayout"
                @start="handleDragStart(row)"
                @end="handleDragEnd"
                v-bind="sortableOptions"
                :data-rowindex="rowIndex"
                :key="rowIndex"
                :disabled="row.disabled"
            >
                <component
                    v-for="field in row.fields"
                    @remove-field="removeField(row, field)"
                    @edit-field="triggerFieldEdit(field)"
                    :key="field.id"
                    :is="field.type"
                    :field="field"
                    class="js-item"
                    :data-id="field.id"
                ></component>
            </Draggable>
        </main>
    </section>
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

            fieldList() {
                const r = [];

                this.rows.forEach(row => {
                    r.push(...row.fields);
                });

                return r;
            }
        },

        data() {
            return {
                MAX_ITEMS_PER_ROW: 4,

                fields: this.calculator.layout,

                selectedField: null,

                items: availableFields,

                rows: this.calculator.layout || [
                    { fields: [], disabled: false },
                    { fields: [], disabled: false },
                    { fields: [], disabled: false },
                ],

                sortableOptions: {
                    group: { name: 'items' },
                    handle: '.js-drag-field',
                    sort: true,
                }
            };
        },

        methods: {
            removeField(row, removedField) {
                row.fields = row.fields.filter(field => field !== removedField);

                if (removedField === this.selectedField) {
                    this.selectedField = null;
                }

                this.ensureEmptyRow();
                this.updateLayout();
            },

            triggerFieldEdit(field) {
                console.log(field);
                this.selectedField = field;
            },

            onAdd(row, event) {
                const { item, from, newIndex } = event;

                console.log('Add');

                if (!from.classList.contains('row')) {
                    row.fields.splice(newIndex, 0, {
                        id: Math.random(),
                        type: item.dataset.item,
                    });
                }

                this.ensureEmptyRow();
                item.remove();
                this.updateLayout();
            },

            ensureEmptyRow() {
                this.removeEmptyRows();
                this.appendEmptyRow();
            },

            appendEmptyRow() {
                this.rows.push({ fields: [], disabled: false });
            },

            removeEmptyRows() {
                this.rows = this.rows.filter(item => item.fields.length > 0);
            },

            updateLayout() {
                console.log('Update');
                this.$emit('layoutUpdate', this.rows);
            },

            handleDragStart(row) {
                console.log('Start');

                this.rows
                    .filter(item => item !== row)
                    .forEach(item => item.disabled = item.fields.length >= this.MAX_ITEMS_PER_ROW);
            },

            handleDragEnd() {
                this.rows.forEach(item => item.disabled = false);
            }
        },
    };
</script>

<style scoped lang="scss">

    .row {
        min-height: 50px;
        border: 1px solid lightblue;
        display: flex;

        &--disabled {
            background-color: #ccc;
            opacity: 0.5;
        }
    }

    .drag {
        width: 100%;
        padding: 12px;
        border: 1px dashed royalblue;
        border-radius: 4px;
        min-height: calc(100vh - 112px);
        margin: 0 auto;
    }

    .sortable-ghost {
        background: #eee;
        width: 50%;
        display: inline-block;
        flex: 1;
    }

    .layout-builder {
        height: 100%;

        &__sidebar {
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

        &__content {
            padding: 24px;
            overflow-y: auto;
            margin-left: 450px;
            background: #fafafa;
        }

        &__settings-editor {

        }

        &__settings-editor-save {
            margin: 12px 0;
        }
    }

    .layout-builder-wrapper {

    }

    .layout-builder-menu {

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
