<template>
    <div class="page">
        <div class="header">
            <div class="header_title">Список созданных форм</div>
        </div>

        <div class="content">
            <div class="calculators">
                <div class="calculators__item" v-for="(calc, index) in allCalculators" :key="index">
                    <div
                        class="calculators__preview"
                        :style="{
                            backgroundImage: `url(${calc.backgroundImageSrc})`,
                        }"
                    ></div>

                    <div class="calculators__name">{{ calc.name || ' ' }}</div>

                    <div class="calculators__actions">
                        <ui-button color="primary" @click="edit(calc)">
                            Редактировать
                        </ui-button>

                        <ui-button color="red" @click="remove(calc)">
                            Удалить
                        </ui-button>
                    </div>
                </div>

                <div class="calculators__item calculators__item--prompt">
                    <div class="calculators__actions">
                        <ui-button color="primary" @click="add()">
                            Создать
                        </ui-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MainPage',

    computed: {
        ...mapGetters(['allCalculators', 'selectedCalculator']),
    },

    data() {
        return {
            items: [
                {
                    id: 0,
                    type: 'ButtonField',
                    text: 'Кнопка',
                },
                {
                    id: 1,
                    type: 'TextField',
                    text: 'Текстовое поле',
                },
            ],

            drawer: true,
        };
    },

    props: {
        source: String,
    },

    methods: {
        edit(calc) {
            // this.$store.dispatch('selectCalc', calc);
            this.$router.push({
                name: 'formLayout',
                params: {
                    id: calc.id,
                },
            });
        },

        add() {
            this.$store.dispatch('addCalculator');
            // this.$router.push('/constructor');
        },

        remove(calc) {
            this.$store.dispatch('removeCalculator', calc);
        },
    },
};
</script>

<style lang="scss">
.page {
    display: flex;
    flex-direction: column;

    /* padding: 12px 24px; */

    min-height: 100vh;
}

.header {
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

.header_title {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content {
    margin-top: 64px;
    height: calc(100vh - 64px);
}

.calculators {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 18px;
    grid-row-gap: 18px;
    padding: 24px;

    .calculators__item {
        display: flex;
        flex-direction: column;
        flex-basis: 350px;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
        min-height: 250px;

        &--prompt {
            justify-content: center;
        }

        .calculators__preview {
            width: 100%;
            height: 150px;
            background:
 url('http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg') no-repeat
                top;
            background-size: cover;
        }

        .calculators__name {
            margin: 12px 6px;
        }

        .calculators__actions {
            display: flex;
            justify-content: center;
            margin: 0 6px 12px;
        }
    }
}
</style>
