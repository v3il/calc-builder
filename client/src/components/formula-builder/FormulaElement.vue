<template>
    <div
        @click="onElementClick"
        class="formula-element"
        :class="{
            'formula-element--operator': element.isOperator,
            'formula-element--var-start': element.isStartOfVariable,
            'formula-element--var-end': element.isEndOfVariable,
        }"
        v-html="fancySymbol"
    ></div>
</template>

<script>
export default {
    name: 'FormulaElement',

    props: {
        element: {
            type: Object,
        },
    },

    data() {
        return {
            fancySymbol: '',
        };
    },

    created() {
        switch (this.element.item) {
            case '*':
                this.fancySymbol = '&times;';
                break;
            case '/':
                this.fancySymbol = '&divide;';
                break;
            default:
                this.fancySymbol = this.element.item;
        }
    },

    methods: {
        onElementClick(event) {
            const { offsetX } = event;
            const elementWidth = this.$el.clientWidth;

            if (offsetX <= elementWidth / 2) {
                this.$emit('left-side-click');
            } else {
                this.$emit('right-side-click');
            }
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
