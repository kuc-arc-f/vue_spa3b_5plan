<template>
    <div class="task_index_wrap">
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>Mdats</h3>
            <p class="mb-0" style="color: gray;">IndexedDB - measurement data
            </p>
            </div>
            <div class="col-sm-4" >
                <div class="btn_center_wrap mt-3">
                    <router-link :to="'/idx_mdat/new/'" class="btn btn-primary">Create
                    </router-link>
                    &nbsp;&nbsp;
                    <router-link :to="'/idx_mdat/chart/'" class="btn btn-outline-primary">Chart
                    </router-link>
                </div>
            </div>
            <div class="col-sm-4" style="text-align: center;">
                <div class="btn_right_wrap mt-3">
                    <a id="download" href="" download="mdats.json" class="btn btn-outline-primary btn-sm"
                    v-on:click="export_task()">Export
                    </a>                
                    &nbsp;&nbsp;
                    <a href="" v-on:click="move_action('/idx_mdat/import');"
                        class="btn btn-outline-primary btn-sm">Import
                    </a>  
                    <br />
                    <div class="btn-group mt-2 mb-2" >
                        <button type="button" class="btn btn-sm btn-outline-primary dropdown-toggle"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            CSV <i class="fas fa-bars"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a id="download_csv" href="" download="mdats.csv" class="dropdown-item"
                            v-on:click="export_csv()">
                                CSV Export
                            </a>
                            <div class="dropdown-divider"></div>                            
                            <a href="" v-on:click="move_action('/idx_mdat/import_csv');"
                                class="dropdown-item">CSV Import 
                            </a>

                        </div><!-- /.dropdown-menu -->                        
                    </div><!-- /.btn-group -->	
                </div>
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <div class="month_move_wrap" style="text-align: center; font-size : 1.2rem;">
            <button v-on:click="change_month_before()" class="btn btn-outline-primary">
                <i class="fas fa-arrow-circle-left"></i>
            </button>&nbsp;            
            <label>
                <input type="month" id="month" name="month" v-model="now_month_title"   />
            </label>
            &nbsp;  
            <button v-on:click="change_month_center()" class="btn btn-outline-primary btn-sm">
                change
            </button>&nbsp;    
            <button v-on:click="change_month_after()" class="btn btn-outline-primary">
                <i class="fas fa-arrow-circle-right"></i>
            </button>&nbsp; 

        </div>
        <table class="table">
        <thead>
            <th>ID</th>
            <th>Date</th>
            <th>Hight</th>
            <th>Low</th>
            <th>Action</th>
            <!-- 
            <th>削除</th>
            -->
        </thead>            
        <tbody v-for="mdat in mdats" v-bind:key="mdat.id">
        <tr>
            <td>{{ mdat.id }}
            </td>
            <td>{{ mdat.m_date }}
            </td>
            <td>{{ mdat.hnum }}
            </td>
            <td>{{ mdat.lnum }}
            </td>
            <td>
                <router-link :to="'/idx_mdat/edit/' + mdat.id"
                    class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
            </td>            
        </tr>        
        </tbody>
        </table>
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href='https://github.com/kuc-arc-f/vue_spa3b_4mdats'>
                        https://github.com/kuc-arc-f/vue_spa3b_4mdats
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/indexed_db_4mdats'>
                        https://knaka0209.hatenablog.com/entry/indexed_db_4mdats
                    </a><br />
                </li>
            </ul>
        </div>        
    </div>
</template>

<!-- -->
<style> 
#month{
    width : 180px;
}
.month_move_wrap .fa-arrow-circle-left{
    font-size : 1.4rem;
}
.month_move_wrap .fa-arrow-circle-right{
    font-size : 1.4rem;
}
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
import FlashMessage from '../../components/Layouts/FlashMessage'
import Dexie from 'dexie';
import LibMdats from '@/libs/LibMdats';
import LibCommon from '@/libs/LibCommon';

var TIME_INIT_STR = "T00:00:00.000Z"
var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage },
    created () {
        var AppConst = LibMdats.get_const()
        db = new Dexie( AppConst.DB_NAME );
        db.version( AppConst.DB_VERSION).stores( AppConst.DB_STORE );  
        var month_str = LibCommon.formatDate( new Date() , 'YYYY-MM')
        this.set_chart_param( month_str )
        month_str = month_str + "-01" +  TIME_INIT_STR
        this.now_month = new Date(month_str) 
        this.now_month_title = LibCommon.formatDate( this.now_month , 'YYYY-MM')     
        this.before_month = LibMdats.get_before_month( this.now_month.toString())
        this.after_month = LibMdats.get_after_month( this.now_month.toString())
//console.log( this.after_month )
        this.get_items()
    },
    data () {
        return {
            mdats: [],
            items_org: [],
            now_month : null,
            before_month : null,
            after_month : null,
            now_month_title : ""
        }
    },
    methods: {
        get_items: async function(){
            var start_month = LibCommon.formatDate( this.now_month , 'YYYY-MM')
            var end_month = LibCommon.formatDate( this.after_month , 'YYYY-MM')
            var start = start_month + "-01" +  TIME_INIT_STR
            var end = end_month + "-01" + TIME_INIT_STR

            var data = []
            await db.mdats.where("m_date")
            .between(new Date(start), new Date(end), true, false)
            .each(function (item) {
//                console.log(item);
                data.push( item )
            }).catch(function (error) {
                console.error(error);
            });  
            data = LibMdats.convert_items(data)
            this.mdats = data          
//console.log( data )
           var self = this
            db.mdats.toArray().then(function ( data ) {
                self.items_org = data
            });            
        },
        change_month_center: function(){
            var date = this.now_month_title + "-01" +  TIME_INIT_STR         
            this.now_month = new Date( date )
            this.after_month = LibMdats.get_after_month( this.now_month.toString())
            this.now_month_title = LibCommon.formatDate( this.now_month , 'YYYY-MM')
            this.set_chart_param( this.now_month_title )
console.log( this.now_month );   
            this.get_items()
        },
        change_month_before: function(){
            var date = this.now_month
            date.setMonth( date.getMonth() -1);
            this.now_month = date
            this.after_month = LibMdats.get_after_month( this.now_month.toString())
            this.now_month_title = LibCommon.formatDate( this.now_month , 'YYYY-MM')
            this.set_chart_param( this.now_month_title )
            this.get_items()
console.log( this.now_month_title );            
        },
        change_month_after: function(){
            var date = this.now_month
            date.setMonth( date.getMonth() +1);
            this.now_month = date
            this.now_month_title = LibCommon.formatDate( this.now_month , 'YYYY-MM')
            this.set_chart_param( this.now_month_title )
            this.after_month = LibMdats.get_after_month( this.now_month.toString())
            this.get_items()
console.log( this.now_month );            
        },
        export_task: function(){
//console.log(this.items_org )
            var content = JSON.stringify( this.items_org );
            var blob = new Blob([ content ], { "type" : "application/json" });
            var fname = "mdats.json"
            if (window.navigator.msSaveBlob) { 
                console.log("#-msSaveBlob")
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                console.log("#-msSaveBlob-false")
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }            
        },
        export_csv: function(){
            var content = LibMdats.get_csv_items( this.mdats )
// console.log( content )
            var blob = new Blob([ content ], { "type" : "text/csv" });
            var fname = "mdats.csv"
            if (window.navigator.msSaveBlob) { 
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                document.getElementById("download_csv").href = window.URL.createObjectURL(blob);
            }            
        },  
        move_action: function( action  ){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , action )
            window.location.href = this.sysConst.HTTP_URL
        },
        set_chart_param: function(month){
            var arr=[ {now_month : month } ]
            this.set_exStorage( this.sysConst.KEY_MDAT_MONTH, arr )
        },                
    }
}
</script>
