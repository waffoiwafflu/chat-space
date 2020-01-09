$(function(){
  var buildHTML = function(message) {
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; 

    var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }
  
  // 非同期↓
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
     
      var html = buildHTML(data);
      $('.chat__message').append(html)
      $('.chat__message').animate({scrollTop: $('.chat__message')[0].scrollHeight});
      $('.form__submit').prop('disabled', false); 
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  //自動更新↓
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message) 
        });
        
        $('.chat__message').append(insertHTML);
        $('.chat__message').animate({scrollTop: $('.chat__message')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })

    .fail(function() {
      console.log('error');
    });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
}); 