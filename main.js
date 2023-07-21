// Constants
const MAX_FUNDING = 100000;
const PROGRESS_BAR = document.querySelector('.slider .bar');
const PROJECT_FUNDING = document.querySelector('section .stats .stat:first-child h2');
const STATS_VIEW = document.querySelector('section .stats');
const BOOKMARK_ICON = document.querySelector('.bookmark-icon');
const BOOKMARK_TEXT = document.querySelector('.bookmark-text');
const SELECT_REWARD_BTNS = document.querySelectorAll('.select-reward-btn');
const BACK_PROJECT_BTN = document.querySelector('.back-project-btn');
const DIALOG = document.querySelector('dialog:not(.thank-you-modal)');
const ALL_CIRCLES = document.querySelectorAll('.circle');
const CLOSE_MODAL_ICON = document.querySelector('.close-modal-icon');
const THANK_YOU_MODAL = document.querySelector('.thank-you-modal');
const GOT_IT_BTN = document.querySelector('.got-it-btn');
const MOBILE_MENU_OPEN_ICON = document.querySelector('.mobile-menu-open-icon');
const MOBILE_MENU_CLOSE_ICON = document.querySelector('.mobile-menu-close-icon');
const MOBILE_MENU = document.querySelector('.mobile-menu');

const REWARDS = [
    {
        id: 0,
        title: 'Pledge with no reward',
        pledge: 0,
        description: 'Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.',
    },
    {
        id: 1,
        title: 'Bamboo Stand',
        pledge: 25,
        description: 'You get an ergonomic stand made of natural bamboo. You\'ve helped us launch our promotional campaign, and you\'ll be added to a special Backer member list.',
        left: 101
    },
    {
        id: 2,
        title: 'Black Edition Stand',
        pledge: 75,
        description: 'You get a Black Special Edition computer stand and a personal thank you. You\'ll be added to our Backer member list. Shipping is included.',
        left: 64
    },
    {
        id: 3,
        title: 'Mahogany Special Edition',
        pledge: 200,
        description: 'You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You\'ll be added to our Backer member list. Shipping is included.',
        left: 0
    }
]

const REWARDS_CONTAINER = document.querySelector('.rewards');

function createReward(reward) {
    if(reward.id === 0) return;
    const Reward = document.createElement('div');
    Reward.classList.add('reward');
    Reward.dataset.id = reward.id;
    if(reward.left === 0)
       Reward.classList.add('out-of-stock');
    Reward.innerHTML = `<div>
    <h3>${reward.title}</h3>
  <h3>Pledge ${reward.pledge}$ or more</h3>
  </div>
  <p>${reward.description}</p>
  <div class="reward-footer">
    <div class="left">
      <h2>${reward.left}</h2>
      <span>left</span>
    </div>
    <button class="select-reward-btn">Select Reward</button>
</div>`
    REWARDS_CONTAINER.appendChild(Reward);
}

const MODAL_OPTIONS = document.querySelector('.modal-options');

function createModalReward(reward) {
    if(reward.left === 0) return;
    const Reward = document.createElement('div');
    Reward.classList.add('option');
    Reward.dataset.id = reward.id;
    if(reward.id === 0)
    {
        Reward.innerHTML = `<div class="option-heading">
        <div class="circle">
          <div class="inner-circle"></div>
        </div>
        <h3>${reward.title}</h3>
      </div>
      <p>${reward.description}</p>
      <div class="option-inputs">
        <h3>Enter your pledge</h3>
        <div class="input-group">
          <input type="text" placeholder="0.00">
          <button class="continue-btn">Continue</button>
        </div>
      </div>`
    }
    else
    Reward.innerHTML = `<div class="option-heading">
    <div class="circle">
      <div class="inner-circle"></div>
    </div>
    <div>
      <h3>${reward.title}</h3>
      <h3>Pledge $${reward.pledge} or more</h3>
    </div>
  </div>
  <p>${reward.description}</p>
  <h2>101 <span>left</span></h2>
    <div class="option-inputs">
    <h3>Enter your pledge</h3>
    <div class="input-group">
      <input type="text" placeholder="0.00">
      <button class="continue-btn">Continue</button>
    </div>
  </div>`
    MODAL_OPTIONS.appendChild(Reward);
    Reward.addEventListener('click', selectCircle);
}




function updateProgressBar() {
    const fundingValue = parseInt(PROJECT_FUNDING.innerHTML.replace(/[^0-9]/g, ''));
    const progressBarPercentage = (fundingValue / MAX_FUNDING) * 100;
    PROGRESS_BAR.style.width = `${progressBarPercentage}%`;
}

function toggleBookmark() {
    const text = BOOKMARK_TEXT.innerHTML;
    BOOKMARK_TEXT.innerHTML = text === 'Bookmark' ? 'Bookmarked' : 'Bookmark';
}

function openDialog() {
    DIALOG.showModal();
}

function selectCircle({ target }) {
    // Handle click on circle
    if (target.classList.contains('circle')) {
      const parent = target.parentElement.parentElement;
  
      // Remove the selected class from all rewards
      const allRewards = document.querySelectorAll('.option');
      allRewards.forEach((reward) => {
        reward.classList.remove('selected');
      });
  
      // Add the selected class to the clicked reward
      parent.classList.add('selected');
      parent.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
  
function closeModal() {
    DIALOG.close();
}

function closeThankYouModal() {
    THANK_YOU_MODAL.classList.remove('open');
}

function toggleMobileMenu() {
    MOBILE_MENU.classList.toggle('open');
}


// Event Listeners
BOOKMARK_ICON.addEventListener('click', toggleBookmark);

REWARDS_CONTAINER.addEventListener('click', (event) => {
  const target = event.target;
  // Handle click on "Select Reward" button
  if (target.classList.contains('select-reward-btn')) {
    openDialog();
  }
  
  
});

CLOSE_MODAL_ICON.addEventListener('click', closeModal);

GOT_IT_BTN.addEventListener('click', closeThankYouModal);

MOBILE_MENU_OPEN_ICON.addEventListener('click', toggleMobileMenu);

MOBILE_MENU_CLOSE_ICON.addEventListener('click', toggleMobileMenu);

BACK_PROJECT_BTN.addEventListener('click', openDialog);


// Initializations
updateProgressBar();

REWARDS.forEach((reward) => {
    createReward(reward);
    createModalReward(reward);
});


const CONTINUE_BTN = document.querySelectorAll('.continue-btn');

CONTINUE_BTN.forEach((btn) => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const rewardID = btn.parentElement.parentElement.parentElement.dataset.id;
        const value = parseInt(input.value);
        const reward = REWARDS.find((reward) => reward.id === parseInt(rewardID));
        if(value < reward.pledge)
        {
            alert(`Please enter a value greater than ${reward.pledge}`);
            return;
        }
        if(reward.left === 0)
        {
            alert('This reward is out of stock');
            return;
        }
        reward.left--;
        console.log(REWARDS);
        const rewardLeft = document.querySelector(`.reward[data-id="${rewardID}"] .reward-footer .left h2`);
        rewardLeft.innerHTML = reward.left;
        const modalRewardLeft = document.querySelector(`.option[data-id="${rewardID}"] h2`);
        modalRewardLeft.innerHTML = reward.left;
        let projectFunding = parseInt(PROJECT_FUNDING.innerHTML.replace(/[^0-9]/g, ''));
        projectFunding += value;
        PROJECT_FUNDING.innerHTML = `$${projectFunding}`;
        updateProgressBar();
        closeModal();
        THANK_YOU_MODAL.classList.add('open')
    });
});