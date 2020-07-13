<template>
    <div>
        <router-link :to="'/dexie_todos'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>{{ title }}</h3>
        ID : {{ id }}<br />
        date : {{ create }}
        <hr />
        <div id="post_item" v-html="content"></div>
        <hr />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import marked from  'marked'
import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(this.sysConst.DEXIE_DB_STORE );                 
        this.get_item( this.id )
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            id : 0,
            item: itemDat,
            tasks : [],
            title:'',
            content:'', 
            create : '',           
        }
    },
    methods: {
        async get_item(id){
            const item = await db.todos.get(id);
            this.title = item.title
            this.content = marked(item.content)
            this.create = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')     
//            console.log('data: ', item) 
        },
    }
}
</script>
<!-- -->
<style>
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>

