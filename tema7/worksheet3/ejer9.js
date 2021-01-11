window.addEventListener("load", () => {
    $("#start").on("click", animaDiv);
    $("#stop").on("click", () => {
        $("div").stop(true);
    });
});

function animaDiv() {
    $("div").fadeIn("slow")
        .animate({
            left: "-=200"
        }, "slow", function () {
            $(this).css("background-color", "blue");
        })
        .slideUp("slow");
}