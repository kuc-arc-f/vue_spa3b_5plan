<template>
<!-- 
    File save, json
--->
    <div>
        <h1>Files- test2:</h1>
        <hr />
        <div><input type="file" id="file1"></div>
        <div><output id="output1"></output></div>    
        <hr />
        <ul v-for="item in items" v-bind:key="item.id">
            <li>
                ID : {{ item.id }} / 
                name : {{ item.name }}
            </li>
        </ul>            
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
//import $ from 'jquery'
import Dexie from 'dexie';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        var self = this
        window.addEventListener("load", function() {
            window.document.getElementById("file1").addEventListener("change", function() {
                console.log("#-change")
                self.change_proc()
            });
        });
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
                this.sysConst.DEXIE_DB_STORE ); 
        this.init_proc()       
    },
    data() {
        return {
            items : [],
            message : " ",
//            h_file1 : "",
        }
    },
    methods: {
        init_proc: function(){
            var self = this
            db.file_items.toArray().then(function (items ) {
                self.items = items
            });            
        },
        change_proc: function(){
            console.log("#-change_proc")
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
                reader.onload = function(evt) {
                    console.log("State: " + evt.target.readyState);
                    console.log("Result: " + evt.target.result);
                    var result =evt.target.result;
                    var dat = JSON.parse(result || '[]')
                    self.add_item(dat)
                    self.items = dat
                    console.log(dat)
                //document.getElementById("output1").innerHTML = evt.target.result;
                };
                reader.onerror = function(evt) {
                    console.log(evt.target.error.name);
                };
                reader.readAsText(file, "utf-8");             
            }            
        },
        add_item(items){
            items.forEach(function(item){
                var task = {
                    name: item.name,
                    created_at: new Date(),
                }
                db.file_items.add( task)
            });
        },        
    }
}

</script>

