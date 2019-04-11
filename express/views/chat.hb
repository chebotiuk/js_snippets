<h2>Chat</h2>
<div id="room">
  <ul id="ul"></ul>
  <form id="form">
    <input id="input" class="form-control" autocomplete="off">
  </form>
</div>

<script src="/js/socket.io.js"></script>
<script type="text/javascript">
  (function() {
    var socket = io.connect('', {
      reconnection: false,
    });

    var form = document.querySelector('#form');
    var input = document.querySelector('#input');
    var ul = document.querySelector('#ul');

    function addMessage(username, text) {
      var li = document.createElement('li');
      li.textContent = username + ': ' + text;
      ul.appendChild(li);
    }

    function sendMessage(e) {
      e.preventDefault();
      var text = input.value;
      input.value = '';

      socket.emit('message', text, addMessage);

      return false;
    }

    socket.on('message', addMessage)
          .on('leave', addMessage)
          .on('join', addMessage)
          .on('connect', function() {
            console.log("connection successful");
            form.addEventListener('submit', sendMessage);
            input.removeAttribute('disabled');
          })
          .on('disconnect', function() {
            console.warn("connection lost");
            form.removeEventListener('submit', sendMessage);
            input.setAttribute('disabled', true);

            // handling reconnect
            setTimeout(reconnect, 500);
          })
          .on('logout', function() {
            location.href = '/';
          });

    function reconnect() {
      socket.on('connect_error', function() {
        setTimeout(reconnect, 500);
      });

      socket.connect();
    }
  })();
</script>
