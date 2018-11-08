import textFieldProperties from './text_field/PropertiesComponentsData';
import buttonFieldProperties from './button_field/PropertiesComponentsData';
import checkboxFieldProperties from './checkbox_field/PropertiesComponentsData';
import imageFieldProperties from './image_field/PropertiesComponentsData';
import radioButtonFieldProperties from './radiobutton_field/PropertiesComponentsData';
import selectFieldProperties from './select_field/PropertiesComponentsData';
import sliderFieldProperties from './slider_field/PropertiesComponentsData';
import textAreaFieldProperties from './textarea_field/PropertiesComponentsData';

export default (selectedField) => {
    switch(selectedField.type) {
        case 'TextField': return textFieldProperties(selectedField.params);
        case 'ButtonField': return buttonFieldProperties(selectedField.params);
        case 'CheckBoxField': return checkboxFieldProperties(selectedField.params);
        case 'ImageField': return imageFieldProperties(selectedField.params);
        case 'RadioButtonField': return radioButtonFieldProperties(selectedField.params);
        case 'SelectField': return selectFieldProperties(selectedField.params);
        case 'SliderField': return sliderFieldProperties(selectedField.params);
        case 'TextAreaField': return textAreaFieldProperties(selectedField.params);
    }
}