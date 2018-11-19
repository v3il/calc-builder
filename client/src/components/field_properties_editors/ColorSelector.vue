<template>
    <div>
        <h4>{{options.title}}</h4>

        <el-color-picker
            @active-change="onValueChanged($event)"
            v-model="options.value"
            color-format="hex"
        ></el-color-picker>
    </div>
</template>

<script>
    // import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "ColorSelector",

        // extends: PropertyValueChangerBase,
    }
</script>