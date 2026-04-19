declare const PACKAGE_VERSION: string;

declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}

declare module "*.json" {
    const path: any;
    export default path;
}

declare module "*.mp3" {
    const path: any;
    export default path;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.scss?inline' {
    const content: string;
    export default content;
}
