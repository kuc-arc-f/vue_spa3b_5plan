<template lang="html">
    <div class="todos_create_wrap">
            <router-link :to="'/dexie_todos'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <h3>DexieTodos - new</h3>
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
                <div class="col-sm-10">
                    <textarea class="form-control" id="content" rows="10"
                     v-model="content"></textarea>
                </div>
            </div>
            <hr />
            <button v-on:click="add_item();" class="btn btn-primary mt-2">Save
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
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(this.sysConst.DEXIE_DB_STORE );                 
    },
    data() {
        return {
            title:'',
            content:'',
        }
    },
    methods: {
        add_item(){
            var task = {
                title: this.title,
                content: this.content,
                complete: 0,
                created_at: new Date(),
            }
            db.todos.add( task)
            this.$router.push('/dexie_todos')            
        },
    }
}
</script>
