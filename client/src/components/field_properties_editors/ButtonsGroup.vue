<template>
    <div class="buttons-group">
        <h4 class="buttons-group__title" v-if="options.title">
            {{ options.title }}
        </h4>

        <div class="buttons-group__buttons-list">
            <button
                v-for="valueObject in variants"
                @click="$emit('input', valueObject.value)"
                class="button buttons-group__button"
                :class="{
                    'button--active': valueObject.value === value
                }"
            >{{ valueObject.label }}</button>
        </div>


<!--        <el-button-group class="property-editor-field_field-element">-->
<!--            <el-button-->
<!--                size="small"-->
<!--                v-for="valueObject in variants"-->
<!--                :type="value === valueObject.value ? 'primary' : 'info'"-->
<!--                @click="onValueChanged(valueObject.value)"-->
<!--            >-->
<!--                {{valueObject.label}}-->
<!--            </el-button>-->
<!--        </el-button-group>-->
    </div>
</template>

<script>
    export default {
        name: 'ButtonsGroup',

        props: {
            value: {
                type: [String, Number],
                required: true,
            },

            variants: {
                type: Array,
                required: true,
            },

            options: {
                type: Object,
                default: () => ({}),
            }
        },
    };
</script>

<style scoped lang="scss">
    @import '../../common-styles/button';

    .buttons-group {
        &__title {
            margin-bottom: 6px;
        }

        &__button {
            border-radius: 0;
            font-size: 0.8rem;

            &:first-child {
                border-radius: 0.5rem 0 0 0.5rem;
            }

            &:last-child {
                border-radius: 0 0.5rem 0.5rem 0;
            }

            &:not(:last-child) {
                border-right: 0;
            }
        }
    }
</style>
