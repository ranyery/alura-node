/**
 * @param { {} } obj
 * @param { string[] } requiredProperties
 */
export function objectHasRequiredProperties(obj = {}, requiredProperties = []) {
  let hasRequiredProperties = true;
  let missingProperty = "";

  const objectProperties = Object.keys(obj);
  for (const property of requiredProperties) {
    if (objectProperties.includes(property)) continue;

    hasRequiredProperties = false;
    missingProperty = property;
    break;
  }

  return { hasRequiredProperties, missingProperty };
}

export function removeNotRequiredProperties(obj = {}, requiredProperties = []) {
  const newObject = {};

  for (const property of requiredProperties) {
    newObject[property] = obj[property];
  }

  return newObject;
}
