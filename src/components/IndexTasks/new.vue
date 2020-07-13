<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/index_tasks'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <h3>IndexTasks - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Title : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="title" required="required" />
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
            <button v-on:click="createTask" class="btn btn-primary mt-2">Save
            </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
// import axios from 'axios'

//
export default {
    mixins:[Mixin],
    created() {
        localforage.config({
            name:  this.sysConst.INDEX_DB_NAME,
        });   
        this.get_init_items()     
// console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            tasks : [],
            title:'',
            content:'',
            key_name : "tasks",            
        }
    },
    methods: {
        async createTask() {
            try {
                var items = this.tasks;
                var task = {
                    "id": this.tasks.length + 1,
                    'title': this.title,
                    'content': this.content,
                    'deleted': 0,
                };
                items.unshift(task)
                this.tasks = items
                await localforage.setItem(this.key_name , items )
                this.$router.push('/index_tasks')
            } catch (err) {
                console.log(err);
            }                  
        },
        async get_init_items(){
            try {
                const value = await localforage.getItem( this.key_name );
                if(value != null){
//                    console.log(value);
                    this.tasks = value
                }
            } catch (err) {
                console.log(err);
            }            
        },         
    }
}
</script>
