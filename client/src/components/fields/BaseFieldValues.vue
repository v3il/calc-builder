<template>
    <div class="field-values" :class="`field-values--${fieldClass}`">
        <div class="field-values__letter-column">
            <span class="field-values__field-letter">{{ field.letter }}</span>
        </div>

        <div class="field-values__properties-column">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseFieldValues',

    props: {
        field: {
            type: Object,
            required: true,
        },

        fieldClass: {
            type: String,
        },
    },
};
</script>

<style lang="scss">
.field-values {
    padding: 12px 24px;
    border-radius: 6px;
    display: flex;

    &__letter-column {
        flex: auto 0;
        margin-right: 24px;
        position: relative;
        z-index: 2;
    }

    &__properties-column {
        flex: 1;
    }

    &__field-letter {
        padding: 9px 12px;
        display: inline-block;
        border-radius: 6px;
        color: $white;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            height: calc(100% - 17px);
            left: 50%;
            width: 1px;
            background-color: blue;
            z-index: -1;
        }
    }

    &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__option {
        margin: 12px 0;
        position: relative;

        &:last-child {
            margin-bottom: 0;
        }

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -45px;
            width: 45px;
            height: 1px;
            background-color: $radio_widget;
        }
    }

    &__option-label-input {
        flex: 1;
    }

    &__label-input-wrapper {
        flex: 1;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -45px;
            width: 45px;
            height: 1px;
            background-color: $checkbox_widget;
        }
    }

    &__value-block {
        display: flex;
        align-items: center;
        flex-basis: 200px;
    }

    &__value-label {
        display: block;
        flex: 0 auto;
        margin: 0 12px;
    }

    &--select {
        background-color: $select_widget_light;
    }

    &--select &__field-letter,
    &--select &__field-letter::after,
    &--select &__label-input-wrapper::before,
    &--select &__option::before {
        background-color: $select_widget;
    }

    &--checkbox {
        background-color: $checkbox_widget_light;
    }

    &--checkbox &__field-letter,
    &--checkbox &__field-letter::after,
    &--checkbox &__label-input-wrapper::before,
    &--checkbox &__option::before {
        background-color: $checkbox_widget;
    }

    &--radio {
        background-color: $radio_widget_light;
    }

    &--radio &__field-letter,
    &--radio &__field-letter::after,
    &--radio &__label-input-wrapper::before,
    &--radio &__option::before {
        background-color: $radio_widget;
    }
}
</style>
