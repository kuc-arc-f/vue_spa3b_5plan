<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/idx_plan'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <h3>Plan - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="date" class="col-sm-3 control-label">日付</label>
                <div class="col-sm-4">
                    <input type="date"  class="form-control"
                    v-model="p_date" required="required" />
                </div>                
            </div>
            <div class="form-group">
                <label for="TopicContent">Content :</label>
                <div class="col-sm-8">
                    <textarea class="form-control" id="content" rows="6"
                     v-model="content"></textarea>
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
import LibPlan from '@/libs/LibPlan';
//
var db = null
//
export default {
    mixins:[Mixin],
    created() {
//console.log( ApppConst.DB_STORE );
        var config = LibPlan.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );  
        this.p_date = LibCommon.formatDate(new Date(), 'YYYY-MM-DD')       
    },
    data() {
        return {
            title:'',
            content:'',
            p_date : null,
        }
    },
    methods: {
        add_item(){
            var date_str = this.p_date + "T00:00:00.000Z"
            var date = new Date( date_str );

            var item = {
                p_date: date,
                content: this.content,
                created_at: new Date(),
            }
            db.plans.add( item)
            this.$router.push('/idx_plan')            
        },
    }
}
</script>
