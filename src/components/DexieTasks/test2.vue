<template>
    <div>
        <h1>DoxieTasks- test2:</h1>
        <hr />
        <button v-on:click="update_item(5);"> [ add ] 
        </button>        
        <hr />
        <button v-on:click="delete_item(4);"> [ delete ] 
        </button>        
        <hr />
        <ul v-for="item in items" v-bind:key="item.id">
            <li>
                ID : {{ item.id }} / 
                name : {{ item.name }} / 
                age : {{ item.age }} / 
            </li>
        </ul>
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';

var db = new Dexie("friend_database");
db.version(2).stores({
//              friends: 'name,shoeSize'
    person2: '++id, name, age'
});
//
export default {
    mixins:[Mixin],
    created() {

          this.add_item()
          this.get_items()
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            child_data : "hoge",
            data1 : "",
            items : [],
        }
    },
    methods: {
        add_item(){
            db.person2.add({
                name: 'Camilla',
                age: 25,
            });
            db.person2.add({
                name: 'kotan',
                age: 41,
            });

        },
        get_items(){
            var self = this
            db.person2.toArray().then(function (items ) {
                self.items = items
            });
        },
        update_item(id){
            db.person2.update(id, {
                name: 'name-chage-123',
            });
        },
        delete_item(id){
            db.person2.delete(id);
        },

    }
}
</script>

