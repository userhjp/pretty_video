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

    /** 是否是PC端 */
    isPC() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];  // 判断用户代理头信息
        let flag = true;
        for (const i in Agents) {
            if (userAgentInfo.indexOf(Agents[i]) !== -1) { flag = false; break; }
        }
        return flag;   // true为pc端，false为非pc端
    }
}

export default new Utils();
