<template>
<!-- 
    File save, json
--->
    <div>
        <h1>Files- test2:</h1>
        <hr />
        <div><input type="file" id="file1"></div>
        <div><output id="output1"></output></div>        
    </div>
</template>

<!-- -->
<script>
window.addEventListener("load", function() {
    document.getElementById("file1").addEventListener("change", function() {
        var files = document.getElementById('file1').files;
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
                console.log(dat)
                //document.getElementById("output1").innerHTML = evt.target.result;
            };
            reader.onerror = function(evt) {
                console.log(evt.target.error.name);
            };
            reader.readAsText(file, "utf-8");
        }
    });
});

</script>

