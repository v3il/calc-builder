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
    import TFProps from '../fields/text_field/PropertiesComponentsData';

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
                a: this.params
            }
        },

        methods: {
            propertiesComponents() {
                return TFProps(this.a);
            }
        }
    }
</script>

<style scoped>

</style>