<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/index_tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <div class="form-group">
            <label for="TopicTitle">Title :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-6">
                <textarea class="form-control" id="content" rows="3"
                v-model="content"></textarea>
            </div>
        </div>
        <hr />        
        <button v-on:click="update_item(tasks, task_id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="delete_item(tasks, task_id);"
             class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
import DbFunc from '@/libs/DbFunc';

//
export default {
    mixins:[Mixin],
    created() {
        localforage.config({
            name:  this.sysConst.INDEX_DB_NAME,
        });        
        this.get_init_items()
        //console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            task_id :  this.$route.params.id,
            tasks: [],
            title:'',
            content:'',
            key_name : "tasks", 
        }
    },
    methods: {
        async get_init_items(){
            try {
                const value = await localforage.getItem( this.key_name );
                if(value != null){
//                    console.log(value);
                    this.tasks = DbFunc.get_init_items(value)
                    this.get_item( this.$route.params.id );
                }
            } catch (err) {
                console.log(err);
            }            
        },        
        async get_item(id) {
            var item = await DbFunc.get_item( this.tasks , id )
            console.log(item);
            this.title = item.title
            this.content = item.content            
        },
        async update_item(items  ,id){
            var item = await DbFunc.get_item( items , id )
            item.title = this.title
            item.content = this.content
             this.tasks = DbFunc.update_item(items ,id , item )
// console.log( this.tasks );
            await localforage.setItem(this.key_name , this.tasks )
            this.$router.push('/index_tasks')
        },        
        async delete_item(items ,id){
// console.log(id);
            this.tasks = DbFunc.delete_item(items , id)
            await localforage.setItem(this.key_name , this.tasks )
            this.$router.push('/index_tasks')
        },        
    }
}
</script>
