export function buildQueryParams(params: { [key: string]: any }): any {
  const queryString = Object.keys(params)
    .map(key => {
      let value = params[key];
      if (typeof value === 'object' && value !== null) {
        value = Object.keys(value)
          .map(subKey => `${encodeURIComponent(subKey)}=${encodeURIComponent(value[subKey])}`)
          .join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return queryString;
}