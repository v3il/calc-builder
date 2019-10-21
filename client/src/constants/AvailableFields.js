const availableFields = [
  {
    type: 'TextField',
    text: 'Текстовое поле',
  },
  {
    type: 'TextAreaField',
    text: 'Многострочное поле',
  },
  {
    type: 'SliderField',
    text: 'Ползунок',
  },
  {
    type: 'SelectField',
    text: 'Выпадающий список',
  },
  {
    type: 'RadioButtonField',
    text: 'Радиокнопка',
  },
  {
    type: 'CheckBoxField',
    text: 'Галочка',
  },
  // {
  //   type: 'ImageField',
  //   text: 'Изображение',
  // },
  // {
  //   type: 'ButtonField',
  //   text: 'Кнопка',
  // },
];

availableFields.forEach((field, index) => {
  field.id = index;
});

export default availableFields;
