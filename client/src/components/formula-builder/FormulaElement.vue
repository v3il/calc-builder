<template>
    <div
        @click="onElementClick"
        class="formula-element"
        :class="{
            'formula-element--operator': element.isOperator,
            'formula-element--variable': element.isVariable,
            'formula-element--not-existing-variable': element.isNotExistingVariable,
            'formula-element--variable-start': element.isStartOfVariable,
            'formula-element--variable-end': element.isEndOfVariable,
            'formula-element--incorrect': element.isIncorrect,
        }"
        v-html="fancySymbol"
        v-tooltip.bottom-start="
            element.isIncorrect || element.isNotExistingVariable
                ? uSign('translate', 'Некорректный элемент формулы')
                : ''
        "
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
    $border_radius: 3px;

    &-element {
        display: inline-block;
        text-align: center;
        margin: 3px 0;
        line-height: 26px;
        box-sizing: border-box;
        position: relative;

        &--operator {
            padding: 0 3px;
        }

        &--variable {
            background-color: $input_widget;
            color: $white;
        }

        &--variable-start {
            border-radius: $border_radius 0 0 $border_radius;
            padding-left: 3px;
        }

        &--variable-end {
            border-radius: 0 $border_radius $border_radius 0;
            padding-right: 3px;
        }

        &--not-existing-variable {
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 2px;
                background-color: $bg_primary_dark;
                right: 0;
                left: 0;
            }
        }

        &--incorrect {
            background-color: $error;
            color: white;
            border-radius: $border_radius;

            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 2px;
                background-color: $bg_primary_dark;
                right: 0;
                left: 0;
            }
        }
    }
}
</style>
