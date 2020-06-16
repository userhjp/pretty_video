class Utils {
    /**
     * 判断class是否存在
     * @param obj dom对象
     * @param cls class名称
     */
    hasClass(obj: any,cls: string) {  
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
    }


    /**
     * 添加class
     * @param obj dom对象
     * @param cls class
     */
    addClass(obj: any,cls: string) {  
        if (!this.hasClass(obj,cls)) obj.className += " " + cls;  
    } 

    /**
     * 删除class
     * @param obj dom对象
     * @param cls class
     */
    removeClass(obj: any,cls: string) {  
        if (this.hasClass(obj,cls)) {  
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
            obj.className = obj.className.replace(reg, ' ');  
        }
    }

    /**
     * 切换class 有则删除，无则添加
     * @param obj dom对象
     * @param cls class
     */
    toggleClass(obj: any,cls: string) {  
        if (this.hasClass(obj,cls)) {  
            if(this.hasClass(obj,cls)){  
                this.removeClass(obj,cls);  
            }else{  
                this.addClass(obj,cls);  
            }  
        }
    } 
}

export default new Utils();
