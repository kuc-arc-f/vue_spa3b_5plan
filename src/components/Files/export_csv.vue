<template>
<!-- 
    File save, CSV
--->
    <div>
        <h1>Files- CSV export:</h1>
        <hr />
        <a id="download" href="#" download="test1.csv"
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
            var content = '123,456,789' +'\r\n';
                content += 'a1,a2,a3' +'\r\n';
            var blob = new Blob([ content ], { "type" : "text/csv" });
            var fname = "test1.csv"

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

