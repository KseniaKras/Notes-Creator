
export const AddTagHelper = (value: string[]) => {
    let array = []
    for (let i = 0; i < value.length; i++) {
        if (value[i].charAt(0) === "#") {
            array.push(value[i]);
        }
    }
    return array
}