<template>
    <div class="form-editor">
        <div class="form-editor__header">
            <div class="form-editor__header-title">
                <router-link class="form-editor__move-back" :to="{ name: 'home' }">
                    <i class="material-icons form-editor__move-back-icon">arrow_back</i>
                </router-link>

                {{ uSign("translate", 'Редактирование формы "%s"', [currentForm.name]) }}
            </div>

            <ul class="form-editor__header-nav">
                <li
                    v-for="(navItem, index) in navItems"
                    :key="index"
                    class="form-editor__header-nav-item"
                    :class="{
                        'form-editor__header-nav-item--active': $route.name === navItem.routeName
                    }"
                >
                    <router-link
                        class="form-editor__header-nav-link"
                        :to="{ name: navItem.routeName }"
                    >
                        {{ navItem.label }}
                    </router-link>
                </li>
            </ul>

            <button
                class="button button--danger form-editor__discard-btn"
                @click="discardFormData"
                v-if="hasChanges"
            >
                {{ uSign("translate", "Сбросить изменения") }}
            </button>

            <button class="button button--success form-editor__submit-btn" @click="saveFormData">
                {{ uSign("translate", "Сохранить") }}
            </button>
        </div>

        <div class="form-editor__content">
            <component :is="currentComponent" :form="currentForm"></component>
        </div>

        <v-dialog ref="confirmNav" :max-width="600" class="form-editor__confirm-dialog">
            {{ uSign("translate", "У данной формы есть несохраненные данные. Сохранить?") }}

            <template v-slot:footer="{ closePopup }">
                <button class="button button--success form-editor__save-and-nav" @click="saveChanges">
                    {{ uSign("translate", "Сохранить и перейти") }}
                </button>

                <button class="button button--danger form-editor__discard-and-nav" @click="discardChanges">
                    {{ uSign("translate", "Сбросить и перейти") }}
                </button>

                <button class="button form-editor__cancel-nav" @click="cancelNavigation">
                    {{ uSign("translate", "Отменить переход") }}
                </button>
            </template>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import LayoutBuilder from "../components/LayoutBuilder";
import ResultsBuilder from "../components/ResultsBuilder";

import VDialog from "@/components/Dialog";

const cloneDeep = require("lodash/cloneDeep");
const isEqual = require("lodash/isEqual");

export default {
    name: "CalcConstructor",

    computed: {
        ...mapGetters(["allCalculators"]),

        currentComponent() {
            switch (this.$route.name) {
                case "formResults":
                    return "results-builder";
                case "formLayout":
                default:
                    return "layout-builder";
            }
        },

        hasChanges() {
            return !isEqual(this.currentForm, this.currentFormOriginal);
        }
    },

    components: {
        LayoutBuilder,
        ResultsBuilder,
        VDialog
    },

    methods: {
        saveFormData() {
            this.$store.dispatch("updateForm", this.currentForm);
            this.currentFormOriginal = cloneDeep(this.currentForm);
        },

        discardFormData() {
            this.currentForm = cloneDeep(this.currentFormOriginal);
        },

        saveChanges() {
            this.$refs.confirmNav.triggerClose();
            this.saveFormData();
            this.resolveNavigation();
        },

        discardChanges() {
            this.$refs.confirmNav.triggerClose();
            this.resolveNavigation();
        },

        cancelNavigation() {
            this.$refs.confirmNav.triggerClose();
            this.resolveNavigation(false);
        }
    },

    data() {
        return {
            currentForm: null,
            currentFormOriginal: null,

            navItems: [
                { routeName: "formLayout", label: this.uSign("translate", "Разметка формы") },
                { routeName: "formResults", label: this.uSign("translate", "Результаты") }
            ],

            resolveNavigation: null
        };
    },

    created() {
        const formId = +this.$route.params.id;
        const selectedForm = this.allCalculators.find(({ id }) => id === formId);

        this.currentFormOriginal = selectedForm;
        this.currentForm = cloneDeep(selectedForm);
    },

    beforeRouteLeave(to, from, next) {
        if (this.hasChanges) {
            this.resolveNavigation = next;
            this.$refs.confirmNav.open();
        } else {
            next();
        }
    }
};
</script>

<style scoped lang="scss">
.form-editor {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 64px;
        background-color: #263238;
        border-color: #263238;
        color: #fff;
        align-items: center;
        display: flex;
        padding: 0 24px;
        box-shadow:
 0 2px 4px -1px rgba(0, 0, 0, 0.2),
 0 4px 5px 0 rgba(0, 0, 0, 0.14),
            0 1px 10px 0 rgba(0, 0, 0, 0.12);
        z-index: 3;
    }

    &__header-title {
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.02em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__header-nav {
        list-style: none;
        margin: 0 auto;
        display: flex;
        height: 100%;
    }

    &__header-nav-item {
        margin: 0 24px;
        display: flex;
        align-items: center;
        border-bottom: 4px solid transparent;
        transition: border-bottom-color 0.3s;
    }

    &__header-nav-item--active,
    &__header-nav-item:hover {
        border-bottom-color: $bright_color1;
    }

    &__header-nav-link {
        color: $white;
        text-decoration: none;
    }

    &__move-back {
        height: 100%;
        display: inline-block;
        color: white;
        text-decoration: none;
        margin-right: 18px;
        transition: opacity 0.3s;

        &:hover {
            opacity: 0.5;
        }
    }

    &__move-back-icon {
        vertical-align: middle;
        margin-top: -2px;
    }

    &__content {
        margin-top: 64px;
        height: calc(100vh - 64px);
    }

    &__discard-btn, &__save-and-nav, &__discard-and-nav {
        margin-right: 12px;
    }
}
</style>
