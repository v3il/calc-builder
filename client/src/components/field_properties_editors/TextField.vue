<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{title}}</h4>

        <el-input
            class="property-editor-field_field-element"
            @input="handleInput"
            v-model="content"
            clearable
        ></el-input>

        <p
            class="property-editor-field_field-description"
            v-if="description"
        >{{description}}</p>
    </div>
</template>

<script>
    export default {
        name: "TextField",

        props: {
            value: String,
            title: String,
            description: String,
        },

        data() {
            return {
                content: this.value,
            }
        },

        methods: {
            handleInput() {
                this.$emit('input', this.content);
            }
        }

        // extends: PropertyValueChangerBase,
    }
</script>

<style scoped>
    @import "settings-component-base.scss";
</style>