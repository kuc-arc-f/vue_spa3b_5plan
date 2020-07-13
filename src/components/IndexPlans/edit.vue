<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/idx_plan'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>Tasks - edit</h3>        
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-8">
                <textarea class="form-control" id="content" rows="8"
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

<!-- -->
<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibPlan from '@/libs/LibPlan';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        var config = LibPlan.get_const()
//console.log( ApppConst.DB_STORE );
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );          
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
            const item = await db.plans.get(id);
            this.content = item.content                     
            console.log(item);                          
        }, 
        update_item(task_id){
//console.log( this.title )
            db.plans.update(parseInt(task_id) , {
                content: this.content,
            });
            this.$router.push('/idx_plan')
        },        
        delete_item(id){
//console.log( id )
            db.plans.delete(parseInt(id) );
            this.$router.push('/idx_plan')
        },
    }
}
</script>
