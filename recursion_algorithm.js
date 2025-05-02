function findKeyInArray(box) {
    if (typeof box === 'string') {
        if (box.toLowerCase().includes('key')) {
            return { 
                found: true, 
                message: `🔑 Нашли ключ в ${box}!`,
                box: box 
            };
        }
        return { found: false };
    }
    
    if (Array.isArray(box)) {
        for (const innerBox of box) {
            const result = findKeyInArray(innerBox);
            if (result.found) {
                return result;
            }
        }
    }
    
    return { found: false };
}

function findKeyInObject(box) {
    if (box.isKey) {
        return { 
            found: true, 
            message: `🔑 Нашли ключ в ${box.name}!`,
            box: box 
        };
    }
    
    for (const innerBox of box.innerBoxes) {
        const result = findKeyInObject(innerBox);
        if (result.found) {
            return result;
        }
    }
    
    return { found: false };
}