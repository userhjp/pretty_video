export declare class Utils {
    /**
     * 判断class是否存在
     * @param el dom对象
     * @param cls class名称
     */
    static hasClass(el: HTMLElement, cls: string): RegExpMatchArray;
    /**
     * 添加class
     * @param el dom对象
     * @param cls class
     */
    static addClass(el: HTMLElement, cls: string): void;
    /**
     * 删除class
     * @param el dom对象
     * @param cls class
     */
    static removeClass(el: HTMLElement, cls: string): void;
    /**
     * 切换class 有则删除，无则添加
     * @param el dom对象
     * @param cls class
     */
    static toggleClass(el: HTMLElement, cls: string): void;
    /** 是否是PC端 */
    static isPC(): boolean;
    /** 时间秒转换为时分秒
     * @param value 秒
     */
    static formatSeconds(value: any): string;
    /**
     * utils 数字向下取整
     * @param num 数字
     * @param len 长度
     */
    static PrefixInteger(num: number, len?: number): string;
}
