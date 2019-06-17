let length = 0;
let obj = new Object();
let HashMap = {
    data: obj,
    test: () => {
        console.log('可以引用！');
    },

    /**
     * 判断Map是否为空
     */
    isEmpty: () => {
        return ( length === 0 );
    },

    /**
     * 判断对象中是否包含给定Key
     */
    containsKey: (key) => {
        return ( key in obj );
    },

    /**
     * 判断对象中是否包含给定的Value
     */
    containsValue: (value) => {
        for(let key in obj){
            if(obj[key] === value){
                return true;
            }
        }
        return false;
    },

    /**
     *向map中添加数据
     */
    put: (key, value) => {
        if( !this.containsKey(key) ){
            length++;
        }
        obj[key] = value;
    },

    /**
     * 根据给定的Key获得Value
     */
    get: (key) => {
        return this.containsKey(key) ? obj[key] : null;
    },

    /**
     * 根据给定的Key删除一个值
     */
    remove: (key) => {
        if(this.containsKey(key) && (delete obj[key])){
            length--;
        }
    },

    /**
     * 获得Map中的所有Value
     */
    values: () => {
        let _values = [];
        for(let key in obj){
            _values.push(obj[key]);
        }
        return _values;
    },

    /**
     * 获得Map中的所有Key
     */
    keySet: () => {
        let _keys = [];
        for(let key in obj){
            _keys.push(key);
        }
        return _keys;
    },

    /**
     * 获得Map的长度
     */
    size: () => {
        return length;
    },

    /**
     * 清空Map
     */
    clear: () => {
        length = 0;
        obj = {};
    }
};
module.exports = HashMap;