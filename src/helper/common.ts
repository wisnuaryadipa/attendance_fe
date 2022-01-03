export const capitalize = (text: string) => {
    return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    
}

export const buildArrRangeNumber = (startNumber: number, finishNumber: number) => {
    const arrNumber: number[] = [];
    for (let index = startNumber; index <= finishNumber; index++) {
        arrNumber.push(index)
    }
    return arrNumber;
}

export const addDotNumberCurrency = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const addZero = (x: number, digit: number) => {
    return ('0' + x).slice(-digit);
}