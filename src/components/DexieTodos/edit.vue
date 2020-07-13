<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/dexie_todos'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>Todos - edit</h3>        
        <div class="form-group">
            <label for="TopicTitle">Title :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="content" rows="10"
                v-model="content"></textarea>
            </div>
        </div>
        <hr />        
        <button v-on:click="update_item(id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <div v-if="complete==0">
            <button v-on:click="set_complete(1);" class="btn btn-outline-success" >完了登録</button>
        </div>
        <div v-else>
            <button v-on:click="set_complete(0);" class="btn btn-outline-success" >未完に戻す</button>            
        </div>
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
            title:'',
            content:'',
            complete : 0,
        }
    },
    methods: {
        async get_item(id){
            const item = await db.todos.get(id);
            this.title = item.title
            this.content = item.content  
            this.complete = item.complete                   
            console.log(item);                          
        }, 
        update_item(task_id){
console.log( this.title )
//console.log( id )
            db.todos.update(parseInt(task_id) , {
                title: this.title,
                content: this.content,
            });
            this.$router.push('/dexie_todos')
        },   
        set_complete:  function (value){
console.log( value )
            db.todos.update(parseInt(this.id) , {
                complete : value
            });
            this.$router.push('/dexie_todos')
        },     
        delete_item(id){
console.log( id )
            db.todos.delete(parseInt(id) );
            this.$router.push('/dexie_todos')
        },
    }
}
</script>
