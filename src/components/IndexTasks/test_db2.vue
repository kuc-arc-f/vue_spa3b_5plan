<template>
    <div>
        <h1>test_db2.vue</h1>
        <hr />
        <ul>
            <!--
            <li v-for="item in items" v-bind:key="item.id">
            -->
            <li v-for="(item, i) in items" :key="i">
                no ={{ i }}/
                {{ item.id }} / 
                {{ item.name }} / 
                {{ item.addr }}
            </li>
        </ul>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
localforage.config({
  name: 'test_idx_db1',
//  storeName: 'test_store2',
});
//
export default {
    mixins:[Mixin],
    created() {
        this.set_storage()
        this.get_storage()
//        var d2 = this.get_storage_2()
        //var d = this.get_item(2)
//        var d3 = this.delete_item(d2, 2)
//console.log( d )
//console.log( d2 )
//console.log( d3 )
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
        getTasks(){
        },
        async set_storage(){
            try {
                var data = [
                    { "id": 1, "name": "Yamada-2", "age": 18, "addr": "Tokyo" },
                    { "id": 2, "name": "Suzuki-2", "age": 27, "addr": "Osaka" },
                    { "id": 3, "name": "Tanaka-2", "age": 36, "addr": "Kyoto" },
                    { "id": 4, "name": "Kimura-2", "age": 45, "addr": "Aichi" }
                ];
                /*
                data.forEach(async function(item, idx){
                    console.log(idx);
                    console.log(item );
                    await localforage.setItem(idx , item )
                });
                */
                await localforage.setItem(this.key_name , data )
                const value = await localforage.getItem( this.key_name );
                this.items = value
            } catch (err) {
                console.log(err);
            }            
        },
        async get_storage(){
            //var self = this
            try {
                /*
                localforage.iterate(async function(value, key, iterationNumber) {
                    console.log( iterationNumber );
                    console.log(key);
                }).then(function() {
                    console.log('Iteration has completed');
                    console.log( self.items );
                }).catch(function(err) {
                    console.log(err);
                });                
                */
                const value = await localforage.getItem( this.key_name );
                this.items = value
                return value
//                console.log(value);
            } catch (err) {
                console.log(err);
            }            
        },
        get_storage_2 : function(){
            localforage.getItem(this.key_name, function(err, value) {
//                console.log(value);
                return value
            });
        },
        /*
        async get_item(pos){
            const items = await localforage.getItem( this.key_name );
            items.forEach(function(item, idx){
                if(idx == pos){
                    console.log(item );
                }
            });
        },
        */
        get_item: function(pos){
            localforage.getItem(this.key_name, function(err, value) {
                console.log(value);
                value.forEach(function(item, idx){
                    if(idx == pos){
                        console.log(item );
                        return item
                    }
                });
            });            
        },
        delete_item: function(items ,pos){
console.log(items );
console.log(pos );
/*
            var data =[]
            items.forEach(function(item, idx){
                if(idx != pos){
                    data.push(item)                        
                }
            });
            console.log(data);
*/
        /*
            localforage.getItem(this.key_name, function(err, value) {
                console.log(value);
                console.log(pos);
                return data
            });
            */
            /*
            localforage.setItem( this.key_name , data ).then(function () {
                return localforage.getItem( this.key_name );
            }).then(function () {
                console.log("#ok-setItem");
            }).catch(function (err) {
                console.log( err );
            });            
            */

        }

    }
}
</script>

