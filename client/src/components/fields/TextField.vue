<template>
    <div :style="{
        width: params.float ? params.width + '%' : '100%',
    }" class="field-wrapper">
        <FieldsParamsToolbar>
            <FieldSizeAndPositionSelector @editField="emitFieldEdit"></FieldSizeAndPositionSelector>
            <RemoveFieldToolbarItem @fieldRemove="emitFieldRemove"></RemoveFieldToolbarItem>
        </FieldsParamsToolbar>

        <div :style="{
            width: params.float ? '100%' : params.width + '%',
            'margin-left': params.float ? '0' : params.marginLeft + '%',
        }">
            <el-form-item>
                <label for="a1" class="el-form-item__label">{{params.label}}</label>
                <el-input v-model="params.text" id="a1"></el-input>
            </el-form-item>
        </div>
    </div>
</template>

<script>
    import FieldBase from './FieldBase.vue';

    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';
    import RemoveFieldToolbarItem from '../fields_toolbar/RemoveFieldToolbarItem';
    import FieldSizeAndPositionSelector from '../fields_toolbar/FieldSizeAndPositionSelector';

    export default {
        name: "TextField",

        extends: FieldBase,

        components: {
            FieldsParamsToolbar,
            RemoveFieldToolbarItem,
            FieldSizeAndPositionSelector,
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
            }
        }
    }
</script>

<style scoped  lang="scss">
    input {
        width: 100%;
    }

    .at-left {
        float: left;
    }

    .at-center {
        margin: 0 auto;
    }

    .at-right {
        float: right;
    }
</style>