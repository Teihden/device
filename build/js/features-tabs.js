// Features-tabs
const tabs = document.querySelector('.tabs');
const tabsButtons = tabs.querySelectorAll(':scope button');

function openTabEvent() {
  const tabActiveButton = tabs.querySelector(':scope button.tab-active');
  const idFeatureToOpen = this.dataset.item;
  const idFeatureToClose = tabActiveButton.dataset.item;
  const featureItemToOpen = document.getElementById(idFeatureToOpen);
  const featureItemToClose = document.getElementById(idFeatureToClose);

  tabActiveButton.classList.remove('tab-active');
  featureItemToClose.classList.add('closed');
  this.classList.add('tab-active');
  featureItemToOpen.classList.remove('closed');
}

for (let i = 0; i < tabsButtons.length; i += 1) {
  tabsButtons[i].addEventListener('click', openTabEvent);
}
