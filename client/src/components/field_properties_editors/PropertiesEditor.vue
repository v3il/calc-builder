<template>
    <div>
        {{propertiesComponents()}}

        <template v-for="(c, i) in propertiesComponents()" v-if="c.component">
            <component :key="i" :is="c.component" :params="params" :propertyName="c.propertyName"></component>
        </template>
    </div>
</template>

<script>
    import propertiesToUIMapping from './propertiesToUIMapping';

    import Slider from './Slider';

    export default {
        name: "PropertiesEditor",

        props: {
            params: Object,
        },

        components: {
            Slider,
        },

        data() {
            return {
                a: this.params
            }
        },

        methods: {
            propertiesComponents() {
                return Object.keys(this.a)
                    .map((propertyName) => {
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