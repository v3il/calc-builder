<template>
    <div class="field-values">
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
    },
};
</script>

<style lang="scss">
.field-values {
    padding: 12px 24px;
    border-radius: 6px;
    display: flex;
    position: relative;

    $graph_line_top: 18px;
    $graph_line_left: -44px;
    $graph_line_width: 45px;
    $graph_line_thickness: 1px;

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
        cursor: pointer;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            height: calc(100% - #{$graph_line_top} + 1px);
            left: 50%;
            width: $graph_line_thickness;
            z-index: -1;
        }
    }

    &__remove-field.material-icons,
    &__remove-option.material-icons {
        font-size: 14px;
        font-weight: bold;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        color: white;
        border-radius: 50%;
        position: absolute;
        top: 8px;
        right: -33px;
        cursor: pointer;
        transition: opacity 0.3s;
        opacity: 0;

        &:hover {
            opacity: 0.8;
        }
    }

    &:hover &__remove-field.material-icons,
    &:hover &__remove-option.material-icons {
        opacity: 1;
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
            top: $graph_line_top;
            left: $graph_line_left;
            width: $graph_line_width;
            height: $graph_line_thickness;
        }
    }

    /* &__option:hover &__remove-option { */

    /*    opacity: 1; */

    /* } */

    &__option-label-input {
        flex: 1;
        position: relative;
    }

    &__label-input-wrapper {
        flex: 1;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: $graph_line_top;
            left: $graph_line_left;
            width: $graph_line_width;
            height: $graph_line_thickness;
        }
    }

    /* &__label-input-wrapper:hover &__remove-field { */

    /*    opacity: 1; */

    /* } */

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
}
</style>