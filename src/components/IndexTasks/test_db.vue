<template>
    <div>
        <h1>IndexTasks- test:</h1>
        <hr />
        data : {{ data1 }}

    </div>
</template>

<script>
//import axios from 'axios'
import {Mixin} from '../../mixin'
import * as localforage from 'localforage'
localforage.config({
  name: 'test_idx_db1',
  //storeName: 'postJson',
});
//
export default {
    mixins:[Mixin],
    created() {
        this.set_storage()
        this.get_storage()
//console.log( this.sysConst.URL_BASE )
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            child_data : "hoge",
            data1 : "",
        }
    },
    methods: {
        getTasks(){
        },
        async set_storage(){
            try {
                await localforage.setItem('somekey', 'value22')
            } catch (err) {
                console.log(err);
            }            
        },
        async get_storage(){
            try {
                const value = await localforage.getItem('somekey');
                this.data1 = value
                console.log(value);
            } catch (err) {
                console.log(err);
            }            
        },

    }
}
</script>

