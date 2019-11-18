<template>
    <label class="radiobutton-element">
        <input
            class="radiobutton-element__input"
            type="radio"
            :name="options.id"
            :checked="value"
            @change="$emit('change')"
        />

        <span class="radiobutton-element__check"></span>
        <span class="radiobutton-element__label">{{ options.label }}</span>
    </label>
</template>

<script>
export default {
    name: 'RadiobuttonElement',

    model: {
        prop: 'value',
        event: 'change',
    },

    props: {
        value: {
            type: [Boolean],
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
.radiobutton-element {
    $radio_size: 1.33rem;

    display: flex;
    cursor: pointer;

    &__input {
        display: none;
    }

    &__check {
        display: inline-block;
        width: $radio_size;
        height: $radio_size;
        border: 2px solid $bg_primary_dark;
        border-radius: 50%;
        margin-right: 0.6rem;
        position: relative;

        &::before {
            content: '';
            display: block;
            width: $radio_size / 2;
            height: $radio_size / 2;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: $bg_primary_dark;
            opacity: 0;
            transition: opacity 0.3s;
        }
    }

    &__input:checked + &__check::before {
        opacity: 1;
    }
}
</style>
