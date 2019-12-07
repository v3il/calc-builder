<template>
    <div class="formula-renderer">
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
                @click="activeGapIndex = element.index + 1"
            />
        </template>
    </div>
</template>

<script>
import FormulaGap from './FormulaGap';
import FormulaElement from './FormulaElement';

const SEPARATOR = '';

export default {
    name: 'FormulaRenderer',

    props: {
        formula: {
            type: String,
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
            form: this.formula,
        };
    },

    computed: {
        elements() {
            return this.form.split(SEPARATOR);
        },

        formulaOM() {
            const gapModel = {
                isGap: true,
            };

            const formulaOM = [];
            const formulaElements = this.form.split(SEPARATOR);

            formulaElements.forEach((item, index) => {
                formulaOM.push({
                    ...gapModel,
                    index,
                    isActive: index === this.activeGapIndex,
                    id: `gap${index}`,
                });

                const isOperator = this.isOperator(item);

                formulaOM.push({ item, index, isOperator, id: `element${index}` });
            });

            formulaOM.push({
                ...gapModel,
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
        const keyUpHandler = event => {
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

        document.addEventListener('keydown', keyUpHandler);

        this.$on('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', keyUpHandler);
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

            this.form = newFormula.join(SEPARATOR);
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
            } else if (this.isOpenBracket(nextSymbol)) {
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

                this.form = newFormula.join(SEPARATOR);
                this.activeGapIndex--;
            }
        },

        removeSymbolAtRight() {
            if (this.activeGapIndex === this.elements.length) {
                return;
            }

            const newFormula = [...this.elements];
            newFormula.splice(this.activeGapIndex, 1);

            this.form = newFormula.join(SEPARATOR);
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
    display: flex;
}
</style>
