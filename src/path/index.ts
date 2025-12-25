// export const pathMatch = (path: string, routePath: string) => {
//   // let result = matchPath(path, {
//   //   path: paramsPath,
//   //   exact: true,
//   //   strict: false,
//   // })?.isExact;
//   return true;
// };

/**
 * Sample Input: Array<str> -> [{varkey1: 'varvalue1'}, {varkey2: 'varvalue2'}, {varkey3: undefined}]
 * Sample Output: str -> '?varvalue1=varvalue1&varkey2=varvalue2'
 */

interface IVarToStringParams {
  variablesArray: {
    key: string;
    value: string | undefined | number;
  }[];
}
type IVarToStringParamsValue =
  IVarToStringParams['variablesArray'][number]['value'];
type IQueryObject = Record<string, IVarToStringParamsValue>;

export const varToStringParams = (data: IVarToStringParams): string => {
  let { variablesArray } = data;
  let str = '';
  if (variablesArray.length === 1) {
    const { key, value } = variablesArray[0];
    return value ? `?${key}=${value}` : '';
  }
  let first = true;
  for (let i = 0; i < variablesArray.length; i++) {
    const { key, value } = variablesArray[i];
    if (value || value === 0) {
      let temp = `${key}=${value}`;
      if (!first) {
        // not first
        temp = `&${temp}`;
      }
      str += temp;
      first = false;
    }
  }
  if (str) {
    str = '?' + str;
  }
  return str;
};

export const arrayToStr = (
  arr: Array<string | number>,
  seperator: string = ','
) => {
  let str = '';
  for (const index in arr) {
    str += arr[index];
    if (Number.parseInt(index) < arr.length - 1) {
      // not last element
      str += seperator;
    }
  }
  return str;
};

/**
 * Remove spaces and split
 * @param str
 * @param seperator
 * @returns
 */
export const strToArr = (str: string, seperator: string = ',') => {
  return str
    .replace(/ /g, '')
    .split(seperator)
    .filter((el) => el.length > 0);
};

/**
 * Creates a query param string. The order of params is stable (alphabetical).
 */
export const objToStringParams = (queryObj: IQueryObject): string => {
  const variablesArray = Object.keys(queryObj)
    .sort()
    .map((key) => ({
      key,
      value: queryObj[key],
    }));
  return varToStringParams({ variablesArray });
};
