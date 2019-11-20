const lettersMapping = {
    TextField: 'A',
    TextAreaField: 'B',
    SliderField: 'C',
    SelectField: 'D',
    RadioButtonField: 'E',
    CheckBoxField: 'F',
};

export default (existingFields, newFieldType) => {
    const fieldLetter = lettersMapping[newFieldType] || lettersMapping.input;
    const sameTypeExistingFields = existingFields.filter(({ type }) => type === newFieldType);

    let newIndex = -1;
    const existingLettersIndices = sameTypeExistingFields.map(item =>
        parseInt(item.letter.replace(/\D*/g, '')),
    );

    if (existingLettersIndices.length) {
        const currentMaxIndex = Math.max.apply(Math, existingLettersIndices);
        let freeIndexBetweenExisting = -1;

        for (let i = 1; i <= currentMaxIndex; i++) {
            if (!existingLettersIndices.includes(i)) {
                freeIndexBetweenExisting = i;
                break;
            }
        }

        if (freeIndexBetweenExisting > 0) {
            newIndex = freeIndexBetweenExisting;
        } else {
            newIndex = currentMaxIndex + 1;
        }
    } else {
        newIndex = 1;
    }

    return `${fieldLetter}${newIndex}`;
};
