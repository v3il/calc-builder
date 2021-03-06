<template>
    <transition name="fade3" @after-leave="close">
        <div
            class="vdialog"
            :class="{ 'vdialog--pinned': isPinned }"
            :style="{ zIndex }"
            v-show="visible"
        >
            <div class="vdialog__inner-wrap" @click.self="triggerClose">
                <div class="vdialog__inner" :style="{ maxWidth: `${maxWidth}px` }">
                    <div class="vdialog__header">
                        <div class="vdialog__title">
                            <slot name="header">
                                {{ uSign('translate', 'Подтвердите действие') }}
                            </slot>
                        </div>

                        <i class="material-icons vdialog__close-btn" @click="triggerClose">clear</i>
                    </div>

                    <div class="vdialog__tabs">
                        <slot name="tabs"></slot>
                    </div>

                    <div class="vdialog__content">
                        <slot></slot>
                    </div>

                    <div class="vdialog__footer">
                        <slot name="footer" :closePopup="triggerClose"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'VDialog',

    data() {
        return {
            visible: false,
        };
    },

    props: {
        maxWidth: { type: Number, default: 1000 },
        zIndex: { type: Number, default: 9999 },
        isPinned: { type: Boolean, default: false },
    },

    methods: {
        open() {
            this.visible = true;
            document.addEventListener('keyup', this.keyUpHandler);
        },

        keyUpHandler(event) {
            if (event.which === /* esc */ 27) {
                this.triggerClose();
            }
        },

        close() {
            this.$emit('close');
            document.removeEventListener('keyup', this.keyUpHandler);
        },

        triggerClose() {
            this.visible = false;
        },
    },

    mounted() {
        document.body.appendChild(this.$el);
    },

    beforeDestroy() {
        this.$el.remove();
        document.removeEventListener('keyup', this.keyUpHandler);
    },
};
</script>

<style scoped lang="scss">
.vdialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.55);
    overflow-y: scroll;
    overflow-x: hidden;

    &__inner-wrap {
        padding: 12px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100% - 12px * 2);
        cursor: pointer;
    }

    &--pinned &__inner-wrap {
        align-items: flex-start;
    }

    &__inner {
        background-color: #fafafa;
        box-sizing: border-box;
        width: calc(100% - 12px);
        height: auto;
        padding: 18px;
        border-radius: 6px;
        cursor: default;
        position: relative;
    }

    &__title {
        max-width: calc(100% - 24px);
        width: 100%;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
    }

    &__header {
        display: flex;
        align-items: center;
        margin-bottom: 12px !important;
        padding: 0 !important;
        position: relative;
        line-height: 24px;
    }

    &__close-btn {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;

        &--disabled {
            opacity: 0.5;
        }
    }

    &__content {
        margin: 12px 0;
    }

    &__footer {
        margin-top: 6px;
    }
}
</style>
