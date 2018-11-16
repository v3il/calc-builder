<template>
    <div>
        {{selectOptions.length}}

        <div class="option-item" v-for="(option,index) in selectOptions" :key="'option' + index">
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

        props: {
            selectOptions: Array,
        },

        created() {
            console.log(123, this.selectOptions)
        },

        // extends: PropertyValueChangerBase,

        // computed: {
        //     opts() {
        //         return this.options.value;
        //         1;
        //     }
        // },

        methods: {
            removeOption(option) {
                EventBus.$emit('removeOption', option);
            },

            addOption() {
                EventBus.$emit('addOption');
            },
        },
        //
        // watch: {
        //     options: {
        //         deep: true,
        //
        //         handler(nv) {
        //             console.log(nv)
        //         }
        //     }
        // }
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