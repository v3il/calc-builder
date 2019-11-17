<template>
    <div class="text-field">
        <h4 class="text-field__title" v-if="options.title">
            {{ options.title }}
        </h4>

        <input-element
            :value="value"
            @input="$emit('input', $event)"
            :options="options"
            class="text-field__input"
        />

        <p class="text-field__description" v-if="options.description">{{ options.description }}</p>
    </div>
</template>

<script>
import InputElement from '@/components/ui_elements/InputElement';

export default {
    name: 'TextFieldComponent',

    components: {
        InputElement,
    },

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
};
</script>

<style scoped lang="scss">
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
