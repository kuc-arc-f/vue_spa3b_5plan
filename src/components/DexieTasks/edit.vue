<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/dexie_tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>Tasks - edit</h3>        
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
        <button v-on:click="update_item(id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="delete_item(id);"
             class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(this.sysConst.DEXIE_DB_STORE );         
        this.get_item( this.id )        
    },
    data() {
        return {
            id: 0,
            tasks: [],
            title:'',
            content:'',
        }
    },
    methods: {
        async get_item(id){
            const item = await db.tasks.get(id);
            this.title = item.title
            this.content = item.content                     
            console.log(item);                          
        }, 
        addd_item(){
            var task = {
                title: "edit-tile-1",
                content: "edit-content-1",
                created_at: new Date(),
            }
console.log( task )
            db.tasks.add( task)            
        },       
        update_item(task_id){
console.log( this.title )
//console.log( id )
            db.tasks.update(parseInt(task_id) , {
                title: this.title,
                content: this.content,
            });
            this.$router.push('/dexie_tasks')
        },        
        delete_item(id){
console.log( id )
            db.tasks.delete(parseInt(id) );
            this.$router.push('/dexie_tasks')
        },
    }
}
</script>
