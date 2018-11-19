<template>
    <div class="property-editor-field">
        <el-checkbox
            v-model="isChecked"
            @change="processChange($event)"
            class="property-editor-field_field-element"
        >
            {{title}}
        </el-checkbox>
    </div>
</template>

<script>
    export default {
        name: "CheckBoxSelector",

        props: {
            value: Boolean,
            title: String,
        },

        data() {
            return {
                isChecked: this.value,
            }
        },

        methods: {
            processChange(newValue) {
                this.$emit('input', newValue);
            }
        }
    }
</script>

<style scoped>

</style>