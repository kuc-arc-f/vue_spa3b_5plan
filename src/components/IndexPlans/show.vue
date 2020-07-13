<template>
    <div class="plan_show_wrap">
        <router-link :to="'/idx_plan'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        date : {{ create }} <br />
        ID : {{ id }}<br />
        <hr />
        <pre v-text="content" class="pre_text"></pre>
        <hr />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';
import LibPlan from '@/libs/LibPlan';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        var config = LibPlan.get_const()
//console.log( ApppConst.DB_STORE );
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );

this.get_item( this.id )
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            id : 0,
            item: itemDat,
            key_name : "tasks", 
            tasks : [],
            title:'',
            content:'', 
            create : '',           
        }
    },
    methods: {
        async get_item(id){
            const item = await db.plans.get(id);
            this.content = item.content   
//            this.create = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')     
            this.create = LibCommon.formatDate(item.p_date, 'YYYY-MM-DD')     
//            console.log('data: ', item) 
        },
    }
}
</script>
<!-- -->
<style>
.plan_show_wrap .pre_text{
	border: 1px solid #000;
	background: #EEE;
	padding : 10px;
	font-family: BlinkMacSystemFont,"Segoe UI",Roboto;
	font-size: 1.0rem;    
}    
</style>

