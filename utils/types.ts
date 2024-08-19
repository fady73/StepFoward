export type Article = {
  title: string;
  categories?: Array<string>;
  thumbnail: string;
  summary: string;
  publishedDate?: any;
  lastUpdatedDate?: any;
  readingTime?: string;
  user: any;
  id: string;
  slug: string;
};

export type Language =
  | 'markup'
  | 'bash'
  | 'clike'
  | 'c'
  | 'cpp'
  | 'css'
  | 'javascript'
  | 'jsx'
  | 'coffeescript'
  | 'actionscript'
  | 'css-extr'
  | 'diff'
  | 'git'
  | 'go'
  | 'graphql'
  | 'handlebars'
  | 'json'
  | 'less'
  | 'makefile'
  | 'markdown'
  | 'objectivec'
  | 'ocaml'
  | 'python'
  | 'reason'
  | 'sass'
  | 'scss'
  | 'sql'
  | 'stylus'
  | 'tsx'
  | 'typescript'
  | 'wasm'
  | 'yaml';
  export interface RegisterFormData {
    confirmPassword: string | number | readonly string[];
    email: string;
    password: string;
    photoIdFront: File;
    photoIdBack: File;
    isAdmin:boolean

  }
  
  export interface ApiResponse {
    message: string;
    error?: string;
  }