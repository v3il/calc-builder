<template>
    <div
        class="formula-element"
        :class="{
            'formula-element--operator': element.isOperator,
        }"
        v-on="$listeners"
    >
        {{ element.item }}
    </div>
</template>

<script>
export default {
    name: 'FormulaElement',

    props: {
        element: {
            type: Object,
        },
    },
};
</script>

<style scoped lang="scss">
.formula {
    &-element {
        display: inline-block;
        text-align: center;
        margin: 3px 0;
        line-height: 26px;
        box-sizing: border-box;

        &--operator {
            padding: 0 3px;
        }
    }
}
</style>
