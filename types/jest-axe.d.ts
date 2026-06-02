declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  interface ConfigureAxeOptions {
    rules?: Record<string, { enabled?: boolean; reviewOnFail?: boolean }>;
    [key: string]: unknown;
  }

  interface ViolationData {
    id: string;
    impact?: string;
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      html: string;
      target?: string[];
      failureSummary?: string;
      [key: string]: unknown;
    }>;
  }

  function configureAxe(options?: ConfigureAxeOptions): (html: string) => Promise<AxeResults>;

  export { AxeResults, configureAxe };
  export default configureAxe;
}
