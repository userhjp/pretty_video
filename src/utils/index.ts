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

    /** 时间秒转换为时分秒 
     * @param value 秒
    */
    formatSeconds(value): string {
        let secondTime = parseInt(value);// 秒
        let minuteTime = 0;// 分
        let hourTime = 0;// 小时
        if (secondTime >= 60) {
            minuteTime = Math.floor(secondTime / 60);
            secondTime = Math.floor(secondTime % 60);
            if (minuteTime >= 60) {
                hourTime = Math.floor(minuteTime / 60);
                minuteTime = Math.floor(minuteTime % 60);
            }
        }
        let joinDate = `${this.PrefixInteger(minuteTime)}:${this.PrefixInteger(secondTime)}`;
        if (hourTime > 0 || value >= 3600) joinDate = `${this.PrefixInteger(hourTime)}:${joinDate}`;
        return joinDate;
    }

    /**
     * utils 数字向下取整
     * @param num 数字
     * @param len 长度
     */
    PrefixInteger(num: number, len: number = 2) {
        num = isNaN(num) ? 0 : Math.floor(num); // 向下取整
        return (Array(len).join('0') + num).slice(-len);
    }
}

export default new Utils();
