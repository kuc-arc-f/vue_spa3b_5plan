<template>
    <div>
        <router-link :to="'/index_tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>title : {{ item.title }}</h3>
        <div v-text="item.content"></div>
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
        this.get_item( this.$route.params.id )
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            key_name : "tasks", 
        }
    },
    methods: {
        async get_item(id){
            var self = this
            await localforage.getItem(this.key_name,async function(err, value) {
//                console.log(value);
                self.item = await DbFunc.get_item(value, id )
            });            
        },
    }
}
</script>


