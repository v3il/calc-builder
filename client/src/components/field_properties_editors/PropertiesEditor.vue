<template>
    <div class="properties-editor">
        <template v-for="(componentData, index) in getFieldSettingsComponents()">
            <component
                :key="index"
                :is="componentData.component"
                :componentProperties="componentData"
                @valueChanged="selectedField.params[componentData.propertyName] = $event"
            ></component>
        </template>
    </div>
</template>

<script>
    import getFieldPropComponents from '../fields/getAllFieldsPropComponents';

    import SizeSelector from './SizeSelector';
    import MarginSelector from './Slider';
    import CheckBoxSelector from './CheckBoxSelector';
    import TextField from './TextField';
    import ColorSelector from './ColorSelector';

    export default {
        name: "PropertiesEditor",

        props: {
            selectedField: Object,
        },

        components: {
            SizeSelector,
            MarginSelector,
            CheckBoxSelector,
            TextField,
            ColorSelector,
        },

        data() {
            return {
            }
        },

        methods: {
            getFieldSettingsComponents() {
                return getFieldPropComponents(this.selectedField);
            }
        }
    }
</script>

<style scoped>
    .properties-editor {
        margin: 12px 0;
    }
</style>