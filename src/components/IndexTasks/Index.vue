<template>
    <div class="task_index_wrap">
        <FlashMessage></FlashMessage>
        <h3>IndexTasks</h3>
        <hr class="mt-2 mb-2" />
        <router-link :to="'/index_tasks/new/'" class="btn btn-primary">Create</router-link>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="task in tasks" v-bind:key="task.id">
            <li>
                <router-link :to="'/index_tasks/show/' + task.id">{{ task.title }}</router-link>
                &nbsp;&nbsp;
                <router-link :to="'/index_tasks/edit/' + task.id" class="btn btn-outline-primary btn-sm">Edit
                </router-link>
                <br />
                ID : {{ task.id }}
            </li>
        </ul>
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href=' '> 
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href=' '>
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
import * as localforage from 'localforage'
import DbFunc from '@/libs/DbFunc';
//
export default {
    mixins:[Mixin],
    components: { FlashMessage },
    created () {
        localforage.config({
            name:  this.sysConst.INDEX_DB_NAME,
        });        
// console.log( this.sysConst.URL_BASE )
        this.get_init_items()
    },
    data () {
        return {
            tasks: [],
            key_name : "tasks",
        }
    },
    methods: {
        async get_init_items(){
            try {
                const value = await localforage.getItem( this.key_name );
                if(value != null){
                    this.tasks = DbFunc.get_init_items(value)
                    //console.log( this.tasks );
                    //this.tasks = value
                }
            } catch (err) {
                console.log(err);
            }            
        },        
    }
}
</script>
