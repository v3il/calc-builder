<template>
    <div class="formula-renderer" :class="{ 'formula-renderer--active': activeGapIndex >= 0 }">
        <div
            class="formula-renderer__result-header"
            @click.self="activeGapIndex = getLastGapIndex()"
        >
            <span class="formula-renderer__result-letter">{{ result.letter }}</span>
            <formula-element :element="{ item: '=', isOperator: true }" />

            <template v-for="element in formulaOM">
                <formula-gap
                    :key="`gap${Math.random()}`"
                    :element="{
                        isActive: activeGapIndex === element.index,
                        isGapInVariable: element.isVariable && !element.isStartOfVariable,
                        isGapInNotExistingVariable:
                            element.isVariable && element.isNotExistingVariable,
                    }"
                    @click="activeGapIndex = element.index"
                />

                <formula-element
                    :element="element"
                    :key="element.id"
                    @left-side-click="activeGapIndex = element.index"
                    @right-side-click="activeGapIndex = element.index + 1"
                />
            </template>

            <formula-gap
                :key="`gap${Math.random()}`"
                :element="{
                    isActive: activeGapIndex === formulaOM.length,
                    isGapInVariable: false,
                }"
                @click="activeGapIndex = formulaOM.length"
            />
        </div>

        <div class="formula-renderer__result-formula" v-if="activeGapIndex >= 0">
            <div class="formula-renderer__result-operators">
                <span class="formula-renderer__result-operator" @click="insertSymbols('+')">+</span>
                <span class="formula-renderer__result-operator" @click="insertSymbols('-')">-</span>
                <span class="formula-renderer__result-operator" @click="insertSymbols('*')"
                    >&times;</span
                >
                <span class="formula-renderer__result-operator" @click="insertSymbols('/')"
                    >&divide;</span
                >
                <span class="formula-renderer__result-operator" @click="insertSymbols('(')">(</span>
                <span class="formula-renderer__result-operator" @click="insertSymbols(')')">)</span>
            </div>

            <div class="formula-renderer__result-warning" v-if="!isValidFormula">
                <i class="material-icons formula-renderer__result-warning-icon">error_outline</i>

                <span class="formula-renderer__result-warning-text">
                    {{
                        uSign(
                            'translate',
                            'Формула содержит ошибки. Результат вычисления такой формулы будет равняться 0.',
                        )
                    }}
                </span>
            </div>
        </div>

        {{ result.params.formula }}

        {{ activeGapIndex }}

        <br />

        {{ isValidFormula }}
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

        fieldsList: {
            type: Array,
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
        existingFieldsLetters() {
            return this.fieldsList.map(({ letter }) => letter);
        },

        variablesRegions() {
            return [...this.formula.matchAll(/[A-Z]\d+/g)].map(match => {
                const varCode = match[0];
                const start = match.index;

                return {
                    varCode,
                    start,
                    end: start + varCode.length - 1,
                };
            });
        },

        formulaOM() {
            return this.toFormulaOM(this.formula);
        },

        prevSymbol() {
            return this.formulaOM[this.activeGapIndex - 1] || {};
        },

        nextSymbol() {
            return this.formulaOM[this.activeGapIndex] || {};
        },

        isValidFormula() {
            const replacedFormula = this.formula.replace(/[A-Z]\d+/g, fieldLetter => {
                const field = this.getFieldByLetter(fieldLetter);
                return field ? field.params.value : 0;
            });

            console.log(5555, replacedFormula);

            try {
                eval(replacedFormula);
                return true;
            } catch (error) {
                return false;
            }
        },
    },

    created() {
        document.addEventListener('keydown', this.keyHandler);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.keyHandler);
    },

    methods: {
        getFieldByLetter(fieldLetter) {
            return this.fieldsList.find(({ letter }) => fieldLetter === letter);
        },

        toFormulaOM(formulaStr) {
            const formulaOM = [];
            const formulaElements = formulaStr.split(SEPARATOR);

            const variablesRegions = this.variablesRegions;

            formulaElements.forEach((item, index) => {
                const isOperator = this.isOperator(item);
                const isDigit = this.isDigit(item);
                const isLetter = this.isLetter(item);
                const isOpenBracket = this.isOpenBracket(item);
                const isCloseBracket = this.isCloseBracket(item);

                const regionOfVariable = variablesRegions.find(
                    ({ start, end }) => start <= index && end >= index,
                );

                const isVariable = !!regionOfVariable;
                const isStartOfVariable = regionOfVariable?.start === index;
                const isEndOfVariable = regionOfVariable?.end === index;
                const isNotExistingVariable =
                    isVariable && !this.existingFieldsLetters.includes(regionOfVariable.varCode);

                const isIncorrect = false;

                formulaOM.push({
                    item,
                    index,
                    isVariable,
                    isNotExistingVariable,
                    isStartOfVariable,
                    isEndOfVariable,
                    isOperator,
                    isOpenBracket,
                    isCloseBracket,
                    isDigit,
                    isLetter,
                    isIncorrect,
                    id: `element${Math.random()}`,
                });
            });

            // formulaOM.forEach((item, index) => {
            //     const prevElement = formulaOM[index - 1];
            //     // const nextElement = formulaOM[index + 1];
            //
            //     if (item.isOperator && prevElement?.isOperator) {
            //         item.isIncorrect = true;
            //     }
            // });

            return formulaOM;
        },

        saveFormula() {
            console.error('Before clean', this.formulaOM.map(({ item }) => item).join(SEPARATOR));

            this.formula = this.formulaOM.map(({ item }) => item).join(SEPARATOR);

            this.activeGapIndex = -1;

            this.$emit('change', this.formula);
        },

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

            this.$emit('change', this.formula);
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
            let newFormula = this.formulaOM.map(({ item }) => item);

            newFormula.splice(this.activeGapIndex, 0, ...symbols.split(''));

            console.log(newFormula, newFormula.join(SEPARATOR));

            this.formula = newFormula.join(SEPARATOR);
            this.activeGapIndex += symbols.length;
        },

        insertOperator(operator) {
            const { prevSymbol, nextSymbol } = this;

            console.log(prevSymbol, nextSymbol);

            const isInvalidPlace =
                prevSymbol.isOperator || nextSymbol.isOperator || prevSymbol.isOpenBracket;

            if (!isInvalidPlace) {
                this.insertSymbols(operator);
            }
        },

        insertDigit(element) {
            const prevSymbol = this.prevSymbol;
            const nextSymbol = this.nextSymbol;

            let symbolsToAdd = element;

            // (...)2 -> (...) * 2
            if (prevSymbol.isCloseBracket) {
                symbolsToAdd = `*${symbolsToAdd}`;
            }

            // 2(...) -> 2 * (...)
            if (nextSymbol.isOpenBracket || nextSymbol.isLetter) {
                symbolsToAdd = `${symbolsToAdd}*`;
            }

            this.insertSymbols(symbolsToAdd);
        },

        insertLetter(element) {
            const prevSymbol = this.prevSymbol;
            const nextSymbol = this.nextSymbol;

            let symbolsToAdd = element;

            // (...)C -> (...) * C
            if (prevSymbol.isCloseBracket || prevSymbol.isDigit || prevSymbol.isLetter) {
                symbolsToAdd = `*${symbolsToAdd}`;
            }

            // C(...) -> C * (...)
            if (nextSymbol.isOpenBracket || nextSymbol.isLetter) {
                symbolsToAdd = `${symbolsToAdd}*`;
            }

            this.insertSymbols(symbolsToAdd);
        },

        removeSymbolAtLeft() {
            if (this.activeGapIndex === 0) {
                return;
            }

            this.formula = this.formulaOM
                .map(({ item }) => item)
                .filter((item, index) => index !== this.activeGapIndex - 1)
                .join(SEPARATOR);

            this.activeGapIndex--;
        },

        removeSymbolAtRight() {
            if (this.activeGapIndex === this.formulaOM.length) {
                return;
            }

            this.formula = this.formulaOM
                .map(({ item }) => item)
                .filter((item, index) => index !== this.activeGapIndex)
                .join(SEPARATOR);
        },

        moveCursorToLeft() {
            if (this.activeGapIndex > 0) {
                this.activeGapIndex--;
            }
        },

        moveCursorToRight() {
            if (this.activeGapIndex < this.formulaOM.length) {
                this.activeGapIndex++;
            }
        },

        getLastGapIndex() {
            const lastSymbolModel = this.formulaOM[this.formulaOM.length - 1];
            return lastSymbolModel ? lastSymbolModel.index + 1 : 0;
        },
    },

    watch: {
        'result.params.formula'(value) {
            this.formula = value;
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
        position: relative;
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
        padding: 6px;
        border: 1px solid #263238;
        border-radius: 0 0 6px 6px;
    }

    &__result-warning {
        display: flex;
        margin-top: 12px;
    }

    &__result-warning-icon {
        color: $error;
        margin-right: 9px;
    }

    &__result-operators {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &__result-operator {
        width: 24px;
        height: 25px;
        padding: 6px;
        background-color: $bg_primary_dark;
        color: $white;
        margin: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        font-weight: bold;
    }
}
</style>
