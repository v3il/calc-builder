<template>
    <div class="text-field">
        <h4 class="text-field__title" v-if="options.title">
            {{ options.title }}
        </h4>

        <input
            :type="options.type || 'text'"
            class="text-field__input text-input"
            @input="emitUpdate"
            :value="value"
            :placeholder="options.placeholder"
            :id="options.id"
            :style="options.style"
        />

        <p class="text-field__description" v-if="options.description">{{ options.description }}</p>
    </div>
</template>

<script>
export default {
    name: "TextFieldComponent",

    props: {
        value: {
            type: [String, Number],
            required: true
        },

        options: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            prevValue: this.value,
        }
    },

    methods: {
        emitUpdate({ target }) {
            let value = target.value;
            const { isValid } = this.options;

            if (isValid) {
                const validationResult = isValid(value, this.prevValue);

                if (validationResult === false) {
                    value = this.prevValue;
                }

                if (typeof validationResult === 'string') {
                    value = validationResult;
                }
            }

            this.$emit("input", value);

            this.prevValue = value;
            target.value = value;
        }
    },
};
</script>

<style scoped lang="scss">
@import "../../common-styles/text-input";

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
