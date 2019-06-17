!(function (merged) {
    'use strict';
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(merged);
    } else if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = merged();
    } else {
        window.merged = merged();
    }
})(function () {
    'use strict';

    /**
     * (复制对象)
     * 
     * @returns (返回复制的对象)
     */
    function merged() {
        for (var len = arguments.length, arg = Array(len), key = 0; key < len; key++) {
            arg[key] = arguments[key];
        }

        var obj = {};
        for (var i = 0; i < arg.length; i++) {
            for (var key in arg[i]) {
                var curObj = arg[i][key];
                if (isJson(curObj)) {
                    if (isJson(obj[key])) {
                        obj[key] = merged(obj[key], curObj); // obj 此属性已经是对象，则和该对象原来的属性合并
                    } else {
                        obj[key] = merged(curObj); // obj 此属性不是对象，则和该对象原来的属性合并
                    }
                } else if (isArray(curObj)) { //此对象是数组
                    obj[key] = mergedArr(curObj);
                } else {
                    obj[key] = curObj; //属性不是obj
                }
            }
        }
        return obj;
    };

    /**
     * (复制数组)
     * 
     * @param arr (description)
     */
    function mergedArr(arr) {
        var arr2 = [];

        for (var i = 0; i < arr.length; i++) {
            var curObj = arr[i];
            if (isJson(curObj)) {
                arr2[i] = merged(curObj); // 复制对象
            } else if (isArray(curObj)) { //复制数组
                arr2[i] = mergedArr(curObj);
            } else {
                arr2[i] = curObj; //属性不是obj
            }
        }
        return arr2;
    }

    function isJson(obj) {
        return (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) == 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length; //true 是 false不是
    };
    function isArray(arr) {
        return Object.prototype.toString.call(arr).toLowerCase() === '[object array]'; //true 是 false不是
    }
    return merged;
});

