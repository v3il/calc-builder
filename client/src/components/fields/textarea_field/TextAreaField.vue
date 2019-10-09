<script>
import FieldBase from '../BaseField.vue';

import getTemplateForComponent from '../getTemplateForComponent';

export default {
  name: 'TextAreaField',

  extends: FieldBase,

  template: getTemplateForComponent({
    default: `
                <transition name="fade">
                    <label v-if="this.fieldObject.params.label" :for="generateFieldId()">
                        {{fieldObject.params.label}}
                    </label>
                </transition>

                <ui-textbox
                    type="text"
                    v-model="fieldObject.params.value"
                    :placeholder="fieldObject.params.placeholder"
                    :id="generateFieldId()"
                    :style="styleObject"
                    :multiLine="true"
                ></ui-textbox>
            `,
  }),

  data() {
    return {
      defaultOptions: {
        value: '',
        label: 'Заголовок поля',
        placeholder: 'Подсказка поля',
        resizable: true,
      },
    };
  },

  computed: {
    styleObject() {
      return {
        resize: this.fieldObject.params.resizable ? 'vertical' : 'none',
      };
    },
  },
};
</script>

<style scoped  lang="scss">
    textarea {
        width: 100%;
    }
</style>
