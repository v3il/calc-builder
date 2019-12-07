<template>
    <div
        class="formula-element"
        :class="{
            'formula-element--operator': element.isOperator,
            'formula-element--var-start': element.isStartOfVariable,
            'formula-element--var-end': element.isEndOfVariable,
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
    $border_radius: 5px;

    &-element {
        display: inline-block;
        text-align: center;
        margin: 3px 0;
        line-height: 26px;
        box-sizing: border-box;

        &--operator {
            padding: 0 3px;
        }

        &--var-start,
        &--var-end {
            background-color: $input_widget;
            color: $white;
        }

        &--var-start {
            border-radius: $border_radius 0 0 $border_radius;
            padding-left: 3px;
        }

        &--var-end {
            border-radius: 0 $border_radius $border_radius 0;
            padding-right: 3px;
        }
    }
}
</style>
