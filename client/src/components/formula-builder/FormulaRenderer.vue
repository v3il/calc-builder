<template>
    <div class="formula-renderer" :class="{ 'formula-renderer--active': activeGapIndex >= 0 }">
        {{ result.params.formula }}

        {{ activeGapIndex }}

        <div
            class="formula-renderer__result-header"
            @click.self="activeGapIndex = getLastGapIndex()"
        >
            <span class="formula-renderer__result-letter">{{ result.letter }}</span>
            <formula-element :element="{ item: '=', isOperator: true }" />

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

        <div class="formula-renderer__result-formula" v-if="activeGapIndex >= 0">
            <button @click="activeGapIndex = -1" class="button button--primary">
                {{ uSign('translate', 'Сохранить') }}
            </button>
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
                const isDigit = this.isDigit(item);
                const isLetter = this.isLetter(item);
                const isStartOfVariable = this.isLetter(item);
                const isEndOfVariable = this.isLetter(formulaElements[index - 1]) && isDigit;

                formulaOM.push({
                    index,
                    isGap: true,
                    id: `gap${Math.random()}`,
                    isActive: index === this.activeGapIndex,
                    isGapInVariable: isEndOfVariable,
                });

                formulaOM.push({
                    item,
                    index,
                    isStartOfVariable,
                    isEndOfVariable,
                    isOperator,
                    isDigit,
                    isLetter,
                    id: `element${Math.random()}`,
                });
            });

            formulaOM.push({
                isGap: true,
                index: formulaElements.length,
                isActive: formulaElements.length === this.activeGapIndex,
                id: `gap${Math.random()}`,
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
        document.addEventListener('keydown', this.keyHandler);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.keyHandler);
    },

    methods: {
        keyHandler(event) {
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
        },

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

            newFormula.splice(this.activeGapIndex, 0, ...symbols.split(''));

            console.log(newFormula, newFormula.join(SEPARATOR));

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

            let symbolsToAdd = element;

            // (...)C -> (...) * C
            if (this.isCloseBracket(prevSymbol) || this.isDigit(prevSymbol)) {
                symbolsToAdd = `*${symbolsToAdd}`;
            }

            // C(...) -> C * (...)
            if (this.isOpenBracket(nextSymbol) || this.isDigit(nextSymbol)) {
                symbolsToAdd = `${symbolsToAdd}*`;
            }

            this.insertSymbols(symbolsToAdd);
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

        getLastGapIndex() {
            const lastGap = this.formulaOM[this.formulaOM.length - 1];
            return lastGap ? lastGap.index : 0;
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
        border-radius: 6px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &--active &__result-header {
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
