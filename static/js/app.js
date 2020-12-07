var data = []
var token = ""

jQuery(document).ready(function () {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;
    
        if (file.type.match(textType)) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                var content = reader.result;
                var text = document.getElementById('txt_input');
                text.innerHTML += content;
            }
        reader.readAsText(file);	
    } else {
        fileDisplayArea.innerText = "File not supported!"
    }
});
    var slider = $('#max_words')
    slider.on('change mousemove', function (evt) {
        $('#label_max_words').text('max # words in summary: ' + slider.val())
    })

    var slider1 = $('#min_words')
    slider.on('change mousemove', function (evt) {
        $('#label_min_words').text('min # words in summary: ' + slider1.val())
    })

    var slider2 = $('#num_beams')
    slider2.on('change mousemove', function (evt) {
        $('#label_num_beams').text('# beam search: ' + slider2.val())
    })

    $('#btn-process').on('click', function () {
        input_text = $('#txt_input').val()
        model = $('#input_model').val()
        num_words = $('#max_words').val()
        min_words = $('#min_words').val()
        num_beams = $('#num_beams').val()
        $.ajax({
            url: '/predict',
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "input_text": input_text,
                "model": model,
                "num_words": num_words,
                "num_beams": num_beams,
                "min_words": min_words
            }),
            beforeSend: function () {
                $('.overlay').show()
            },
            complete: function () {
                $('.overlay').hide()
            }
        }).done(function (jsondata, textStatus, jqXHR) {
            console.log(jsondata)
            $('#input_summary').val(jsondata['response']['summary'])
        }).fail(function (jsondata, textStatus, jqXHR) {
            alert(jsondata['responseJSON']['message'])
        });
    })


})