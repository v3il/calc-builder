<template>
    <div class="text-field">
        <h4 class="text-field__title" v-if="options.title">
            {{ options.title }}
        </h4>

        <input
            :type="options.type || 'text'"
            class="text-field__input text-input"
            @input="emitUpdate"
            @blur="updateCurrentValue"
            :value="value"
            :placeholder="options.placeholder"
            :id="options.id"
            :style="options.style"
            ref="input"
        />

        <p class="text-field__description" v-if="options.description">{{ options.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'TextFieldComponent',

    props: {
        value: {
            type: [String, Number],
            required: true,
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            prevValue: this.value,
            currentValue: this.value,
        };
    },

    methods: {
        emitUpdate() {
            const input = this.$refs.input;

            let value = input.value;
            const { validator, minLength } = this.options;

            if (minLength && value.length < minLength) {
                value = this.prevValue;
            }

            if (validator) {
                const validationResult = validator(value, this.prevValue);

                if (validationResult === false) {
                    value = this.prevValue;
                }

                if (typeof validationResult !== 'boolean') {
                    value = validationResult;
                }
            }

            this.$emit('changed', value);

            // this.$emit('input', value);

            this.prevValue = value;
            this.currentValue = value;
            input.value = value;
        },

        updateCurrentValue() {
            this.$refs.input.value = this.currentValue;
        },
    },
};
</script>

<style scoped lang="scss">
@import '../../common-styles/text-input';

.text-field {
    &__input {
        margin: 6px 0;
    }

    &__description {
        color: #777;
        font-size: 0.8rem;
    }
}
</style>
