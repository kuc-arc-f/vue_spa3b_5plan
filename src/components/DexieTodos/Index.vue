<template>
    <div class="task_index_wrap">
        <FlashMessage></FlashMessage>
        <h3>Todos</h3>
        <p style="color :gray;">IndexedDB - todos</p>
        <hr class="mt-2 mb-2" />
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-6">
                <router-link :to="'/dexie_todos/new/'" class="btn btn-primary">Create</router-link>
            </div>
            <div class="col-sm-6" style="text-align: right;">
                <a id="download" href="" download="todos.json" class="btn btn-outline-primary btn-sm"
                v-on:click="export_todo()">Export
                </a>                
                &nbsp;&nbsp;                
                <a href="" v-on:click="move_action('/dexie_todos/import');"
                    class="btn btn-outline-primary btn-sm">Import
                </a>
            </div>
        </div>
        <!--
        <router-link :to="'/dexie_todos/new/'" class="btn btn-primary">Create
        </router-link>
        -->
        <hr class="mt-2 mb-2" />
        <div v-if="complete==0">
            <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active">未完了</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-on:click="set_complete(1)">完了済</a>
            </li>
            </ul>
        </div>
        <div v-else>
            <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" v-on:click="set_complete(0)">未完了</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active">完了済</a>
            </li>
            </ul>              
        </div>         
        <table class="table">
        <tbody v-for="todo in todos" v-bind:key="todo.id">
        <tr>
            <td>
                <h3>
                <router-link :to="'/dexie_todos/show/' + todo.id">{{ todo.title }}</router-link>
                </h3>
                {{ todo.created_at }} , ID : {{ todo.id }}
                 &nbsp; &nbsp;
                <router-link :to="'/dexie_todos/edit/' + todo.id"
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
                    <a  href='https://github.com/kuc-arc-f/vue_spa3b_2todo'>
                        https://github.com/kuc-arc-f/vue_spa3b_2todo
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/indexed_db_2todo'>
                        https://knaka0209.hatenablog.com/entry/indexed_db_2todo
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
        this.get_items(0)
    },
    data () {
        return {
            todos: [],
            items_org: [],
            complete : 0,
        }
    },
    methods: {
        async get_items(value){
            var data = []
            await db.todos.where({complete: value }).each(function (item) {
//                console.log(item);
                data.push( item )
            }).catch(function (error) {
                console.error(error);
            });
            this.todos = LibDexie.get_reverse_items(data)
            var self = this
            db.todos.toArray().then(function ( data ) {
                self.items_org = data
            });            
//console.log( data )
        },
        set_complete(value) {
            this.complete = value
            this.get_items(value)
        },
        export_todo: function(){
console.log(this.items_org )
            var content = JSON.stringify( this.items_org );
            var blob = new Blob([ content ], { "type" : "application/json" });
            var fname = "todos.json"
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
