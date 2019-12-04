<template>
    <div class="formula-renderer">
        <span class="formula-renderer__element formula-renderer__element--operator">=</span>
        <template v-for="(element, index) in elements">
            <div
                class="formula-renderer__gap"
                :class="{ 'formula-renderer__gap--active': activeGapIndex === index }"
                @click="activeGapIndex = index"
                :key="`gap${index}`"
            >
                <span class="formula-renderer__cursor"></span>
            </div>

            <div
                :key="index"
                class="formula-renderer__element"
                :class="{
                    'formula-renderer__element--operator': isOperator(element),
                }"
                @click="activeGapIndex = index"
            >
                {{ element }}
            </div>
        </template>

        <div
            class="formula-renderer__gap"
            :class="{ 'formula-renderer__gap--active': activeGapIndex === elements.length }"
            @click="activeGapIndex = elements.length"
        >
            <span class="formula-renderer__cursor"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormulaRenderer',

    props: {
        formula: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            activeGapIndex: -1,
            form: this.formula,
        };
    },

    computed: {
        elements() {
            return this.form.split('').filter(item => item !== ' ');
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

            if (/(\d|\+|-|\*|\/|\(|\))/.test(key)) {
                this.insertSymbols(key);
            }

            console.log(this.elements.join(''));

            this.$emit('change', this.elements.join(''));
        };

        document.addEventListener('keydown', keyUpHandler);

        this.$on('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', keyUpHandler);
        });
    },

    methods: {
        isOperator(element) {
            return ['+', '-', '*', '/', '='].includes(element);
        },

        insertSymbols(symbols) {
            const newFormula = [...this.elements];

            newFormula.splice(this.activeGapIndex, 0, symbols);

            this.form = newFormula.join('');
            this.activeGapIndex++;
        },

        removeSymbolAtLeft() {
            if (this.activeGapIndex > 0) {
                const newFormula = [...this.elements];
                newFormula.splice(this.activeGapIndex - 1, 1);

                this.form = newFormula.join('');
                this.activeGapIndex--;
            }
        },

        removeSymbolAtRight() {
            if (this.activeGapIndex === this.elements.length) {
                return;
            }

            const newFormula = [...this.elements];
            newFormula.splice(this.activeGapIndex, 1);

            this.form = newFormula.join('');
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

    &__element {
        display: inline-block;
        text-align: center;
        margin: 3px 0;

        /* padding: 0 3px; */

        /* width: 26px; */
        line-height: 26px;
        box-sizing: border-box;

        /* border: 1px solid #ccc; */

        &--operator {
            padding: 0 3px;
        }
    }

    &__gap {
        /* width: 10px; */
        box-sizing: border-box;
        display: inline-block;
        cursor: text;
        margin: 3px 0;
        padding: 1px;

        /* border: 1px solid #ccc; */
    }

    &__cursor {
        display: block;
        height: 100%;
        width: 1px;
        animation: blink 1s infinite;
        margin: 0 auto;
        cursor: pointer;
        background-color: transparent;
    }

    &__gap--active &__cursor {
        background-color: #263238;
    }

    @keyframes blink {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}
</style>
