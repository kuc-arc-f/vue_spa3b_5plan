<!-- 
CRUD 機能 、db実装
外部JS へ、処理分割
-->
<template>
    <div>
        <h1>test_db4.vue</h1>
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
        <button v-on:click="add_item();"> [ add ] 
        </button>
        <hr />
        <button v-on:click="get_item(2);"> [ show ] 
        </button>
        <hr />
        <button v-on:click="delete_item(items, 1);"> [ delete ] 
        </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
import DbFunc from '@/libs/DbFunc';

//
export default {
    mixins:[Mixin],
    created() {
        localforage.config({
            name:  this.sysConst.INDEX_DB_NAME,
        });
        this.get_init_items()
    },
    data() {
        return {
            items : [],
            item : null,
            key_name : "users",
        }
    },
    methods: {
        /*
        async add_item_btn(){
            this.add_item()
        },
        */
        async add_item(){
            try {
                var items = this.items;
                var data =  {
                     "id": this.items.length + 1, "name": "Yamada-99", "age": 18, "addr": "Tokyo",
                     "count":  this.items.length + 1,
                }
                items.unshift(data)
                this.items = items
                await localforage.setItem(this.key_name , this.items )
            } catch (err) {
                console.log(err);
            }                        
        },
        async get_init_items(){
            try {
                const value = await localforage.getItem( this.key_name );
                if(value != null){
//                    console.log(value);
                    this.items = value
                }
            } catch (err) {
                console.log(err);
            }            
        },
        async get_item(pos){
            await localforage.getItem(this.key_name,async function(err, value) {
//                console.log(value);
                var item = await DbFunc.get_item(value, pos)
                console.log(item );
            });            
        },
        async delete_item(items ,pos){
            this.items = DbFunc.delete_item(items ,pos)
            await localforage.setItem(this.key_name , this.items )
//            console.log(data);
        },
    }
}
</script>

