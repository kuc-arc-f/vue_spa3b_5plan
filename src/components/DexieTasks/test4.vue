<template>
    <div>
        <h1>DoxieTasks- test3:</h1>
        <hr />
        <button v-on:click="update_item(2);"> [ Update ] 
        </button>        
        <hr />
        <button v-on:click="get_item(1);"> [ show ] 
        </button>        
        <hr />
        <button v-on:click="delete_item(4);"> [ delete ] 
        </button>        
        <hr />
        <ul v-for="item in items" v-bind:key="item.id">
            <li>
                ID : {{ item.id }} / 
                name : {{ item.title }} / 
                content : {{ item.content }} / 
            </li>
        </ul>
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
//import LibDexie from '@/libs/LibDexie';
import Dexie from 'dexie';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
//console.log(this.sysConst.DEXIE_DB_VERSION)
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
                this.sysConst.DEXIE_DB_STORE );        
        this.add_item()
        this.get_items()
    },
    data() {
        return {
            items : [],
            db : null,
        }
    },
    methods: {
        get_items(){
            var self = this
            db.tasks.toArray().then(function (items ) {
                self.items = items
            });
        },
        add_item(){
            var task = {
                title: "tile-1",
                content: "content-1",
                created_at: new Date(),
            }
            db.tasks.add( task)
        },
        async get_item(id){
            const data = await db.tasks.get(id);
            console.log('data: ', data)       
        },
        update_item(id){
            db.tasks.update(id, {
                title: 'chage-123',
            });
        },
        delete_item(id){
            db.tasks.delete(id);
        },

    }
}
</script>

