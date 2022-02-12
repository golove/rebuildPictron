export interface IData{
    title:string,
    href:string,
    srcs:Array<string>,
    star:number,
    collect: boolean,
    delete: boolean,
    download: boolean
}

export interface IMenu{ title:string , path:string, icon: string }
