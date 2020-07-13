<template>
    <div class="flex-center position-ref full-height">
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4">
                <h3>Plan : {{ month_str }}</h3>
            </div>
            <div class="col-sm-5">
                <button v-on:click="move_before()" class="btn btn-outline-primary">
                    <i class="fas fa-arrow-circle-left"></i> Before
                </button>
                &nbsp;&nbsp;
                <button v-on:click="move_next()" class="btn btn-outline-primary">Next
                    <i class="fas fa-arrow-circle-right"></i>
                </button>
            </div>
            <div class="col-sm-3" style=" text-align: right;">
                <router-link :to="'/idx_plan/new/'" class="btn btn-primary mb-2">Create
                </router-link>
                &nbsp;&nbsp;                
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <a id="download" href="" download="plans.json" class="btn btn-outline-primary btn-sm"
        v-on:click="export_plan()">Export
        </a>                
        &nbsp;&nbsp; 
        <a href="" v-on:click="move_action('/idx_plan/import');"
            class="btn btn-outline-primary btn-sm">Import
        </a>                
        <!--
        <button v-on:click="test1()">[ test1 ]</button><br />
            -->
        <table class="table table-bordered mt-2">
            <tr>
                <th style="color :red;">日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th style="color :blue;">土</th>
            </tr>      
            <tbody v-for="week in weeks" v-bind:key="week.no">
                <tr>
                    <td v-for="(day, index) in week.weekItem" v-bind:key="index"
                    class="td_cls" >
                        <span v-if="day.db_none==0">
                            <router-link :to="'/idx_plan/show/' + day.id">
                                <div>{{ day.day_disp }}
                                    <p class="content_text">{{ day.content }}</p>
                                </div>
                            </router-link>
                            <router-link :to="'/idx_plan/edit/' + day.id" class="btn btn-outline-primary btn-sm td_edit">
                                Edit <i class="far fa-edit"></i>
                            </router-link>
                        </span>
                        <span v-else>
                            <span v-if="day.today==1">
                                <span class="today">
                                    {{ day.day_disp }} 
                                </span>
                            </span>
                            <span v-else>
                                {{ day.day_disp }}<br />
                            </span>
                            <br />
                            <br />
                        </span>                    
                    </td>
                </tr>
            </tbody>      

        </table>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibPlan from '@/libs/LibPlan';
import moment from 'moment'

var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        var config = LibPlan.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );          
        //
        var dt = moment( )
        this.weeks = LibPlan.get_week_items( dt )   
        this.month = dt
        this.month_str = dt.format('YYYY-MM')
        this.get_items( dt )   
// console.log( this.month_str )
    },
    data() {
        return {
            weeks :[],
            plans : [],
            month : null,
            month_str : "",
            items_org : [],
        }
    },
    methods: {
        test1(){
            LibPlan.test1()
        },
        change_month: function(dt){
            this.weeks = LibPlan.get_week_items( dt )   
            this.month = dt
            this.month_str = dt.format('YYYY-MM')
        },
        move_before: function(){
            var sub = this.month.add(-1, 'month').startOf('month')
            this.change_month(sub)
            this.get_items(sub)
//console.log( sub.toDate() )
        },
        move_next: function(){
            var sub = this.month.add(1, 'month').startOf('month')
            this.change_month(sub)
            this.get_items(sub)
//console.log( sub.toDate() )
        },
        get_items:async function(target_month){
            var dt = moment( target_month.format("YYYY-MM-DD") )
            var start = dt.startOf('month')
            dt = moment( target_month.format("YYYY-MM-DD") )
            var end = dt.add(1, 'month').startOf('month')
            var start_str = start.format("YYYY-MM-DDTHH:mm:ss")
            var end_str = end.format("YYYY-MM-DDTHH:mm:ss")
//console.log( new Date(start_str) )
//console.log( new Date(end_str) )
            var ret = []
            await db.plans.where("p_date")
            .between(new Date(start_str), new Date(end_str), true, false)
            .each(function (item) {
                ret.push( item )
            }).catch(function (error) {
                console.error(error);
            });  
            this.weeks = LibPlan.convert_week_array( this.weeks, ret ,moment() )
            //
            var self = this
            await db.plans.toArray().then(function ( data ) {
                self.items_org = data
            });            
// console.log( self.items_org )
        },
        export_plan: function(){
//console.log(this.items_org )
            var content = JSON.stringify( this.items_org );
            var blob = new Blob([ content ], { "type" : "application/json" });
            var fname = "plans.json"
            if (window.navigator.msSaveBlob) { 
                //console.log("#-msSaveBlob")
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                //console.log("#-msSaveBlob-false")
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }            
        },
        move_action: function( action  ){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , action )
            window.location.href = "/"            
        },        

    }
}
</script>
<!-- -->
<style>
.today{
    /* background : #B3E5FC; */
    color : green;
    font-weight: bold; 
    font-size: 1.2rem;
}
.table .td_cls{
    width : 80px;
    min-height : 60px;
}
.table .content_text{
    color : gray;
    font-size : 11pt;
    margin : 8px 0px;
}
.table .td_edit{
    font-size : 11pt;
    /*     margin : 8px: 8px; */
}
.table th{
    text-align: center;
    padding: 8px;
}
#month{
    width : 180px;
}
.month_move_wrap .fa-arrow-circle-left{
    /* font-size : 2.2rem; */
    font-size : 1.8rem;
}
.month_move_wrap .fa-arrow-circle-right{
    font-size : 1.8rem;
}
</style>
