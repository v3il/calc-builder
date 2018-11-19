<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{title}}</h4>

        <div class="options-list">
            <div class="option-item" v-for="(option,index) in selectOptions" :key="'option' + index">
                <el-input type="text" v-model="option.text"></el-input>
                <i @click="removeOption(option)" class="material-icons">delete</i>
            </div>
        </div>

        <el-button @click="addOption" type="primary" size="mini">Добавить поле</el-button>
    </div>
</template>

<script>
    import EventBus from '../../EventBus';

    export default {
        name: "SelectOptionsManager",

        props: {
            selectOptions: Array,
            title: String,
        },

        methods: {
            removeOption(option) {
                EventBus.$emit('removeOption', option);
            },

            addOption() {
                EventBus.$emit('addOption');
            },
        },
    }
</script>

<style scoped lang="scss">
    .options-list {
        margin-top: 12px;
    }

    .option-item {
        display: flex;
        align-items: center;
        margin: 6px 0;

        i {
            margin-left: 6px;
            cursor: pointer;
            color: #253237;
        }
    }
</style>