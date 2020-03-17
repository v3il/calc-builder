<template>
    <base-page-layout>
        <template v-slot:title>
            <span v-if="selectedForm">
                {{ selectedForm.name }}
            </span>
        </template>

        {{ selectedForm ? selectedForm.layout : 'a' }}

        <div style="    display: flex;">
            <ul class="nav nav-tabs" style="flex: 1;">
                <li v-for="(navItem, index) in navItems" :key="index" class="nav-item">
                    <router-link
                        class="nav-link"
                        :class="{
                            active: $route.name === navItem.routeName,
                        }"
                        :to="{ name: navItem.routeName }"
                    >
                        {{ navItem.label }}
                    </router-link>
                </li>
            </ul>

            <div class="form-editor__actions" style="margin-left: 36px;">
                <button
                    class="btn btn-primary btn-sm1 form-editor__submit-btn"
                    @click="saveFormData"
                    style="margin-right: 12px;"
                >
                    {{ uSign('translate', 'Сохранить') }}
                </button>

                <button
                    class="btn btn-secondary btn-sm1 form-editor__move-back-btn"
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
                v-if="selectedForm"
            ></component>

            <div v-else>Loading...</div>
        </div>
    </base-page-layout>

    <!--    <div class="form-editor">-->
    <!--        <div class="form-editor__header">-->
    <!--            <div class="form-editor__header-title" v-if="selectedForm">-->
    <!--                {{ selectedForm.name }}-->
    <!--            </div>-->

    <!--            <ul class="form-editor__header-nav">-->
    <!--                <li-->
    <!--                    v-for="(navItem, index) in navItems"-->
    <!--                    :key="index"-->
    <!--                    class="form-editor__header-nav-item"-->
    <!--                    :class="{-->
    <!--                        'form-editor__header-nav-item&#45;&#45;active': $route.name === navItem.routeName,-->
    <!--                    }"-->
    <!--                >-->
    <!--                    <router-link-->
    <!--                        class="form-editor__header-nav-link"-->
    <!--                        :to="{ name: navItem.routeName }"-->
    <!--                    >-->
    <!--                        {{ navItem.label }}-->
    <!--                    </router-link>-->
    <!--                </li>-->
    <!--            </ul>-->

    <!--            <div class="form-editor__actions">-->
    <!--                &lt;!&ndash;                <button&ndash;&gt;-->
    <!--                &lt;!&ndash;                    v-if="false"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    class="button button&#45;&#45;danger form-editor__discard-btn"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    @click="discardFormData"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    :disabled="!hasChanges"&ndash;&gt;-->
    <!--                &lt;!&ndash;                >&ndash;&gt;-->
    <!--                &lt;!&ndash;                    {{ uSign('translate', 'Сбросить изменения') }}&ndash;&gt;-->
    <!--                &lt;!&ndash;                </button>&ndash;&gt;-->

    <!--                <button-->
    <!--                    class="button button&#45;&#45;success form-editor__submit-btn"-->
    <!--                    @click="saveFormData"-->
    <!--                >-->
    <!--                    {{ uSign('translate', 'Сохранить') }}-->
    <!--                </button>-->

    <!--                <button-->
    <!--                    class="button form-editor__move-back-btn"-->
    <!--                    @click="$router.push({ name: 'home' })"-->
    <!--                >-->
    <!--                    {{ uSign('translate', 'Назад') }}-->
    <!--                </button>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        {{ selectedForm }}-->

    <!--        <div class="form-editor__content">-->
    <!--            <component-->
    <!--                ref="optionsComponent"-->
    <!--                :is="currentComponent"-->
    <!--                :form="selectedForm"-->
    <!--                v-if="selectedForm"-->
    <!--            ></component>-->

    <!--            <div v-else>Loading...</div>-->
    <!--        </div>-->

    <!--        &lt;!&ndash;        <v-dialog&ndash;&gt;-->
    <!--        &lt;!&ndash;            ref="confirmNav"&ndash;&gt;-->
    <!--        &lt;!&ndash;            :max-width="600"&ndash;&gt;-->
    <!--        &lt;!&ndash;            class="form-editor__confirm-dialog"&ndash;&gt;-->
    <!--        &lt;!&ndash;            @close="cancelNavigation"&ndash;&gt;-->
    <!--        &lt;!&ndash;        >&ndash;&gt;-->
    <!--        &lt;!&ndash;            {{ uSign('translate', 'У данной формы есть несохраненные данные. Сохранить?') }}&ndash;&gt;-->

    <!--        &lt;!&ndash;            <template v-slot:footer="{ closePopup }">&ndash;&gt;-->
    <!--        &lt;!&ndash;                <button&ndash;&gt;-->
    <!--        &lt;!&ndash;                    class="button button&#45;&#45;success form-editor__save-and-nav"&ndash;&gt;-->
    <!--        &lt;!&ndash;                    @click="saveChanges"&ndash;&gt;-->
    <!--        &lt;!&ndash;                >&ndash;&gt;-->
    <!--        &lt;!&ndash;                    {{ uSign('translate', 'Сохранить и перейти') }}&ndash;&gt;-->
    <!--        &lt;!&ndash;                </button>&ndash;&gt;-->

    <!--        &lt;!&ndash;                <button&ndash;&gt;-->
    <!--        &lt;!&ndash;                    class="button button&#45;&#45;danger form-editor__discard-and-nav"&ndash;&gt;-->
    <!--        &lt;!&ndash;                    @click="discardChanges"&ndash;&gt;-->
    <!--        &lt;!&ndash;                >&ndash;&gt;-->
    <!--        &lt;!&ndash;                    {{ uSign('translate', 'Сбросить и перейти') }}&ndash;&gt;-->
    <!--        &lt;!&ndash;                </button>&ndash;&gt;-->

    <!--        &lt;!&ndash;                <button class="button form-editor__cancel-nav" @click="cancelNavigation">&ndash;&gt;-->
    <!--        &lt;!&ndash;                    {{ uSign('translate', 'Отменить переход') }}&ndash;&gt;-->
    <!--        &lt;!&ndash;                </button>&ndash;&gt;-->
    <!--        &lt;!&ndash;            </template>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </v-dialog>&ndash;&gt;-->
    <!--    </div>-->
</template>

<script>
import LayoutBuilder from '../components/LayoutBuilder';
import ResultsBuilder from '../components/ResultsBuilder';

import axios from '../axios';

import VDialog from '@/components/Dialog';
import BasePageLayout from './BasePageLayout';

const layoutBuilderComponentId = 'layout-builder';
const resultsBuilderComponentId = 'results-builder';

export default {
    name: 'CalcConstructor',

    computed: {
        currentComponent() {
            const mapping = {
                formLayout: layoutBuilderComponentId,
                formResults: resultsBuilderComponentId,
            };

            return mapping[this.$route.name] || layoutBuilderComponentId;
        },

        hasChanges() {
            return false; //this.currentFormHistory.length > 1;
        },
    },

    components: {
        LayoutBuilder,
        ResultsBuilder,
        VDialog,
        BasePageLayout,
    },

    methods: {
        // onFormUpdate(formConfig) {
        //     this.currentFormHistory.push(formConfig);
        //     console.log('Layout changed', this.currentFormHistory.length);
        // },

        async saveFormData() {
            if (this.currentComponent === layoutBuilderComponentId) {
                this.$refs.optionsComponent.saveEditedField();
            }

            const response = await axios.post('/forms/save', this.selectedForm);
            console.log(response.data);

            // this.saveForms();

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
        const formId = this.$route.params.id;

        try {
            const response = await axios.get(`/forms/${formId}`);
            this.selectedForm = response.data;
            console.warn(response.data);
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
}
</style>
