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
    import propertiesToUIMapping from './propertiesToUIMapping';

    import TFProps from '../fields/text_field/PropertiesComponentsData';

    console.log(TFProps({width: 123}))

    import SizeSelector from './SizeSelector';
    import MarginSelector from './MarginSelector';
    import CheckBoxSelector from './CheckBoxSelector';

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
        },

        data() {
            return {
                a: this.params
            }
        },

        methods: {
            propertiesComponents() {
                return TFProps(this.a);

                return Object.keys(this.a)
                    .map((propertyName) => {
                        console.log(1)

                        return Object.assign({}, propertiesToUIMapping[propertyName] || {}, {
                            propertyName,
                        })
                    });
            }
        }
    }
</script>

<style scoped>

</style>