<template>
<!-- 
    File save, json
--->
    <div>
        <h1>Files- test:</h1>
        <hr />
        <a id="download" href="#" download="test3.json"
         v-on:click="handleDownload()">[ Download ]
        </a>	
    </div>
</template>

<script>
import {Mixin} from '../../mixin'

//
export default {
    mixins:[Mixin],
    created() {
    },
    data() {
        return {
            message : " ",
        }
    },
    methods: {
        handleDownload: function(){
            var arr = [
                {id: 1  , name: "n1"},
                {id: 2  , name: "n2"},
                {id: 3  , name: "n3"},
                {id: 4  , name: "n4"},
                {id: 5  , name: "n5"},
            ];
            var content = JSON.stringify( arr );
            var blob = new Blob([ content ], { "type" : "application/json" });
            var fname = "test3.json"

            if (window.navigator.msSaveBlob) { 
                console.log("#-msSaveBlob")
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                console.log("#-msSaveBlob-false")
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }
        },
    }
}
</script>

