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
                        <Draggable element="el-menu" class="el-menu-vertical-demo menu" :move="onMove" :options="{
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
            {{fieldList}}

            <Draggable
                v-model="row.fields"
                v-for="(row, rowIndex) in rows"
                class="row"
                @add="(event) => onAdd(row, rowIndex, event)"
                @update="updateLayout"
                v-bind="sortableOptions"
                :data-rowindex="rowIndex"
                :key="rowIndex"
            >
                {{row.fields.length}}
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

            {{calculator}}
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
                fields: this.calculator.layout,

                selectedField: null,

                items: availableFields,

                rows: this.calculator.layout || [
                    { fields: [] },
                    { fields: [] },
                    { fields: [] },
                ],

                sortableOptions: {
                    group: { name: 'items', pull: true, put: false },
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

                this.updateLayout();
            },

            triggerFieldEdit(field) {
                console.log(field);
                this.selectedField = field;
            },

            onAdd(row, rowIndex, event) {
                console.log('Add')

                const itemElement = event.item;
                const destinationElement = event.to;

                if (event.from.classList.contains('row')) {
                    itemElement.remove();
                    return;
                }

                const fieldIndex = event.newIndex;

                // const activatedWidgetId = itemElement.dataset.widgetid;
                // const activatedWidget = this.allWidgets.find(widget => widget.id === activatedWidgetId);

                const destinationColumnId = destinationElement.dataset.column;

                row.fields.splice(fieldIndex, 0, {
                    id: Math.random(),
                    type: itemElement.dataset.item,
                });

                // this.layout[`col${destinationColumnId}`]
                //     .splice(fieldIndex, 0, {
                //         id: Math.random(),
                //         type: item.dataset.item,
                //     });

                itemElement.remove();

                this.updateLayout();


                // const { item, newIndex, from, to } = event;
                //
                // console.log(event)
                //
                // console.error('ADDDDDD', from, row);
                //
                // const fieldId = item.dataset.id;
                //
                // const newRowIndex = +to.dataset.rowindex;
                //
                //
                //
                // const field = this.getById(parseFloat(fieldId))
                //
                // console.warn(fieldId, field)
                //
                // if (from.classList.contains('row')) {
                //     // const newRowIndex = +row.dataset.rowindex;
                //     const rowIndex = +from.dataset.rowindex;
                //
                //     console.log('Add from other row', rowIndex, newRowIndex);
                //
                //     row.fields.splice(newIndex, 0, {...field});
                //
                //     // this.rows[rowIndex].fields = this.rows[rowIndex].fields.filter(field => field.id !== +fieldId)
                // } else {
                //     // const newRowIndex = +row.dataset.rowindex;
                //     console.log('Add from sidebar to', newRowIndex);
                //
                //     row.fields.splice(newIndex, 0, {
                //         id: Math.random(),
                //         type: item.dataset.item,
                //     });
                //
                //     item.remove();
                // }
                //
                // this.updateLayout();
            },

            updateLayout() {
                console.log('Update')

                // this.$emit('layoutUpdate', this.rows);
            },

            onMove(evt, originalEvent) {
                console.log(evt, originalEvent)
            },

            getById(id) {
                return this.fieldList.find(i => i.id === id);
            }
        },

        // created() {
        //     document.addEventListener('drag', ({ target }) => {
        //         return;
        //
        //         const parentRow = target.closest('.row');
        //
        //         if (!parentRow) {
        //             console.log('No row');
        //             return;
        //         }
        //
        //         const rowIndex = parentRow.dataset.rowindex;
        //
        //         const rowData = this.rows[rowIndex];
        //
        //         // rowData.fields.forEach(item => {
        //         //     console.log(item)
        //         //
        //         //     // this.$set(item.params, 'width', )
        //         //
        //         //     item.params.width = 100 / (rowData.fields.length);
        //         // });
        //
        //         // if (rowData.fields.length === 0) {
        //         //     target.style.flexBasis = '100%';
        //         // }
        //         //
        //         // if (rowData.fields.length === 1) {
        //         //     target.style.flexBasis = '50%';
        //         // }
        //         //
        //         // if (rowData.fields.length === 2) {
        //         //     target.style.flexBasis = '25%';
        //         // }
        //
        //         // console.log(rowData.fields.length, parentRow.querySelectorAll('.js-item').length)
        //     })
        // }
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
