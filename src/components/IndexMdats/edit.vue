<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/idx_mdat'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>Mdats - edit</h3>        
        <hr class="mt-2 mb-2" />
        <div class="form-group">
            <label for="date" class="col-sm-3 control-label">日付 :</label>
            <div class="col-sm-4">
                {{ m_date }}
            </div>                
        </div>            
        <div class="form-group">
            <label for="hnum">hnum : </label>
            <div class="col-sm-3">
                <input type="number" v-model="hnum" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label for="lnum">lnum : </label>
            <div class="col-sm-3">
                <input type="number" v-model="lnum" class="form-control" />
            </div>
        </div>
        <hr />        
        <button v-on:click="update_item(id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="delete_item(id);"
             class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';
import LibMdats from '@/libs/LibMdats';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        var ApppConst = LibMdats.get_const()
        db = new Dexie( ApppConst.DB_NAME );
        db.version( ApppConst.DB_VERSION).stores( ApppConst.DB_STORE );         
        this.get_item( this.id )        
    },
    data() {
        return {
            id: 0,
            tasks: [],
            hnum: null,
            lnum : null,
            m_date : null,            
        }
    },
    methods: {
        async get_item(id){
            const item = await db.mdats.get(id);
            this.m_date = LibCommon.formatDate( item.m_date , 'YYYY-MM-DD')
            this.hnum = item.hnum
            this.lnum = item.lnum            
            console.log(item);                          
        }, 
        update_item(task_id){
//console.log( id )
            db.mdats.update(parseInt(task_id) , {
                hnum: this.hnum,
                lnum: this.lnum,
            });
            this.$router.push('/idx_mdat')
        },        
        delete_item(id){
console.log( id )
            db.mdats.delete(parseInt(id) );
            this.$router.push('/idx_mdat')
        },
    }
}
</script>
