<template>
    <section class="layout-builder">
        <aside class="layout-builder__sidebar">
            <div class="layout-builder__settings-editor" v-if="selectedField">
                <h3 class="layout-builder__section-title">Редактирование элемента</h3>

                <button class="layout-builder__settings-editor-save button button--primary" @click="saveEditedField">
                    Сохранить
                </button>

                <component
                    :is="`${selectedField.type}Settings`"
                    :fieldData="selectedField"
                    :key="`settings-component-${selectedField.id}`"
                    class="layout-builder__property-editor"
                ></component>
            </div>

            <div class="layout-builder__available-widgets" v-else>
                <h3 class="layout-builder__section-title">Доступные элементы</h3>

                <Draggable
                    tag="ul"
                    class="layout-builder__widgets-list"
                    @start="handleDragStart"
                    @end="handleDragEnd"
                    @add="ensureEmptyRow"
                    v-bind="sidebarDraggableOptions"
                >
                    <li
                        v-for="item in items"
                        :key="item.id"
                        :data-item="item.type"
                        class="layout-builder__widget-item"
                        :class="`layout-builder__widget-item--${item.id}`"
                    >
                        <i class="material-icons layout-builder__widget-icon">extension</i>
                        <span class="layout-builder__widget-name">{{item.text}}</span>
                    </li>
                </Draggable>
            </div>
        </aside>

        <main class="layout-builder__rows-wrapper">
            <div class="layout-builder__form-content">
                <Draggable
                    v-model="row.fields"
                    v-for="(row, rowIndex) in layoutRows"
                    class="layout-builder__layout-row js-layout-row"
                    :class="{ 'layout-builder__layout-row--disabled': row.disabled }"
                    @add="onAdd(row, $event)"
                    @update="updateLayout"
                    @start="handleRowItemDragStart(row)"
                    @end="handleRowItemDragEnd"
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
                        :data-id="field.id"
                        class="layout-builder__row-item"
                    ></component>
                </Draggable>
            </div>
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

            ButtonField, ButtonFieldSettings,
            TextField, TextFieldSettings,
            TextAreaField, TextAreaFieldSettings,
            SelectField, SelectFieldSettings,
            SliderField, SliderFieldSettings,
            CheckBoxField, CheckBoxFieldSettings,
            RadioButtonField, RadioButtonFieldSettings,

            ImageField,
        },

        props: {
            form: {
                type: Object,
                required: true,
            }
        },

        computed: {
            fieldsList() {
                return this.layoutRows.reduce((result, current) => {
                    return result.concat(current.fields);
                }, []);
            }
        },

        data() {
            return {
                MAX_ITEMS_PER_ROW: 4,

                selectedField: null,

                items: availableFields,

                layoutRows: [],

                sortableOptions: {
                    group: { name: 'items' },
                    handle: '.js-drag-field',
                    sort: true,
                    ghostClass: 'layout-builder__sortable-ghost'
                },

                sidebarDraggableOptions: {
                    group: { name: 'items', pull: 'clone', put: false },
                    sort: false,
                },

                garbageDraggableOptions: {
                    group: { name: 'items', pull: 'clone', put: true },
                    sort: false,
                },

                garbageDraggableVisible: false,
            };
        },

        methods: {
            removeField(row, removedField) {
                console.log('Remove');

                if (removedField === this.selectedField) {
                    this.saveEditedField();
                }

                row.fields = row.fields.filter(field => field !== removedField);

                this.ensureEmptyRow();
                this.updateLayout();
            },

            triggerFieldEdit(field) {
                this.selectedField = field;

                field.internal.selected = true;

                this.fieldsList
                    .filter(item => item !== field)
                    .forEach((item) => {
                        item.internal.disabled = true;
                    });
            },

            saveEditedField() {
                this.selectedField.internal.selected = false;

                this.selectedField = null;

                this.fieldsList.forEach((item) => {
                    item.internal.disabled = false;
                });
            },

            onAdd(row, event) {
                const { item, from, newIndex } = event;

                console.log('Add');

                if (!from.classList.contains('js-layout-row')) {
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
                this.layoutRows.push({ fields: [], disabled: false });
            },

            removeEmptyRows() {
                this.layoutRows = this.layoutRows.filter(item => item.fields.length > 0);
            },

            updateLayout() {
                console.log('Update');
                this.form.layout = this.layoutRows;
                this.$store.dispatch('updateData');
            },

            handleDragStart(row) {
                this.layoutRows
                    .filter(item => item !== row)
                    .filter(({ fields }) => fields.length >= this.MAX_ITEMS_PER_ROW)
                    .forEach((item) => {
                        item.disabled = true;

                        item.fields.forEach((item) => {
                            item.internal.disabled = true;
                        });
                    });
            },

            handleDragEnd() {
                this.layoutRows.forEach((item) => {
                    item.disabled = false;

                    item.fields.forEach((item) => {
                        // Excluding just added widget if any exists
                        if (item.internal) {
                            item.internal.disabled = false;
                        }
                    });
                });
            },

            handleRowItemDragStart(row) {
                // this.garbageDraggableVisible = true;
                this.handleDragStart(row);
            },

            handleRowItemDragEnd() {
                // this.garbageDraggableVisible = false;
                this.handleDragEnd();
            },
        },

        created() {
            this.layoutRows = this.form.layout || [
                { fields: [], disabled: false },
            ];
        }
    };
</script>

<style scoped lang="scss">
    .layout-builder {
        display: flex;
        height: 100%;

        // Sidebar
        &__sidebar {
            width: 450px;
            padding: 12px 24px;
            background-color: #fff;
            border-right: 1px solid rgba(0, 0, 0, 0.12);
            overflow-x: hidden;
        }

        &__garbage-draggable {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: $bg_primary_light;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__garbage-icon {
            font-size: 30px;
            color: $color_primary;
        }

        &__rows-wrapper {
            padding: 24px;
            overflow-y: auto;
            flex: 1;
        }

        &__form-content {
            margin: 0 auto;
        }

        &__settings-editor-save {
            margin: 12px 0;
        }

        &__widgets-list {
            margin-top: 18px;
        }

        &__widget-item {
            list-style: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-left: 3px solid transparent;
            flex: 1;
            transition: background-color 0.3s;
            padding: 12px;
            margin: 12px 0;
        }

        &__widget-icon {
            margin-right: 12px;
        }

        &__widget-item--input &__widget-icon { color: $bright_color1 }
        &__widget-item--input {
            border-left-color: $bright_color1;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color1, 30%), $white);
            }
        }

        &__widget-item--textarea &__widget-icon { color: $bright_color2 }
        &__widget-item--textarea {
            border-left-color: $bright_color2;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color2, 40%), $white);
            }
        }

        &__widget-item--slider &__widget-icon { color: $bright_color3 }
        &__widget-item--slider {
            border-left-color: $bright_color3;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color3, 30%), $white);
            }
        }

        &__widget-item--select &__widget-icon { color: $bright_color4 }
        &__widget-item--select {
            border-left-color: $bright_color4;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color4, 60%), $white);
            }
        }

        &__widget-item--radio &__widget-icon { color: $bright_color5 }
        &__widget-item--radio {
            border-left-color: $bright_color5;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color5, 40%), $white);
            }
        }

        &__widget-item--checkbox &__widget-icon { color: $bright_color6 }
        &__widget-item--checkbox {
            border-left-color: $bright_color6;

            &:hover {
                background: linear-gradient(to right, lighten($bright_color6, 60%), $white);
            }
        }

        // Builder
        &__layout-row {
            border: 1px solid $gray;
            display: flex;
            flex-wrap: wrap;
            padding: 6px;

            margin: 12px 0;

            &:empty {
                min-height: 100px;
            }
        }

        &__layout-row &__widget-item {
            margin: 6px;
        }

        &__sortable-ghost {
            background: $gray;
            flex: 1;
        }

        &__row-item {
            min-width: 200px;
        }
    }
</style>
