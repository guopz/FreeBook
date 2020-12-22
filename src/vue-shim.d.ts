// vue-shim.d.ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module 'vuex';

declare module 'nprogress';

declare namespace NodeJS {
  export interface ProcessEnv {
    MY_VARIABLE_1: string;
    MY_OTHER_VARIABLE: string;
  }
}
