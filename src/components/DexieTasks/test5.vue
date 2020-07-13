<template>
<!-- dexiie.js test -->
    <div>
        <h1>DoxieTasks- test5:</h1>
        <hr />
        <button v-on:click="add_item();"> [ add ] 
        </button>        
        <hr />
        <button v-on:click="get_item(1);"> [ get_item ] 
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
import Dexie from 'dexie';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        db = new Dexie("friend_database");
        db.version(1).stores({
            friends: '++id, name, shoeSize',              
        });
    },
    data() {
        return {
            items : [],
            db : null,
        }
    },
    methods: {
        add_item(){
            // 
            var item = {name: "Nicolas", shoeSize: 8}
            db.friends.add( item )
        },
        async get_item(id){
            const data = await db.friends.get(id);
            console.log('data: ', data)       
        },
        /*
        update_item(id){
            db.tasks.update(id, {
                title: 'chage-123',
            });
        },
        delete_item(id){
            db.tasks.delete(id);
        },
        */

    }
}
</script>

