<script>
import FieldBase from '../BaseField.vue';

import EventBus from '../../../EventBus';

import getTemplateForComponent from '../getTemplateForComponent';

export default {
  name: 'RadioButtonField',

  extends: FieldBase,

  template: getTemplateForComponent({
    default: `
                <label>{{fieldObject.params.label}}</label>

                <ui-radio-group
                    :name="generateFieldId()"
                    vertical
                    :options="fieldObject.params.options"
                    v-model="fieldObject.params.value"
                ></ui-radio-group>
            `,
  }),

  data() {
    return {
      defaultOptions: {
        value: 1,
        label: 'Заголовок поля',
        options: [
          {
            value: 1,
            label: 'Option 1',
          },
          {
            value: 2,
            label: 'Option 2',
          },
        ],
      },
    };
  },

  methods: {},

  created() {
    EventBus.$on(`removeOption${this.fieldObject.id}`, (option) => {
      this.fieldObject.params.options = this.fieldObject.params
        .options.filter(opt => opt !== option);
    });

    EventBus.$on(`addOption${this.fieldObject.id}`, () => {
      this.fieldObject.params.options.push({
        value: 1,
        label: 'Option',
      });
    });
  },

  destroyed() {
    EventBus.$off(`addOption${this.fieldObject.id}`);
    EventBus.$off(`removeOption${this.fieldObject.id}`);
  },
};
</script>

<style scoped lang="scss">
    .field-wrapper {
        padding-top: 6px;
        padding-bottom: 6px;
    }
</style>
