<template>
    <div>
        {{propertiesComponents()}}


        <br>
        <br>
        {{selectedField}}
        <br>
        <br>

        <template v-for="(c, i) in propertiesComponents()" v-if="c.component">
            <component :key="i" :is="c.component" :componentProperties="c"
                @valueChanged="selectedField.params[c.propertyName] = $event"
            ></component>
        </template>
    </div>
</template>

<script>
    import textFieldProperties from '../fields/text_field/PropertiesComponentsData';
    import buttonFieldProperties from '../fields/button_field/PropertiesComponentsData';

    import SizeSelector from './SizeSelector';
    import MarginSelector from './MarginSelector';
    import CheckBoxSelector from './CheckBoxSelector';
    import TextField from './TextField';
    import ColorSelector from './ColorSelector';

    export default {
        name: "PropertiesEditor",

        props: {
            params: Object,
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
                selectedFieldParams: this.params
            }
        },

        methods: {
            propertiesComponents() {
                switch(this.selectedField.type) {
                    case 'TextField': return textFieldProperties(this.selectedFieldParams);
                    case 'ButtonField': return buttonFieldProperties(this.selectedFieldParams);
                }
            }
        }
    }
</script>

<style scoped>

</style>