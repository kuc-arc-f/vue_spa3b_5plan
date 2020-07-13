export default {
    get_init_items: function(items){
        var data =[]
        items.forEach(function(item){
// console.log(item.deleted );
            if(item.deleted == 0){
                data.push(item)                        
            }
        });
        return data
    },
    get_item: async function(items, pos){
        var ret = null;
        items.forEach(function(item){
//            console.log(item.id );
            if(item.id == pos){
                ret = item
            }
        });
        return ret
    },
    delete_item(items ,pos){
        var data =[]
        items.forEach(function(item ){
//                console.log(item.id );
            if(item.id == pos){
                item.deleted = 1
            }
            data.push(item)                        
        });
        return data
    },
    update_item(items ,pos , row ){
        var data =[]
        items.forEach(function(item ){
//                console.log(item.id );
            if(item.id == pos){
                item = row
            }
            data.push(item)                        
        });
        return data
    },
    /*
    convert_add_item:function(items, data){
       items.unshift(data)
       return items;
    },
    */

}
