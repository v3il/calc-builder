import availableFields from '../constants/AvailableFields';

const lettersMapping = {};

availableFields.forEach(({ type }, index) => {
    lettersMapping[type] = String.fromCharCode('A'.charCodeAt(0) + index);
});

export default (existingFields, newFieldType) => {
    const fieldLetter = lettersMapping[newFieldType] || lettersMapping.input;
    const sameTypeExistingFields = existingFields.filter(({ type }) => type === newFieldType);

    let newIndex = -1;
    const existingLettersIndices = sameTypeExistingFields.map(item =>
        parseInt(item.letter.replace(/\D*/g, '')),
    );

    if (existingLettersIndices.length) {
        const currentMaxIndex = Math.max.apply(Math, existingLettersIndices);
        let firstFreeIndexBetweenExisting = -1;

        for (let i = 1; i <= currentMaxIndex; i++) {
            if (!existingLettersIndices.includes(i)) {
                firstFreeIndexBetweenExisting = i;
                break;
            }
        }

        newIndex =
            firstFreeIndexBetweenExisting > 0 ? firstFreeIndexBetweenExisting : currentMaxIndex + 1;
    } else {
        newIndex = 1;
    }

    return `${fieldLetter}${newIndex}`;
};
