<template>
    <label class="checkbox-element">
        <input
            class="checkbox-element__input"
            type="checkbox"
            :name="options.id"
            :checked="value"
            @change="$emit('change', $event.target.checked)"
        />

        <span class="checkbox-element__check"></span>
        <span class="checkbox-element__label">{{ options.label }}</span>
    </label>
</template>

<script>
export default {
    name: 'CheckboxElement',

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
.checkbox-element {
    $checkbox_size: 1.33rem;

    display: flex;
    cursor: pointer;

    &__input {
        display: none;
    }

    &__check {
        display: inline-block;
        width: $checkbox_size;
        height: $checkbox_size;
        border: 2px solid $bg_primary_dark;
        border-radius: 0.1rem;
        margin-right: 0.6rem;
        position: relative;

        &::before {
            content: '';
            display: block;
            width: $checkbox_size / 2;
            height: $checkbox_size / 2;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 0.1rem;
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
