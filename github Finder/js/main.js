
$(document).ready(function(){
    $("#searchUser").keyup(function(e){
      let username = e.target.value;

      //request to github
        $.ajax({
            url:'https://api.github.com/users/' + username,
            
            data:{
                    client_id:'dbbf3268c29187d9b703',
                    client_secret:'c5f6f49e79b87db721dffff00d3e7c23068f5db7',
            }
        }).done(function( user ){
          
            $.ajax({
                url:'https://api.github.com/users/' + username + '/repos',
                data:{
                    client_id:'dbbf3268c29187d9b703',
                    client_secret:'c5f6f49e79b87db721dffff00d3e7c23068f5db7',
                    sort: 'created: asc',
                    per_page: 5
            }
        }).done(function(repos){
            $.each(repos, function(index, repo){
              $('#repos').append(`
                <div class="card">
                  <div class="row">
                    <div class="col-md-7">
                      <strong>${repo.name}</strong>: ${repo.description}
                    </div>
                    <div class="col-md-3">
                      <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                      <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                      <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                    </div>
                    <div class="col-md-2">
                      <a href="${repo.html_url}" target="_blank" class="btn  btn-dark">Repo Page</a>
                    </div>
                  </div>
                </div>
              `);
            });
          });    
          
            $('#profile').html(`

            <div class="card">
                <div class="card-header">
                    ${user.name}
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail photo" src="${user.avatar_url}">
                            <a class="btn  btn-warning btn-block" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-pill badge-primary">Public Repos : ${user.public_repos}</span>
                            <span class="badge badge-pill badge-secondary">Public Gists ${user.public_gists}</span>
                            <span class="badge badge-pill badge-success">Followers :${user.followers}</span>
                            <span class="badge badge-pill badge-danger">Followings : ${user.following}</span>
                        <br><br>

                        <ul class="list=group">
                            <li class="list-group-item">Company : ${user.company}</li>
                            <li class="list-group-item">Website/Blog : ${user.blog}</li>
                            <li class="list-group-item">Location : ${user.location}</li>
                            <li class="list-group-item">Member Since : ${user.created_at}</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
            `);

        });

    });
  });