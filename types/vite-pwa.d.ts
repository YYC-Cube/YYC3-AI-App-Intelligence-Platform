declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegisteredSW?: (
      swScriptUrl: string,
      registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterError?: (error: Error) => void;
  }

  export type RegisterSW = (options?: RegisterSWOptions) => (reloadPage?: boolean) => Promise<void>;

  const registerSW: RegisterSW;
  export default registerSW;
}
