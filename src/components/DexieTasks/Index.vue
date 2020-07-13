<template>
    <div class="task_index_wrap">
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>Tasks</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/dexie_tasks/new/'" class="btn btn-primary">Create
                </router-link>
            </div>
            <div class="col-sm-4" style="text-align: right;">
                <a id="download" href="" download="tasks.json" class="btn btn-outline-primary btn-sm"
                v-on:click="export_task()">Export
                </a>                
                &nbsp;&nbsp;
                <!--
                <router-link :to="'/dexie_tasks/import'" class="btn btn-outline-primary btn-sm">Import
                </router-link>
                -->
                <a href="" v-on:click="move_action('/dexie_tasks/import');"
                    class="btn btn-outline-primary btn-sm">Import
                </a>                 
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="task in tasks" v-bind:key="task.id">
            <li>
                <router-link :to="'/dexie_tasks/show/' + task.id">{{ task.title }}</router-link>
                &nbsp;&nbsp;
                <router-link :to="'/dexie_tasks/edit/' + task.id"
                 class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
                <br />
                ID : {{ task.id }}
                , {{ task.created_at }}
            </li>
        </ul>
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href='https://github.com/kuc-arc-f/vue_spa3b_1crud'>
                        https://github.com/kuc-arc-f/vue_spa3b_1crud 
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/indexed_db_1'>
                        https://knaka0209.hatenablog.com/entry/indexed_db_1
                    </a><br />
                </li>
            </ul>
        </div>        
    </div>
</template>

<!-- -->
<style> 
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
import LibDexie from '@/libs/LibDexie';

var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage },
    created () {
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
                this.sysConst.DEXIE_DB_STORE );        
        this.get_items()
    },
    data () {
        return {
            tasks: [],
            items_org: [],
        }
    },
    methods: {
        get_items(){
            var self = this
            db.tasks.toArray().then(function (items ) {
                self.tasks = LibDexie.get_reverse_items(items)
                //console.log( items )
            });
            db.tasks.toArray().then(function ( data ) {
                self.items_org = data
            });            
        },
        export_task: function(){
//console.log(this.items_org )
            var content = JSON.stringify( this.items_org );
            var blob = new Blob([ content ], { "type" : "application/json" });
            var fname = "tasks.json"
            if (window.navigator.msSaveBlob) { 
                console.log("#-msSaveBlob")
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                console.log("#-msSaveBlob-false")
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }            
        },
        move_action: function( action  ){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , action )
            window.location.href = this.sysConst.HTTP_URL
        },                
    }
}
</script>
