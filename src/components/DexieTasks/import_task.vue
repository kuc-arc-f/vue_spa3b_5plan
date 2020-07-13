<template>
    <div>
        <router-link :to="'/dexie_tasks'" class="btn btn-outline-primary mt-2">Back
        </router-link>   
        <hr class="mt-2 mb-2" />     
        <h3>Tasks- import:</h3>
        <hr />
        <p>select , json file
        </p>
        <div><input type="file" id="file1" class="btn btn-outline-primary">
        </div>
        <hr />
        <div class="loading hide"></div>
        <h3 id="complete_msg" 
        style="color: green; display: none;"> Complete , import data !!
        </h3>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import $ from 'jquery'

var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        var self = this
        window.addEventListener("load", function() {
            window.document.getElementById("file1").addEventListener("change", function() {
                //console.log("#-change")
                self.change_proc()
            });
        });
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
        this.sysConst.DEXIE_DB_STORE );        
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            data1 : "",
        }
    },
    methods: {
        change_proc: function(){
            console.log("#-change_proc")
            $('.loading').removeClass('hide');
            var self = this
            var files = window.document.getElementById('file1').files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log("i: " + i );                
                console.log("Name: " + file.name);
                console.log("Size: " + file.size);
                console.log("Type: " + file.type);
                console.log("Date: " + file.lastModified);
                console.log("Date: " + file.lastModifiedDate);
                var reader = new FileReader();
                reader.onload = async function(evt) {
                    console.log("State: " + evt.target.readyState);
                    var result =evt.target.result;
                    var dat = JSON.parse(result || '[]')
                    await self.add_item(dat)
                    self.items = dat
                };
                reader.onerror = function(evt) {
                    console.log(evt.target.error.name);
                };
                reader.readAsText(file, "utf-8");             
            }            
        },
        add_item:async function(items){
            db.tasks.clear()
            await items.forEach(function(item){
                var task = {
                    title: item.title,
                    content: item.content,
                    created_at: new Date(item.created_at),
                }
//                console.log(task )
                db.tasks.add( task)
            });
            //var self = this
            setTimeout(function () {
                $('#complete_msg').css('display','inherit');
                $('.loading').addClass('hide');
                alert("Complete ,import data success.");
                console.log("# timer.cb")
                //self.move_action()
            }, 1000)           
        },  
        move_action: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , "/dexie_tasks" )
            window.location.href = this.sysConst.HTTP_URL
        },                       

    }
}
</script>
<!-- -->
<style>
.hide {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  background-image: url(/img/load_img.gif);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: 88px 88px;
}
</style>
