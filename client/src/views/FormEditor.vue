<template>
    <div class="form-editor">
        <div class="form-editor__header">
            <div class="form-editor__header-title">
                {{ selectedForm.name }}
            </div>

            <ul class="form-editor__header-nav">
                <li
                    v-for="(navItem, index) in navItems"
                    :key="index"
                    class="form-editor__header-nav-item"
                    :class="{
                        'form-editor__header-nav-item--active': $route.name === navItem.routeName,
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

            <div class="form-editor__actions">
                <!--                <button-->
                <!--                    v-if="false"-->
                <!--                    class="button button&#45;&#45;danger form-editor__discard-btn"-->
                <!--                    @click="discardFormData"-->
                <!--                    :disabled="!hasChanges"-->
                <!--                >-->
                <!--                    {{ uSign('translate', 'Сбросить изменения') }}-->
                <!--                </button>-->

                <button
                    class="button button--success form-editor__submit-btn"
                    @click="saveFormData"
                >
                    {{ uSign('translate', 'Сохранить') }}
                </button>

                <button
                    class="button form-editor__move-back-btn"
                    @click="$router.push({ name: 'home' })"
                >
                    {{ uSign('translate', 'Назад') }}
                </button>
            </div>
        </div>

        <div class="form-editor__content">
            <component
                ref="optionsComponent"
                :is="currentComponent"
                :form="selectedForm"
            ></component>
        </div>

        <!--        <v-dialog-->
        <!--            ref="confirmNav"-->
        <!--            :max-width="600"-->
        <!--            class="form-editor__confirm-dialog"-->
        <!--            @close="cancelNavigation"-->
        <!--        >-->
        <!--            {{ uSign('translate', 'У данной формы есть несохраненные данные. Сохранить?') }}-->

        <!--            <template v-slot:footer="{ closePopup }">-->
        <!--                <button-->
        <!--                    class="button button&#45;&#45;success form-editor__save-and-nav"-->
        <!--                    @click="saveChanges"-->
        <!--                >-->
        <!--                    {{ uSign('translate', 'Сохранить и перейти') }}-->
        <!--                </button>-->

        <!--                <button-->
        <!--                    class="button button&#45;&#45;danger form-editor__discard-and-nav"-->
        <!--                    @click="discardChanges"-->
        <!--                >-->
        <!--                    {{ uSign('translate', 'Сбросить и перейти') }}-->
        <!--                </button>-->

        <!--                <button class="button form-editor__cancel-nav" @click="cancelNavigation">-->
        <!--                    {{ uSign('translate', 'Отменить переход') }}-->
        <!--                </button>-->
        <!--            </template>-->
        <!--        </v-dialog>-->
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import LayoutBuilder from '../components/LayoutBuilder';
import ResultsBuilder from '../components/ResultsBuilder';

import axios from '../axios';

import VDialog from '@/components/Dialog';

const { mapActions, mapState } = createNamespacedHelpers('forms');

const layoutBuilderComponentId = 'layout-builder';
const resultsBuilderComponentId = 'results-builder';

export default {
    name: 'CalcConstructor',

    computed: {
        ...mapState(['createdForms']),

        currentComponent() {
            const mapping = {
                formLayout: layoutBuilderComponentId,
                formResults: resultsBuilderComponentId,
            };

            return mapping[this.$route.name] || layoutBuilderComponentId;
        },

        hasChanges() {
            return this.currentFormHistory.length > 1;
        },
    },

    components: {
        LayoutBuilder,
        ResultsBuilder,
        VDialog,
    },

    methods: {
        ...mapActions(['saveForms']),

        // onFormUpdate(formConfig) {
        //     this.currentFormHistory.push(formConfig);
        //     console.log('Layout changed', this.currentFormHistory.length);
        // },

        saveFormData() {
            if (this.currentComponent === layoutBuilderComponentId) {
                this.$refs.optionsComponent.saveEditedField();
            }

            this.saveForms();

            // this.currentForm = this.currentFormHistory.pop();
            // this.$store.dispatch('updateForm', this.currentForm);
            // this.currentFormHistory = [this.currentForm];
        },

        // discardFormData() {
        //     if (this.currentComponent === layoutBuilderComponentId) {
        //         this.$refs.optionsComponent.saveEditedField();
        //     }
        //
        //     this.currentForm = this.currentFormHistory[0];
        //     this.currentFormHistory = [this.currentForm];
        // },
        //
        // saveChanges() {
        //     this.$refs.confirmNav.triggerClose();
        //     this.saveFormData();
        //     this.resolveNavigation();
        // },
        //
        // discardChanges() {
        //     this.$refs.confirmNav.triggerClose();
        //     this.resolveNavigation();
        // },
        //
        // cancelNavigation() {
        //     this.$refs.confirmNav.triggerClose();
        //     this.resolveNavigation(false);
        // },
    },

    data() {
        return {
            selectedForm: null,

            navItems: [
                { routeName: 'formLayout', label: this.uSign('translate', 'Разметка формы') },
                { routeName: 'formResults', label: this.uSign('translate', 'Результаты') },
            ],

            resolveNavigation: null,

            currentFormHistory: [],
        };
    },

    async created() {
        const formId = +this.$route.params.id;

        console.log(formId);

        try {
            const response = await axios.get(`/forms/${formId}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    },
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
        justify-content: space-between;
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
        border-bottom-color: $success;
    }

    &__header-nav-link {
        color: $white;
        text-decoration: none;
    }

    &__content {
        margin-top: 64px;
        height: calc(100vh - 64px);
    }

    &__discard-btn,
    &__submit-btn,
    &__save-and-nav,
    &__discard-and-nav {
        margin-right: 12px;
    }
}
</style>
