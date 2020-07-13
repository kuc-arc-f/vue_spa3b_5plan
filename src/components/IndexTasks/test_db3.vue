<!-- 
CRUD 機能 、db実装
-->
<template>
    <div>
        <h1>test_db3.vue</h1>
        <hr />
        <ul>
            <li v-for="(item, i) in items" :key="i">
                no ={{ i }}/
                {{ item.id }} / 
                {{ item.name }} / 
                {{ item.addr }} /
                ct= {{ item.count }}
            </li>
        </ul>
        <hr />
        <button v-on:click="add_item_btn();"> [ add ] 
        </button>
        <hr />
        <button v-on:click="get_item(2);"> [ show ] 
        </button>
        <hr />
        <button v-on:click="delete_item(items, 0);"> [ delete ] 
        </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
localforage.config({
  name: 'test_idx_db3',
});
//
export default {
    mixins:[Mixin],
    created() {
        this.get_storage()
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            child_data : "hoge",
            data1 : "",
            items : [],
            item : null,
            key_name : "users",
        }
    },
    methods: {
        async add_item_btn(){
            var d = this.add_item()
console.log(d);
        },
        add_item(){
            try {
                var items = this.items;
                var data =  {
                     "id": this.items.length + 1, "name": "Yamada-99", "age": 18, "addr": "Tokyo",
                     "count":  this.items.length + 1,
                }
                //unshift
                items.unshift(data)
                this.items = items
                localforage.setItem(this.key_name , this.items )
                return this.items
            } catch (err) {
                console.log(err);
            }                        
        },
        async get_storage(){
            try {
                const value = await localforage.getItem( this.key_name );
                if(value != null){
//                    console.log(value);
                    this.items = value
                    /*
                    this.items.sort(function (a, b) {
                        if (a.count < b.count) {
                            return -1;
                        }
                        if (a.count > b.count) {
                            return 1;
                        }
                        return 0
                    });
                    */
                }
            } catch (err) {
                console.log(err);
            }            
        },
        async get_item(pos){
            await localforage.getItem(this.key_name, function(err, value) {
//                console.log(value);
                value.forEach(function(item, idx){
                    if(idx == pos){
                        console.log(item );
                    }
                });
            });            
        },
        async delete_item(items ,pos){
console.log(items );
console.log(pos );
            var data =[]
            items.forEach(function(item, idx){
                if(idx != pos){
                    data.push(item)                        
                }
            });
            this.items = data
            await localforage.setItem(this.key_name , this.items )
            console.log(data);
        },
        delete_db(){
            var reqDelete = indexedDB.deleteDatabase("test_idx_db1");
            reqDelete.onsuccess = function() {
                console.log("#-delete_db")
            };
            reqDelete.onerror = function(e) {
                console.log(e)
            };
//            reqDelete.onblocked = function(e) {};            
        },
    }
}
</script>

