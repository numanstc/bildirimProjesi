import QueryProvider from './queryProvider';

const service = new QueryProvider();
service.init();

export function select() {
  return service.select('pageLink');
}
