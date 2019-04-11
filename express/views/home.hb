{{# if user }}
  <button class="btn btn-primary" id="logoutBtn">Log out</button>
{{ else }}
  <a href="/login">Log in</a>
{{/if}}

<h1>{{{ title }}}</h1>
<p>Welcome to {{{ title }}}</p>
<p>Hello, {{ user.username }}</p>

<script type="text/javascript">
  (function() {
    var logoutBtn = document.querySelector('#logoutBtn');

    if (logoutBtn) {
      logoutBtn.onclick = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.onload = function () {
          if (xhr.readyState == 4 && xhr.status === 200) {
            console.log('logout');
          } else {
            console.error(xhr.statusText);
          }
        }

        xhr.send();
      }
    }
  })();
</script>


<!-- 
{{# if condition }}
	Condition is true
{{ else }}
	Condition is false
{{/if}}

<br>

<ul>
{{# each listArr as |val key|}}
	<li>{{ key }} : {{ val }}</li>
{{/each}}
</ul> -->
