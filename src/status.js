const updateStatus = (message) => {
  let statusBar = document.getElementById('status');
  statusBar.innerHTML = message;
};

module.exports = updateStatus;
