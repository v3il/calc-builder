<template>

    <div class="layout-builder">
        <div class="layout-builder-menu">

            <div v-if="selectedField">
                <h3>Редактирование элемента</h3>

                <el-button @click="selectedField = null" size="mini" type="primary">Сохранить</el-button>

                <component
                    :fieldData="selectedField"
                    :is="selectedField.type + 'Settings'"
                ></component>

                <!--<SelectSettings :fieldData="selectedField"></SelectSettings>-->
                <!--<TextFieldSettings :fieldData="selectedField"></TextFieldSettings>-->

                <!--<PropertiesEditor :selectedField="selectedField"></PropertiesEditor>-->
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
                            :key="field.id"
                            :is="field.type"
                            :field="field"
                        ></component>
                    </template>
                </Draggable>
            </el-form>

        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';

    import { TextField, TextFieldSettings } from './fields/text_field';
    import { TextAreaField, TextAreaFieldSettings } from './fields/textarea_field';
    import { SelectField, SelectFieldSettings } from './fields/select_field';
    import { ButtonField, ButtonFieldSettings } from './fields/button_field';

    // import ButtonField from './fields/button_field/ButtonField.vue';
    // import TextField from './fields/text_field/TextField.vue';
    // import TextAreaField from './fields/textarea_field/TextAreaField.vue';
    import SliderField from './fields/slider_field/SliderField.vue';
    // import SelectField from './fields/select_field/SelectField.vue';
    import ImageField from './fields/image_field/ImageField.vue';
    import CheckBoxField from './fields/checkbox_field/CheckBoxField';
    import RadioButtonField from './fields/radiobutton_field/RadioButtonField';

    // import SelectFieldSettings from './fields/select_field/SelectFieldSettings.vue';
    // import TextFieldSettings from './fields/text_field/TextFieldSettings.vue';
    // import TextAreaFieldSettings from './fields/textarea_field/TextAreaFieldSettings.vue';

    import getNextId from '../utils/getNextId';

    // import ContainerSizes from '../constants/ContainerSizes';
    import availableFields from '../constants/AvailableFields';

    import {mapGetters} from 'vuex';
    // import PropertiesEditor from './field_properties_editors/PropertiesEditor';

    export default {
        name: "LayoutBuilder",

        components: {
            Draggable,

            ButtonField, ButtonFieldSettings,
            TextField, TextFieldSettings,
            TextAreaField, TextAreaFieldSettings,
            SelectField, SelectFieldSettings,

            SliderField,
            ImageField,
            CheckBoxField,
            RadioButtonField,
        },

        props: {
            layout: Array,
        },

        computed: {
            ...mapGetters([
                'selectedCalculator',
            ]),
        },

        data() {
            return {
                // sizes: ContainerSizes.sizes,

                fields: this.layout,

                selectedField: null,

                items: availableFields,
            }
        },

        methods: {
            removeField(removedField) {
                this.fields = this.fields.filter(field => field !== removedField);

                if (removedField === this.selectedField) {
                    this.selectedField = null;
                }
            },

            triggerFieldEdit(field) {
                this.selectedField = field;
            },

            collect() {
                console.log(777, JSON.stringify(this.fields))
            },

            onAdd(event) {
                const itemElement = event.item;
                const fieldIndex = event.newIndex;

                this.fields.splice(fieldIndex, 0, {
                    id: getNextId(this.fields),
                    type: itemElement.dataset.item,
                    params: {},
                });

                itemElement.remove();
            },
        },

        mounted() {
            console.log(this.$store.getters)
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

    .menu {
        margin-top: 12px;
        border-right: none;
    }

    .menu-item-icon {
        color: #909399 !important;
        margin-right: 12px;
    }
</style>
