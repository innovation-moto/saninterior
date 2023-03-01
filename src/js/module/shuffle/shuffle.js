import Shuffle from '../libs/shuffle';

export default class ShuffleDemo {
  constructor(element,param,scroll) {

    this.param = param;
    this.scroll = scroll;

    this.element = element;
    this.gridItems = this.element.querySelectorAll('.human-item');
    this.shuffle = new Shuffle(element, {
      itemSelector: '.human-item'
    });

    // Log events.
    this.addShuffleEventListeners();
    this._activeFilters = [];
    this.addFilterButtons();
    //this.showItemsInViewport(changes);

    // var callback = this.showItemsInViewport.bind(this);
    // this.observer = new IntersectionObserver(callback, {
    //     threshold: 0.5,
    // });
    // for (var i = 0; i < this.gridItems.length; i++) {
    //   this.observer.observe(this.gridItems[i]);
    // }
    setTimeout(function () {
      this.addTransitionToItems();
    }.bind(this), 100);
  }

  // showItemsInViewport(changes) {
  //   changes.forEach(function (change) {
  //     if (change.isIntersecting) {
  //       change.target.classList.add('in');
  //     }
  //   });
  // };

  /**
   * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
   * for them like you normally would (with jQuery for example).
   */
  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.START, (data) => {
      console.log('start. data:', data);
      console.log(data.shuffle.items);
      var visibleItems = data.shuffle.items.filter(function(item, index){
        if (item.isVisible == true) return true;
      });

      for (let index = 0; index < visibleItems.length; index++) {
        const tagElement = visibleItems[index].element;
        if(index % 2 != 0){
          tagElement.classList.add('even');
          tagElement.classList.remove('odd');
        }else{
          tagElement.classList.remove('even');
          tagElement.classList.add('odd');
        }

      }
    });
    this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {

      for( var i=this.scroll.animation.scNumStart; i<this.scroll.animation.scNum; i++) {
        let $scp = this.scroll.animation.$target[i];
        $scp.classList.add("is-show");
        this.scroll.animation.scFlag[i] = true;
        let _$slideUp = $scp.querySelector('.js__slideup');
        if(_$slideUp){
          TweenMax.set(_$slideUp,{
            opacity:1,
            y: 0,
          });
        }
      }

      this.scroll.resize(window.innerWidth,window.innerHeight);

    });
    this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
      console.log('removed. data:', data);
    });
  }

  addFilterButtons() {
    const options = document.querySelector('.filter-options').children;
    if (!options) {
      return;
    }

    console.log(options);
    
    //const filterButtons = options;
    const onClick = this._handleFilterClick.bind(this);
    for(var i = 0; i < options.length; i++){
      options[i].addEventListener('click', onClick, false);
    }
  }

  _handleFilterClick(evt) {
    const btn = evt.currentTarget;
    const isActive = btn.classList.contains('active');
    const btnGroup = btn.getAttribute('data-group');
    
    this._removeActiveClassFromChildren(btn.parentNode);
    
    let filterGroup;
    // if (isActive) {
    //   btn.classList.remove('active');
    //   filterGroup = Shuffle.ALL_ITEMS;
    // } else {
    //   btn.classList.add('active');
    //   filterGroup = btnGroup;
    // }
    btn.classList.add('active');
    filterGroup = btnGroup;

    console.log(filterGroup)
    this.shuffle.filter(filterGroup);

    setTimeout(()=>{
      this.shuffle.filter(filterGroup);
    },10);

  }

  _removeActiveClassFromChildren(parent) {
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].classList.remove('active');
    }
  }


  addTransitionToItems(){
    for (var i = 0; i < this.gridItems.length; i++) {
      var inner = this.gridItems[i].querySelector('a');
      inner.classList.add('picture-item__inner--transition');
    }
  }

}
