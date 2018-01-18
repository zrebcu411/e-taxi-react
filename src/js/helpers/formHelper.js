import { omit, reduce } from 'lodash';
import validator from 'validator';

/**
 * Validates object with inputName: inputValue pairs if
 * all fields are not empty.
 *
 * @param {object} [data={}]
 * @param {array[String]} [fieldsToOmit=[]] Array of fields which should be omited form validation
 * @param {string} [errorMsg='To pole jest wymagane']
 * @returns {object} Object contains error occured inputNames with thier error messages
 */
export default (data = {}, fieldsToOmit = [], errorMsg = 'To pole jest wymagane') => {
  const object = omit(data, fieldsToOmit);

  const errors = reduce(object, (result, value, key) => {
    if (validator.isEmpty(value)) {
      result[key] = errorMsg;
    }
    return result;
  }, {});

  return errors;
};
