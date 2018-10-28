<template>
    <el-form-item>
        <label for="a1" class="el-form-item__label">{{params.label}}</label>
        <el-input v-model="params.text" id="a1"></el-input>
    </el-form-item>
</template>

<script>
    import FieldBase from '../BaseField/field-base-script.js';
    import Template from '../BaseField/field-base-template';

    import FieldsParamsToolbar from '../../fields_toolbar/FieldsParamsToolbar';

    import extendTemplateSlots from '../../../helpers/extendTemplate';

    export default {
        name: "TextField",

        extends: FieldBase,

        template: extendTemplateSlots(Template, {
            'default': `
                <el-form-item>
                    <label for="a1" class="el-form-item__label">{{params.label}}</label>
                    <el-input v-model="params.text" id="a1"></el-input>
                </el-form-item>
            `,
            'actions': `
                <button type="button" @click="asd">Do Something</button>
            `,
        }),

        components: {
            FieldsParamsToolbar,
        },

        data() {
            return {
                defaultOptions: {
                    text: 'Input',
                    borderColor: 'red',

                    label: 'Label for input',

                    width: 100,
                    float: true,
                    marginLeft: 0,
                },
            }
        },

        methods: {
            onInput(event) {
                this.params.label = event.target.textContent;
            },
        },

        created() {
            console.log(FieldBase, this.template)
        }
    }
</script>

<style scoped  lang="scss">
    @import "../BaseField/field-base-style";

    input {
        width: 100%;
    }
</style>