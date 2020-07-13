<template>
    <div>
        <h1>DoxieTasks- test3:</h1>
        <hr />
        <button v-on:click="update_item(2);"> [ Update ] 
        </button>        
        <hr />
        <button v-on:click="get_item(6);"> [ show ] 
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
import LibDexie from '@/libs/LibDexie';

//
export default {
    mixins:[Mixin],
    created() {
          this.db = LibDexie.init_proc()
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
        add_item(){
            var task = {
                title: "tile-1",
                content: "content-1",
                created_at: new Date(),
            }
            this.db.tasks.add( task)
        },
        get_items(){
            var self = this
            this.db.tasks.toArray().then(function (items ) {
                self.items = items
//                console.log( items )
            });
        },
        async get_item(id){
            const data = await this.db.tasks.get(id);
            console.log('data: ', data)       
        },
        update_item(id){
            this.db.tasks.update(id, {
                title: 'chage-123',
            });
        },
        delete_item(id){
            this.db.tasks.delete(id);
        },

    }
}
</script>

