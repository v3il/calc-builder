export default (slots) => {
    let fieldBaseTemplate = `
        <div :style="{
            width: fieldObject.params.float ? fieldObject.params.width + '%' : '100%',
        }" class="field-wrapper">
            <FieldsParamsToolbar @fieldRemove="emitFieldRemove" @fieldEdit="emitFieldEdit"></FieldsParamsToolbar>
    
            <div :style="{
                width: fieldObject.params.float ? '100%' : fieldObject.params.width + '%',
                'margin-left': fieldObject.params.float ? '0' : fieldObject.params.marginLeft + '%',
            }">
                <slot></slot>
            </div>
        </div>
    `;

    Object.keys(slots).map((slotName) => {
        let regexPattern = slotName === 'default' ? '<slot[\s\S]*>' : '<slot(.+name="('+slotName+')")?[\s\S]*>';

        let regex = new RegExp(regexPattern, 'ig');

        let results = [];
        let result;

        while ((result = regex.exec(fieldBaseTemplate)) !== null) {
            results.push(result);
        }

        if (!results.length) {
            return false;
        }

        results.map((result, index) => {
            if (slotName === 'default' || (result[2] !== null && result[2] === slotName)) {
                let start = result.index + result[0].length;
                let end = result.input.indexOf('</slot>', start);

                if (end === -1) {
                    return;
                }

                fieldBaseTemplate = fieldBaseTemplate.substring(0, start) + slots[slotName] + fieldBaseTemplate.substring(end);
            }
        });
    });

    return fieldBaseTemplate;
}

