<script>
import FieldBase from '../BaseField.vue';

import getTemplateForComponent from '../getTemplateForComponent';

export default {
  name: 'SliderField',

  extends: FieldBase,

  template: getTemplateForComponent({
    default: `
                <transition name="fade">
                    <label v-if="this.fieldObject.params.label" :for="generateFieldId()">
                        {{fieldObject.params.label}}
                    </label>
                </transition>

                <el-slider
                    v-model="fieldObject.params.value"
                    :step="fieldObject.params.step"
                    :min="fieldObject.params.min"
                    :max="fieldObject.params.max"
                    :id="generateFieldId()"
                ></el-slider>
            `,
  }),

  data() {
    return {
      defaultOptions: {
        label: 'Заголовок поля',

        value: 0,
        min: 0,
        max: 10,
        step: 1,
      },
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss">
    .field-wrapper {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    label {
        float: none;
    }

    /*button {*/
        /*width: 100%;*/
    /*}*/
</style>
