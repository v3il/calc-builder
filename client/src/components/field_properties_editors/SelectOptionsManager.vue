<template>
    <div>
        {{options.value}}

        <div class="option-item" v-for="option in opts" :key="'option' + Math.random()">
            <el-input type="text" v-model="option.text"></el-input>
            <i @click="removeOption(option)" class="material-icons">delete</i>
        </div>

        <el-button @click="addOption" type="primary" size="mini">Добавить поле</el-button>
    </div>
</template>

<script>
    import EventBus from '../../EventBus';

    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "SelectOptionsManager",

        extends: PropertyValueChangerBase,

        computed: {
            opts() {
                return this.options.value;
                1;
            }
        },

        methods: {
            removeOption(option) {
                EventBus.$emit('removeOption', option);
            },

            addOption() {
                EventBus.$emit('addOption');
            },
        }
    }
</script>

<style scoped lang="scss">
    .option-item {
        display: flex;
        align-items: center;

        i {
            margin-left: 6px;
        }
    }
</style>