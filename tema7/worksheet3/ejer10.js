window.addEventListener("load", () => {
    $("#passwordInput").on("input", function () {
        if ($(this).val().length < 5) {
            $("#strength").text("No segura");
        } else if ($(this).val().length < 8){
            $("#strength").text("Medianamente segura");
        } else {
            $("#strength").text("Segura");
        }
    });
}); 