/* LibMdats */

//import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "mdats_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
                mdats: '++id, m_date, hnum, lnum ,created_at',
            }
        }
    },
    convert_items: function(items){
        var data =[]
        items.forEach(function(item){
            var m_date = LibCommon.formatDate(item.m_date, 'YYYY-MM-DD')
            item.m_date = m_date
//console.log(item.m_date )
            data.push(item)                        
        });        
        return data
    },
    get_before_month: function(date_str){
        var date = new Date(date_str);
        date.setMonth( date.getMonth() -1);
        return date
    },
    get_after_month: function(date_str){
        var date = new Date(date_str);
        date.setMonth( date.getMonth() +1);
        return date
    },
    get_csv_items: function( items ){
        var ret = ""

        var data = "date,Height,Low" +'\r\n'
        items.forEach(function(item){
            data += item.m_date + ','
            data += item.hnum + ','
            data += item.lnum + ',\r\n'
//console.log(item.m_date )
        });        
        ret = data
        return ret
    },    
    convertCSVtoArray :function(str){
        var result = [];
        var tmp = str.split("\n"); // 改行を区切り文字
        for(var i=0;i<tmp.length;++i){
            var row = tmp[i].split(',');
//            console.log(row.length );
            if(i > 0 && row.length >= 3 ){
                result.push( row )
            }
        }
        return result
    }
         
}
