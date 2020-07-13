<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/idx_mdat'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <hr class="mt-2 mb-2" />
            <h3>Mdats - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="date" class="col-sm-3 control-label">日付</label>
                <div class="col-sm-4">
                    <input type="date"  class="form-control"
                    v-model="m_date" required="required" />
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
            <button v-on:click="add_item();" class="btn btn-primary mt-2">Save
            </button>
    </div>
</template>

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
        var ApppConst = LibMdats.get_const()
//console.log( ApppConst.DB_STORE );
        db = new Dexie( ApppConst.DB_NAME );
        db.version( ApppConst.DB_VERSION).stores( ApppConst.DB_STORE ); 

        this.m_date = LibCommon.formatDate(new Date(), 'YYYY-MM-DD')                
    },
    data() {
        return {
            hnum: null,
            lnum : null,
            m_date : null,
        }
    },
    methods: {
        add_item(){
            if(this.valid_number() == false){
                return
            }
            var date_str = this.m_date + "T00:00:00.000Z"
            var date = new Date( date_str );
//console.log( date )
            var item = {
                m_date: date,
                hnum: this.hnum,
                lnum: this.lnum,
                created_at: new Date(),
            }
            db.mdats.add( item)
            this.$router.push('/idx_mdat')            
        },
        valid_number: function(){
            var ret = true;
            if(this.hnum == null){
                alert("Error, hnum input require")
                ret = false;
            }
            if(this.lnum == null){
                alert("Error, lnum input require")
                ret = false;
            }
            return ret
        },
    }
}
</script>
