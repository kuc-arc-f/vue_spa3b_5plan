<template>
    <div>
        <router-link :to="'/idx_mdat'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>Chart</h3>
        <hr />
        <LineChart  />      
        <hr />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
//import LibCommon from '@/libs/LibCommon';
import LibMdats from '@/libs/LibMdats';
import LineChart from '@/components/IndexMdats/LineChart';

var db = null
var TIME_INIT_STR = "T00:00:00.000Z"
//
export default {
    mixins:[Mixin],
    components: { LineChart },
    created() {
        var ApppConst = LibMdats.get_const()
//console.log( ApppConst.DB_STORE );
        db = new Dexie( ApppConst.DB_NAME );
        db.version( ApppConst.DB_VERSION).stores( ApppConst.DB_STORE ); 

        var month_str = this.get_init_param()
        if(month_str != null){
            month_str = month_str + "-01" +  TIME_INIT_STR
            this.now_month = new Date(month_str) 
            this.after_month = LibMdats.get_after_month( this.now_month.toString())
console.log( this.now_month )
console.log( this.after_month )
            this.get_item()                 
        }
    },
    data: function( ) {
        return {
            title:'',
            content:'', 
            create : '', 
            now_month : null,
            after_month : null,
        }
    },
    methods: {
        async get_item(){
            var data = []
            await db.mdats.where("m_date").between(this.now_month , this.after_month , true, false)
            .each(function (item) {
//                console.log(item);
                data.push( item )
            }).catch(function (error) {
                console.error(error);
            });  
            data = LibMdats.convert_items(data)  
            var items = this.convert_chart_arr(data)   
            this.$store.commit('set_mdat_items',  {'mdat_items' : items }  )                    
        },
        convert_chart_arr:function ( items ){
            var hnum = []
            var lnum = []
            var lbl = []
            items.forEach( function (item) {
        //console.log( item );    
                lbl.push( item.m_date )                
                hnum.push( item.hnum )                
                lnum.push( item.lnum )                
            });
            var ret= {
                "lbl" : lbl,
                "hnum" : hnum,
                "lnum" : lnum,
            }
            return ret;
        }, 
        get_init_param: function(){
            var ret= ""
            var dat = this.get_exStorage( this.sysConst.KEY_MDAT_MONTH )
            if(dat.length > 0){
//                console.log(dat[0])
                ret = dat[0].now_month
            }
            return ret
        },       
    }
}
</script>


