export default function extendTemplateSlots(template, slots) {

    Object.keys(slots).map((slotName, index) => {

        let regexPattern = slotName=='default' ? '<slot[\s\S]*>' : '<slot(.+name="('+slotName+')")?[\s\S]*>'

        let regex = new RegExp(regexPattern, 'ig');

        let results = [];
        let result = null;

        while ((result = regex.exec(template)) !== null) {
            results.push(result);
        }

        if (!results.length) {
            return false;
        }

        results.map((result, index) => {
            if (slotName=='default' || (result[2]!=null && result[2]==slotName)) {
                let start = result.index + result[0].length;
                let end = result.input.indexOf('</slot>', start);
                if (end == -1) {
                    return;
                }
                template = template.substring(0, start) + slots[slotName] + template.substring(end);
            }
        });
    });

    return template;
}