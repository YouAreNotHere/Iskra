// global.d.ts

interface AjaxObject {
    ajax_url: string;
}

declare global {
    interface Window {
        ajax_object?: AjaxObject;
    }
}

export {__global}