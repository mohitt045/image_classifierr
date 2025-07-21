Dropzone.audioDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });

    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);
        }
    });

    dz.on("complete", function (file) {
    let imageData = file.dataURL;

    $.ajax({
        type: "POST",
        url: "/classify",
        data: JSON.stringify({ image: imageData }),
        contentType: "application/json",
        success: function (response) {
            // Example: show classification result
            $("#resultHolder").show().html(`<h5>Detected: ${response.label}</h5>`);
            $("#divClassTable").show();
            $("#score_" + response.label.toLowerCase()).text(response.probability);
        },
        error: function () {
            $("#error").show();
        }
    });




    });

    $("#submitBtn").on('click', function(e){
        dz.processQueue();
    });
}

$(document).ready(function(){
    console.log("ready!");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});