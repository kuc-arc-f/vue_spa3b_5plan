<template>
    <div>
        <router-link :to="'/idx_mdat'" class="btn btn-outline-primary mt-2">Back
        </router-link>   
        <hr class="mt-2 mb-2" />     
        <h3>Mdats- CSV import: {{ month }} </h3>
        <p>当月の １カ月分のみ。正しくインポート可能です。
        </p>
        <hr />
        <p>select , CSV file
        </p>
        <div><input type="file" id="file1" class="btn btn-outline-primary">
        </div>
        <hr />
        <div class="loading hide"></div>
        <h3 id="complete_msg" 
        style="color: green; display: none;">
         Complete , import data !! {{ month }}
        </h3>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import $ from 'jquery'
import LibMdats from '@/libs/LibMdats';

var TIME_INIT_STR = "T00:00:00.000Z"
var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        var self = this
        window.addEventListener("load", function() {
            window.document.getElementById("file1").addEventListener("change", function() {
                self.change_proc()
            });
        });
        this.month = this.get_init_param()
        var month_str = this.month
        if(month_str != null){
            month_str = month_str + "-01" +  TIME_INIT_STR
            this.now_month = new Date(month_str) 
            this.after_month = LibMdats.get_after_month( this.now_month.toString())
console.log( this.now_month )
console.log( this.after_month )
        }        
//console.log( month )
        if( this.month == null){
            alert("Error, month data nothing.")
        }
        var config = LibMdats.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE ); 
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            data1 : "",
            month : "",
            now_month : null,
            after_month : null,            
        }
    },
    methods: {
        change_proc: function(){
            if( this.month == null){
                alert("Error, month data nothing.")
                return 
            }
            console.log("#-change_proc")
            $('.loading').removeClass('hide');
            var self = this
            var files = window.document.getElementById('file1').files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log("i: " + i );                
                console.log("Name: " + file.name);
                console.log("Size: " + file.size);
                console.log("Type: " + file.type);
                console.log("Date: " + file.lastModified);
                console.log("Date: " + file.lastModifiedDate);
                if ( file.name.match(/.csv/) == null ){
                    alert("Error、csvファイルを指定下さい。")
                     $('.loading').addClass('hide');
                    return false
                }
                var reader = new FileReader();
                reader.onload = async function(evt) {
                    console.log("State: " + evt.target.readyState);
                    var result =evt.target.result;
                    self.delete_month_data( result )
//console.log(result);
                };
                reader.onerror = function(evt) {
                    console.log(evt.target.error.name);
                };
                reader.readAsText(file, "utf-8");             
            }            
        },
        delete_month_data: async function(  add_items ){
            console.log( this.month )
            var data = []
            await db.mdats.where("m_date").between(this.now_month , this.after_month , true, false)
            .each(function (item) {
                data.push( item )
            }).catch(function (error) {
                console.error(error);
            });    
            await data.forEach(function(item){
//            console.log( item.id  )
                db.mdats.delete( item.id );
            });            
            this.add_csv( add_items )
        },
        add_csv:async function( data){
            var items = LibMdats.convertCSVtoArray( data )
            var col_date = 0
            var col_hum = 1
            var col_lum = 2
            await items.forEach(function(item){
                var m_date = item[ col_date ] +  TIME_INIT_STR
                var item_hnum = parseInt(item[ col_hum ])
                var item_lnum = parseInt(item[ col_lum ])
// console.log( m_date )
                var task = {
                    m_date: new Date( m_date ),
                    hnum: item_hnum,
                    lnum: item_lnum,
                    created_at: new Date(),
                }
                db.mdats.add( task)
            });
            setTimeout(function () {
                $('#complete_msg').css('display','inherit');
                $('.loading').addClass('hide');
                alert("Complete ,import CSV data success.");
                console.log("# timer.cb")
            }, 1000) 
        },
        move_action: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , "/idx_mdat" )
            window.location.href = this.sysConst.HTTP_URL
        },
        get_init_param: function(){
            var ret= ""
            var dat = this.get_exStorage( this.sysConst.KEY_MDAT_MONTH )
            if(dat.length > 0){
                ret = dat[0].now_month
            }
            return ret
        },                               

    }
}
</script>
<!-- -->
<style>
.hide {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  background-image: url(/img/load_img.gif);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: 88px 88px;
}
</style>
