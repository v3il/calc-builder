<template>
    <div class="formulas-builder">
        <div
            class="formulas-builder__formula-editor"
            v-for="(result, index) in results"
            :key="index"
        >
            <formula-renderer @change="onFormulaChange(result, $event)" :result="result" />
        </div>
    </div>
</template>

<script>
import FormulaRenderer from './FormulaRenderer';

export default {
    name: 'FormulaBuilder',

    components: {
        FormulaRenderer,
    },

    props: {
        results: {
            type: Array,
            required: true,
        },
    },

    methods: {
        onFormulaChange(result, formula) {
            result.params.formula = formula;
            // console.log(result, formula);
        },
    },
};
</script>

<style scoped lang="scss">
.formula-builder {
    color: red;
}
</style>
