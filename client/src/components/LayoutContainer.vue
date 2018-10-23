<template>
    <v-flex v-bind="{
        [`xs6`]: true,
        [`xs12`]: !containerData.float
    }">
        <v-card :style="{width: `${containerData.width * 100}%`}">
            <v-toolbar color="blue-grey darken-4" dense dark>
                <v-btn icon class="js-drag-icon">
                    <v-icon>drag_indicator</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="resize(-1)">
                    <v-icon>format_indent_decrease</v-icon>
                </v-btn>

                <v-btn icon @click="resize(1)">
                    <v-icon>format_indent_increase</v-icon>
                </v-btn>

                <v-btn icon v-if="containerData.float" @click="toggleFloatState">
                    <v-icon>layers_clear</v-icon>
                </v-btn>

                <v-btn icon v-else @click="toggleFloatState">
                    <v-icon>layers</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon flat
                    v-for="position in positions"
                    :key="position"
                    @click="setAlignment(position)"
                    :class="{blured: containerData.alignment !== position}"
                >
                    <v-icon>format_align_{{position}}</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="remove">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        {{containerData.id}}

                        <br>

                        {{containerData}}

                        <br>

                        <Draggable v-model="containerData.fields" class="drag" @add="onAdd" :options="{
                            group: 'items',
                        }">
                            <template v-for="field in containerData.fields">
                                <component
                                    @optionsUpdate="updateOptions(field, $event)"
                                    :key="field.id"
                                    :is="field.type"
                                    :options="field.params"
                                ></component>
                            </template>
                        </Draggable>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
    import Draggable from 'vuedraggable';

    import ButtonField from './fields/ButtonField.vue';
    import TextField from './fields/TextField.vue';

    import getNextId from '../utils/getNextId';

    import ContainerAlignmentPositions from '../constants/ContainerAlignmentPositions';
    import ContainerSizes from '../constants/ContainerSizes';

    export default {
        name: 'LayoutContainer',

        props: {
            container: Object,
        },

        components: {
            Draggable,
            ButtonField,
            TextField,
        },

        data() {
            return {
                containerData: this.container,
                positions: ContainerAlignmentPositions.positions,
            };
        },

        methods: {
            remove() {
                this.$emit('removeContainer', this.container);
            },

            resize(direction) {
                const sizes = ContainerSizes.sizes;

                const currentIndex = sizes.indexOf(this.containerData.width);
                this.containerData.width = sizes[currentIndex + direction];
            },

            toggleFloatState() {
                this.containerData.float = !this.containerData.float;
            },

            setAlignment(alignment) {
                this.containerData.alignment = alignment;
            },

            onAdd(event) {
                const itemElement = event.item;
                const fieldIndex = event.newIndex;

                this.containerData.fields.splice(fieldIndex, 0, {
                    id: getNextId(this.containerData.fields),
                    type: itemElement.children[0].dataset.item,
                    params: {},
                });

                itemElement.remove();
            },

            updateOptions(field, newOptions) {
                field.params = newOptions;
            }
        },
    }
</script>

<style scoped lang="scss">
    .layout-container {
        display: inline-block;
        border: 1px solid gray;
        padding: 12px 24px;
        vertical-align: top;
        background-color: #424242;

        &.non-float {
            display: block;
        }

        &.pulled-right {
            margin-left: auto;
        }
    }

    .resize {
        width: 100px;
        height: 50px;
        background: black;
    }

    .drag {
        width: 100%;
        height: 100px;
        padding: 12px;
        border: 1px dashed royalblue;
        border-radius: 4px;
    }

    .blured {
        opacity: 0.5;
    }
</style>