var actionText = document.querySelector('#oss .action-text');
var template = _.template('Pushed <a href="<%- commit.url %>"><%- commit.sha %></a> to <a href="<%- repo.url %>"><%- repo.name %></a> <%- timeAgo %>');

function fetchData() {
  fetch('https://api.github.com/users/lwansbrough/events').then(function(data) {
    return data.json();
  }).then(function(json) {
    var datum = _.findWhere(json, { type: 'PushEvent' });

    actionText.innerHTML = template({
      repo: {
        name: datum.repo.name,
        url: 'https://github.com/' + datum.repo.name
      },
      commit: {
        sha: datum.payload.commits[0].sha.substr(0, 7),
        url: 'https://github.com/' + datum.repo.name + '/commit/' + datum.payload.commits[0].sha
      },
      timeAgo: moment(datum.created_at).fromNow()
    });
  });
}

setInterval(fetchData, 10000);
fetchData();
