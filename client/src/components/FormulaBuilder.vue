<template>
    <div class="formula-builder">
        <input-element v-model="resultField.params.formula" />
    </div>
</template>

<script>
import InputElement from './ui_elements/InputElement';

export default {
    name: 'FormulaBuilder',

    components: {
        InputElement,
    },

    props: {
        resultField: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
.formula-builder {
    color: red;
}
</style>
