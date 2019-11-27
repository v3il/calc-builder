<template>
    <section class="layout-builder">
        <aside class="layout-builder__sidebar">
            <div class="layout-builder__settings-editor" v-if="selectedField">
                <h3 class="layout-builder__section-title">
                    {{ uSign('translate', 'Редактирование элемента') }}
                </h3>

                <button
                    class="layout-builder__settings-editor-save button button--primary"
                    @click="saveEditedField"
                >
                    {{ uSign('translate', 'Закрыть') }}
                </button>

                <component
                    :is="`${selectedField.type}Settings`"
                    :fieldData="selectedField"
                    :key="`settings-component-${selectedField.id}`"
                    class="layout-builder__property-editor"
                ></component>
            </div>

            <div class="layout-builder__available-widgets" v-else>
                <h3 class="layout-builder__section-title">
                    {{ uSign('translate', 'Доступные элементы') }}
                </h3>

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
                        <span class="layout-builder__widget-name">{{ item.text }}</span>
                    </li>
                </Draggable>
            </div>
        </aside>

        <main class="layout-builder__rows-wrapper">
            <draggable
                v-model="form.layout"
                class="layout-builder__form-content"
                v-bind="rowsSortableOptions"
                @update="onRowSort"
            >
                <draggable
                    v-model="row.fields"
                    v-for="(row, rowIndex) in form.layout"
                    class="layout-builder__layout-row js-layout-row"
                    :class="{ 'layout-builder__layout-row--disabled': disabledRows.includes(row) }"
                    @add="onAdd(row, $event)"
                    @update="updateLayout"
                    @start="handleRowItemDragStart(row)"
                    @end="handleRowItemDragEnd"
                    v-bind="sortableOptions"
                    :data-rowindex="rowIndex"
                    :key="rowIndex"
                    :disabled="disabledRows.includes(row)"
                >
                    <component
                        v-for="field in row.fields"
                        @remove-field="removeField(row, field)"
                        @edit-field="triggerFieldEdit(field)"
                        :key="field.id"
                        :is="field.type"
                        :field="field"
                        :data-id="field.id"
                        :disabled="
                            (selectedField && field !== selectedField) || disabledRows.includes(row)
                        "
                        :selected="selectedField && field === selectedField"
                        class="layout-builder__row-item"
                    ></component>

                    <i
                        v-if="row.fields.length"
                        class="material-icons js-row-drag-handle layout-builder__row-handle"
                        >apps</i
                    >
                </draggable>
            </draggable>

            <div class="layout-builder__form-content"></div>
        </main>
    </section>
</template>

<script>
import Draggable from 'vuedraggable';

import { TextField, TextFieldSettings } from './fields/text_field';
import { TextAreaField, TextAreaFieldSettings } from './fields/textarea_field';
import { SelectField, SelectFieldSettings } from './fields/select_field';
import { ButtonField, ButtonFieldSettings } from './fields/button_field';
import { SliderField, SliderFieldSettings } from './fields/slider_field';
import { CheckBoxField, CheckBoxFieldSettings } from './fields/checkbox_field';
import { RadioButtonField, RadioButtonFieldSettings } from './fields/radiobutton_field';
import { ResultField } from './fields/result_field';

import ImageField from './fields/image_field/ImageField.vue';

import availableFields from '../constants/AvailableFields';

import generateLetterForField from '../utils/generateLetterForField';

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
        ResultField,

        ImageField,
    },

    props: {
        form: {
            type: Object,
            required: true,
        },
    },

    computed: {
        fieldsList() {
            return this.form.layout.reduce((result, current) => result.concat(current.fields), []);
        },
    },

    data() {
        return {
            MAX_ITEMS_PER_ROW: 4,

            selectedField: null,

            items: availableFields,

            disabledRows: [],

            sortableOptions: {
                group: { name: 'items' },
                handle: '.js-drag-field',
                sort: true,
                ghostClass: 'layout-builder__sortable-ghost',
            },

            rowsSortableOptions: {
                group: { name: 'rows' },
                handle: '.js-row-drag-handle',
                sort: true,
                ghostClass: 'layout-builder__row-sortable-ghost',
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
        },

        saveEditedField() {
            this.selectedField = null;
        },

        onAdd(row, event) {
            const { item, from, newIndex } = event;

            console.log('Add');

            if (!from.classList.contains('js-layout-row')) {
                const newFieldType = item.dataset.item;

                const newFieldProto = {
                    id: Math.random(),
                    type: newFieldType,
                    letter: generateLetterForField(this.fieldsList, newFieldType),
                };

                row.fields.splice(newIndex, 0, newFieldProto);
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
            this.form.layout.push({ fields: [] });
        },

        removeEmptyRows() {
            this.form.layout = this.form.layout.filter(({ fields }) => fields.length > 0);
        },

        onRowSort() {
            this.ensureEmptyRow();
            this.updateLayout();
        },

        updateLayout() {
            console.log('Update');
            this.$store.dispatch('updateData');
        },

        handleDragStart(row) {
            this.disabledRows = this.form.layout
                .filter(item => item !== row)
                .filter(({ fields }) => fields.length >= this.MAX_ITEMS_PER_ROW);
        },

        handleDragEnd() {
            this.disabledRows = [];
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
};
</script>

<style scoped lang="scss">
.layout-builder {
    display: flex;
    height: 100%;

    // Sidebar
    &__sidebar {
        width: 450px;
        padding: 24px;
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

    &__widget-item--input &__widget-icon {
        color: $input_widget;
    }

    &__widget-item--input {
        border-left-color: $input_widget;

        &:hover {
            background: linear-gradient(to right, $input_widget_light, $white);
        }
    }

    &__widget-item--textarea &__widget-icon {
        color: $textarea_widget;
    }

    &__widget-item--textarea {
        border-left-color: $textarea_widget;

        &:hover {
            background: linear-gradient(to right, $textarea_widget_light, $white);
        }
    }

    &__widget-item--slider &__widget-icon {
        color: $slider_widget;
    }

    &__widget-item--slider {
        border-left-color: $slider_widget;

        &:hover {
            background: linear-gradient(to right, $slider_widget_light, $white);
        }
    }

    &__widget-item--select &__widget-icon {
        color: $select_widget;
    }

    &__widget-item--select {
        border-left-color: $select_widget;

        &:hover {
            background: linear-gradient(to right, $select_widget_light, $white);
        }
    }

    &__widget-item--radio &__widget-icon {
        color: $radio_widget;
    }

    &__widget-item--radio {
        border-left-color: $radio_widget;

        &:hover {
            background: linear-gradient(to right, $radio_widget_light, $white);
        }
    }

    &__widget-item--checkbox &__widget-icon {
        color: $checkbox_widget;
    }

    &__widget-item--checkbox {
        border-left-color: $checkbox_widget;

        &:hover {
            background: linear-gradient(to right, $checkbox_widget_light, $white);
        }
    }

    &__widget-item--result &__widget-icon {
        color: $result_widget;
    }

    &__widget-item--result {
        border-left-color: $result_widget;

        &:hover {
            background: linear-gradient(to right, $result_widget_light, $white);
        }
    }

    // Builder
    &__layout-row {
        border: 1px solid $gray;
        display: flex;
        flex-wrap: wrap;
        padding: 6px;
        margin: 12px 0;
        position: relative;

        &:first-child {
            margin-top: 6px;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &:empty {
            min-height: 100px;
        }
    }

    &__row-handle {
        position: absolute;
        top: calc(50% - 10px);
        right: -10px;
        width: 20px;
        height: 20px;
        background: #263238;
        color: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        box-sizing: content-box;
        font-size: 20px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: $success;
        }
    }

    &__layout-row &__widget-item {
        margin: 6px 0;
    }

    &__sortable-ghost,
    &__row-sortable-ghost {
        background: $gray;
        flex: 1;
    }

    &__row-item {
        min-width: 200px;
    }
}
</style>
