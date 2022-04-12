const createElement = (elem, classNames, child, parent, ...dataAttributes) => {
    let element = null;

    element = document.createElement(elem);

    if (classNames) {
        element.classList.add(...classNames.split(' '));
    }

    if (child) {
        if (Array.isArray(child)) {
            child.forEach((childElem) => {
                element.append(childElem);
            })
        } else if (typeof child === 'string') {
            element.innerHTML = child;
        } else {
            element.append(child);
        }
    }

    if (parent) {
        parent.append(element);
    }
    
    if (dataAttributes.length) {
        dataAttributes.forEach(([attributeName, attributeValue]) => {
            if (!attributeValue) {
                element.setAttribute(attributeName, '');
            } else {
                element.setAttribute(attributeName, attributeValue);
            }
        });
    }

    return element;
}

export default createElement