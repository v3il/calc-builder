<template>
    <div>
        Slider, {{params}} {{componentParams}}

        <h4>{{componentParams.title}}</h4>

        <!--<el-slider :min="25" :max="100" :step="25" v-model="params[propertyName]"></el-slider>-->

        <el-button-group>
            <el-button size="small" v-for="size in sizes" type="primary" @click="params[componentParams.propertyName] = size">
                {{size}}%
            </el-button>
        </el-button-group>

        <!--<input type="number" v-model="params[propertyName]">-->
    </div>
</template>

<script>
    import Sizes from '../../constants/ContainerSizes';

    export default {
        name: "Slider",

        data() {
            return {
                sizes: Sizes.sizes,
                options: this.componentParams,
            }
        },

        props: {
            params: Object,
            componentParams: Object,
        }
    }
</script>

<style scoped>

</style>