<template>
    <div class="formula-renderer" :data-result="result.letter">
        <div class="formula-renderer__result-header">
            <span class="formula-renderer__result-letter">{{ result.letter }}</span>
            <formula-element :element="{ item: '=', isOperator: true }" />
        </div>

        <div class="formula-renderer__result-formula">
            <template v-for="element in formulaOM">
                <formula-gap
                    v-if="element.isGap"
                    :element="element"
                    :key="element.id"
                    @click="activeGapIndex = element.index"
                />

                <formula-element
                    v-else
                    :element="element"
                    :key="element.id"
                    @left-side-click="activeGapIndex = element.index"
                    @right-side-click="activeGapIndex = element.index + 1"
                />
            </template>
        </div>
    </div>
</template>

<script>
import FormulaGap from './FormulaGap';
import FormulaElement from './FormulaElement';

const SEPARATOR = '';

export default {
    name: 'FormulaRenderer',

    props: {
        result: {
            type: Object,
            required: true,
        },
    },

    components: {
        FormulaGap,
        FormulaElement,
    },

    data() {
        return {
            activeGapIndex: -1,
            formula: this.result.params.formula,
        };
    },

    computed: {
        elements() {
            return this.formula.split(SEPARATOR);
        },

        formulaOM() {
            const formulaOM = [];
            const formulaElements = this.formula.split(SEPARATOR);

            formulaElements.forEach((item, index) => {
                const isOperator = this.isOperator(item);
                const isStartOfVariable = this.isLetter(item);
                const isEndOfVariable =
                    this.isLetter(formulaElements[index - 1]) && this.isDigit(item);

                formulaOM.push({
                    index,
                    isGap: true,
                    id: `gap${index}`,
                    isActive: index === this.activeGapIndex,
                    isGapInVariable: isEndOfVariable,
                });

                formulaOM.push({
                    item,
                    index,
                    isStartOfVariable,
                    isEndOfVariable,
                    isOperator,
                    id: `element${index}`,
                });
            });

            formulaOM.push({
                isGap: true,
                index: formulaElements.length,
                isActive: formulaElements.length === this.activeGapIndex,
                id: `gap${formulaElements.length}`,
            });

            return formulaOM;
        },

        prevSymbol() {
            return this.elements[this.activeGapIndex - 1];
        },

        nextSymbol() {
            return this.elements[this.activeGapIndex];
        },
    },

    created() {
        const clickHandler = event => {
            const { target } = event;
            const isOutsideClick = !target.closest(`[data-result=${this.result.letter}]`);

            if (isOutsideClick) {
                this.activeGapIndex = -1;
            }
        };

        const keyHandler = event => {
            if (this.activeGapIndex < 0) {
                return;
            }

            const [ARROW_LEFT, ARROW_RIGHT, BACKSPACE, DELETE] = [37, 39, 8, 46];
            const { which, key } = event;

            switch (which) {
                case ARROW_LEFT:
                    this.moveCursorToLeft();
                    break;
                case ARROW_RIGHT:
                    this.moveCursorToRight();
                    break;
                case BACKSPACE:
                    this.removeSymbolAtLeft();
                    break;
                case DELETE:
                    this.removeSymbolAtRight();
                    break;
            }

            if (this.isDigit(key)) {
                this.insertDigit(key);
            } else if (this.isOperator(key)) {
                this.insertOperator(key);
            } else if (this.isLetter(key)) {
                this.insertLetter(key);
            } else if (this.isOpenBracket(key) || this.isCloseBracket(key)) {
                this.insertSymbols(key);
            }

            this.$emit('change', this.elements.join(SEPARATOR));
        };

        document.addEventListener('keydown', keyHandler);
        document.addEventListener('click', clickHandler);

        this.$on('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('click', clickHandler);
        });
    },

    methods: {
        isOperator(element) {
            return ['+', '-', '*', '/'].includes(element);
        },

        isOpenBracket(element) {
            return element === '(';
        },

        isCloseBracket(element) {
            return element === ')';
        },

        isLetter(element) {
            return /^[A-Z]$/.test(element);
        },

        isDigit(element) {
            return /^[0-9]$/.test(element);
        },

        insertSymbols(symbols) {
            const newFormula = [...this.elements];

            newFormula.splice(this.activeGapIndex, 0, symbols);

            this.formula = newFormula.join(SEPARATOR);
            this.activeGapIndex++;
        },

        insertOperator(operator) {
            const { prevSymbol, nextSymbol } = this;

            console.log(prevSymbol, nextSymbol);

            const isInvalidPlace =
                this.isOperator(prevSymbol) ||
                this.isOperator(nextSymbol) ||
                this.isOpenBracket(prevSymbol);

            if (!isInvalidPlace) {
                this.insertSymbols(operator);
            }
        },

        insertDigit(element) {
            const { prevSymbol, nextSymbol } = this;

            if (this.isOpenBracket(nextSymbol) && this.isCloseBracket(prevSymbol)) {
                // (...)2(...) -> (...) * 2 * (...)
                this.insertSymbols(`*${element}*`);
            } else if (this.isOpenBracket(nextSymbol) || this.isLetter(nextSymbol)) {
                // 2(...) -> 2 * (...)
                this.insertSymbols(`${element}*`);
            } else if (this.isCloseBracket(prevSymbol)) {
                // (...)2 -> (...) * 2
                this.insertSymbols(`*${element}`);
            } else {
                this.insertSymbols(element);
            }
        },

        insertLetter(element) {
            const { prevSymbol, nextSymbol } = this;

            if (
                (this.isOpenBracket(nextSymbol) && this.isCloseBracket(prevSymbol)) ||
                (this.isDigit(nextSymbol) && this.isDigit(prevSymbol))
            ) {
                // (...)C(...) -> (...) * C * (...)
                this.insertSymbols(`*${element}*`);
            } else if (this.isOpenBracket(nextSymbol) || this.isDigit(nextSymbol)) {
                // C(...) -> C * (...)
                this.insertSymbols(`${element}*`);
            } else if (this.isCloseBracket(prevSymbol) || this.isDigit(prevSymbol)) {
                // (...)C -> (...) * C
                this.insertSymbols(`*${element}`);
            } else {
                this.insertSymbols(element);
            }
        },

        removeSymbolAtLeft() {
            if (this.activeGapIndex > 0) {
                const newFormula = [...this.elements];
                newFormula.splice(this.activeGapIndex - 1, 1);

                this.formula = newFormula.join(SEPARATOR);
                this.activeGapIndex--;
            }
        },

        removeSymbolAtRight() {
            if (this.activeGapIndex === this.elements.length) {
                return;
            }

            const newFormula = [...this.elements];
            newFormula.splice(this.activeGapIndex, 1);

            this.formula = newFormula.join(SEPARATOR);
        },

        moveCursorToLeft() {
            if (this.activeGapIndex > 0) {
                this.activeGapIndex--;
            }
        },

        moveCursorToRight() {
            if (this.activeGapIndex < this.elements.length) {
                this.activeGapIndex++;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.formula-renderer {
    margin: 12px 0;

    &__result-header {
        width: 100%;
        padding: 6px;
        background: #263238;
        color: white;
        border-radius: 6px 6px 0 0;
    }

    &__result-letter {
        background-color: $result_widget;
        color: white;
        padding: 3px;
        border-radius: 5px;
        margin-right: 6px;
    }

    &__result-formula {
        display: flex;
        align-items: stretch;
        padding: 6px;
        border: 1px solid #263238;
        border-radius: 0 0 6px 6px;
    }
}
</style>
