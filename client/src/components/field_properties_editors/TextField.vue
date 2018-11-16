<template>
    <div class="property-editor-field">
        <!--<h4 class="property-editor-field_field-title">{{options.title}}</h4>-->

        <el-input
            class="property-editor-field_field-element"
            @input="onValueChanged($event)"
            v-model="val"
            clearable
        ></el-input>

        <!--<p class="property-editor-field_field-description" v-if="options.description">{{options.description}}</p>-->
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "TextField",

        props: {
            value: String,
        },

        data() {
            return {
                val: this.value,
            }
        },

        methods: {
            onValueChanged() {
                this.$emit('valueChanged', this.val);
            }
        }

        // extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>