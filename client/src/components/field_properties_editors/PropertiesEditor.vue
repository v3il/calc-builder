<template>
    <div class="properties-editor">
        <template v-for="(value, key, index) in fieldSettingsComponentsData">
            <h3 v-if="value.components.length">{{value.title}}</h3>

            <component
                v-for="(component, cIndex) in value.components"
                :key="selectedField.id + key + cIndex + index"
                :is="component.component"
                :componentProperties="component"
                @valueChanged="selectedField.params[component.propertyName] = $event"
            ></component>
        </template>

        {{selectedField}}
        <br>
    </div>
</template>

<script>
    import getFieldPropComponents from '../fields/getAllFieldsPropComponents';

    import ButtonsGroup from './ButtonsGroup';
    import MarginSelector from './Slider';
    import CheckBoxSelector from './CheckBoxSelector';
    import TextField from './TextField';
    import ColorSelector from './ColorSelector';
    import Slider from './Slider';
    import TextFieldNumber from './TextFieldNumber';
    import SelectOptionsManager from './SelectOptionsManager';

    import {CategoriesIds, CategoriesNames} from "../../constants/SettingsFieldsCategories";

    export default {
        name: "PropertiesEditor",

        props: {
            selectedField: Object,
        },

        components: {
            ButtonsGroup,
            MarginSelector,
            CheckBoxSelector,
            TextField,
            ColorSelector,
            Slider,
            TextFieldNumber,
            SelectOptionsManager,
        },

        data() {
            return {
                // fieldSettingsComponents: getFieldPropComponents(this.selectedField),
            }
        },

        computed: {
            fieldSettingsComponents() {
                return getFieldPropComponents(this.selectedField)
            },

            fieldSettingsComponentsData() {
                const componentsMapping = {};

                for (let categoryId in CategoriesIds) {
                    const category = CategoriesIds[categoryId];
                    componentsMapping[category] = {};

                    console.log(this.fieldSettingsComponents)

                    componentsMapping[category].title = CategoriesNames[categoryId];

                    componentsMapping[category].components = Object.values(this.fieldSettingsComponents)
                        .filter(propertyData => {
                            return propertyData.category === category
                        });
                }

                return componentsMapping;
            },
        },

        methods: {

        }
    }
</script>

<style scoped>
    .properties-editor {
        margin: 12px 0;
    }
</style>