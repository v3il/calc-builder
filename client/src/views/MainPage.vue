<template>
    <div>
        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <v-list>

                <!--<v-list-tile>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-btn block class="primary" @click="">Добавить контейнер</v-btn>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->

                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>Доступные элементы</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <Draggable :options="{
                    group: {name: 'items', pull: 'clone', put: false,},
                    sort: false,
                }">
                    <v-list-tile v-for="item in items" :key="item.id" :data-item="item.type" class="js-item">
                        <v-list-tile-action>
                            <v-icon>extension</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.text}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </Draggable>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="blue-grey darken-4" dark app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Calc constructor</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <div class="page-content">
                <v-layout row>
                    <v-tabs fixed-tabs class="page-tabs" color="transparent">
                        <v-tab :to="{name: 'constructor'}">
                            Элементы
                        </v-tab>

                        <v-tab :to="{name: 'formula'}">
                            Формула
                        </v-tab>

                        <v-tab :to="{name: 'relations'}">
                            Связи элементов
                        </v-tab>
                    </v-tabs>

                    <v-spacer></v-spacer>

                    <v-btn class="primary">
                        Сохранить
                    </v-btn>
                </v-layout>

                <router-view></router-view>
            </div>
        </v-content>

        <!--<v-footer app fixed>-->
            <!--<span>&copy; 2017</span>-->
        <!--</v-footer>-->
    </div>
</template>

<script>
    import Draggable from 'vuedraggable';

    export default {
        name: 'MainPage',

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
                    }
                ],

                drawer: true
            }
        },

        components: {
            Draggable,
        },

        props: {
            source: String
        },
    };
</script>

<style lang="scss">
    .page-content {
        padding: 8px 24px;
    }

    .page-tabs {
        margin-bottom: 24px;
    }
</style>
