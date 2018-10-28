<template>
    <div class="field-wrapper">
        <FieldsParamsToolbar />

        <el-button size="medium">{{params.text}}</el-button>
    </div>
</template>

<script>
    import FieldBase from '../BaseField/field-base-script.js';

    import FieldsParamsToolbar from '../../fields_toolbar/FieldsParamsToolbar';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        components: {
            FieldsParamsToolbar,
        },

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red'
                },
            }
        },
    }
</script>

<style scoped lang="scss">
</style>