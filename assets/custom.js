document.querySelector('.site-nav__close-cart-custom')?.addEventListener('click', function () {
  document.querySelector('.js-close-header-cart')?.click();
});

document.querySelector('.site-nav__close-cart-empty')?.addEventListener('click', function () {
   document.querySelector('.js-close-header-cart')?.click();
});

/**************************
 * Featured collection JS *
 **************************/

// Mettre à jour l'affichage des boutons de scroll
function update_scroll_buttons(section, collection) 
{
    let scroll_container = section.getElementsByClassName('scroll_container')[0];

    if(!scroll_container)
        return;

    let buttons = scroll_container.getElementsByTagName('a');

    if(parseInt(collection.dataset.scroll) <= 0)
        buttons[0].classList.add('no_scroll');
    else
        buttons[0].classList.remove('no_scroll');

    if(parseInt(collection.dataset.scroll) >= collection.scrollWidth - collection.offsetWidth || collection.scrollWidth <= collection.offsetWidth)
        buttons[1].classList.add('no_scroll');
    else
        buttons[1].classList.remove('no_scroll');
}

// Change the collections tab on click 
function change_collections_tab(e, target, section, index) 
{
    e.preventDefault();

    // get the current section
    section = document.querySelector(`div[data-section-id=${section}]`);

    // remove class from all nodes with "collection_tab_selected" class
    let collection_tab_selected = section.getElementsByClassName('collection_tab_selected');

    for (let i = 0; i < collection_tab_selected.length; i++) {
        collection_tab_selected[i].classList.remove('collection_tab_selected');
    }

    target.parentNode.classList.add('collection_tab_selected');

    // remove class "collection_hidden" from all nodes with "collections_list" class
    let collections = section.getElementsByClassName('collections_list');

    for (let i = 0; i < collections.length; i++) 
    {
        if(i != index - 1)
        {
            collections[i].classList.add('collection_hidden');
        }
    }    

    collections[index - 1].classList.remove('collection_hidden');
}

// Change the collection on click 
function change_collection(e, target, section, index) 
{
    e.preventDefault();

    // get the current section
    section = document.getElementById('CollectionSection-' + section);

    // remove class from all nodes with "collection_tab_selected" class
    let collection_tab_selected = section.getElementsByClassName('collection_tab_selected');

    for (let i = 0; i < collection_tab_selected.length; i++) {
        collection_tab_selected[i].classList.remove('collection_tab_selected');
    }

    target.parentNode.classList.add('collection_tab_selected');

    // remove class from all nodes with "collection_tab" class
    let collections = section.getElementsByClassName('collection_tab');
    
    for (let i = 0; i < collections.length; i++) {
        if(i == index - 1)
        {
            collections[i].classList.remove('collection_hidden');
            update_scroll_buttons(section, collections[i]);
        }     
        else
            collections[i].classList.add('collection_hidden');
    }    
}

// Afficher une collection donnée
function afficher_collection(e, section, collectionHandle)
{
    e.preventDefault();
    // get the current section
    section = document.getElementById('CollectionSection-' + section);

    let collection_tab = section.getElementsByClassName('collection_tab_selected')[0];

    if(collection_tab)
    {
        document.location = collection_tab.getElementsByTagName('a')[0].rel;
    }
    else
    {
        document.location = '/collections/' + collectionHandle
    }  
}

// General scroll products function
function scroll_collection(container, collection, products, direction)
{
    if(direction == 'left')
    {
        for(let i = products.length - 1; i >= 0; --i)
        {
            if(products[i].getBoundingClientRect().left < collection.getBoundingClientRect().left)
            {
                collection.dataset.scroll = products[i].getBoundingClientRect().left - products[0].getBoundingClientRect().left - collection.offsetWidth + products[i].offsetWidth;
                break;
            }
        }  
    }
    else if(direction == 'right')
    {
        for(const product of products)
        {
            if(product.getBoundingClientRect().right > collection.getBoundingClientRect().left + collection.offsetWidth)
            {
                collection.dataset.scroll = product.getBoundingClientRect().left - products[0].getBoundingClientRect().left;
                break;
            }
        }
    }   

    if(parseInt(collection.dataset.scroll) < 0)
        collection.dataset.scroll = 0;
    else if(parseInt(collection.dataset.scroll) > collection.scrollWidth)
        collection.dataset.scroll = collection.scrollWidth - collection.offsetWidth;

    collection.scrollTo({ left: parseInt(collection.dataset.scroll), top: 0, behavior: 'smooth' });

    // scrollTo n'est pas supporté par Safari
    if(window.safari)
    {
        collection.scrollLeft = parseInt(collection.dataset.scroll);
    }

    // console.log(collection.dataset.scroll);

    update_scroll_buttons(container, collection);
}

// Function to scroll the collection container
function scroll_section_collection(e, target, section_id, direction)
{
    e.preventDefault();

    if(target.classList.contains('no_scroll'))
        return;

    // get the current section
    let section = document.getElementById('CollectionSection-' + section_id);
    let collection = section.querySelector('.collection_tab:not(.collection_hidden)');
    let products = collection.getElementsByClassName('grid-product');

    scroll_collection(section, collection, products, direction);
}

// Function to scroll the collection container inside a block
function scroll_block_collection(e, target, block_id, direction)
{
    e.preventDefault();

    if(target.classList.contains('no_scroll'))
        return;

    // get the current section
    let block = document.querySelector(`div[data-block-id="${block_id}"]`);
    let collection = block.querySelector('.collection_tab');
    let products = collection.getElementsByClassName('grid-product');

    scroll_collection(block, collection, products, direction);
}


// Afficher un accordeon
function toggleAccordeon(target) 
{
    let parent = target.parentNode;
    let accordeon = parent.querySelector('.accordeon, .accordeon-mobile');

    accordeon.classList.toggle('accordeon_active');

    if(accordeon.classList.contains('accordeon_active'))
    {
        parent.getElementsByClassName('toggle_up_accordeon')[0].classList.remove('accordeon_hidden');
        parent.getElementsByClassName('toggle_down_accordeon')[0].classList.add('accordeon_hidden');
    } else
    {
        parent.getElementsByClassName('toggle_up_accordeon')[0].classList.add('accordeon_hidden');
        parent.getElementsByClassName('toggle_down_accordeon')[0].classList.remove('accordeon_hidden');
    }
}


if ($(window).width() < 576) {
  $(document).ready(function() {
    $(".show_card_slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplaySpeed: 3000,
      speed: 1000,
      arrows: false,
      dots: true,
      autoplay: true,
      pauseOnHover: false,     
      centerMode: true,
      centerPadding: '50px',
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  var content = document.getElementById('drop_down_option');
  var toggleButton = document.getElementById('drop_down_select');

  toggleButton.addEventListener('click', function () {
    this.classList.toggle('svg_dev');
    content.classList.toggle('hidden_dev');
  });
});

$(document).ready(function() {

$('.section-advanced-content .product-metafields-sections').on('init', function (event, slick, direction) {    
    if (!($('.section-advanced-content .product-metafields-sections .slick-slide').length > 0)) {        
        $('body.template-product .section-advanced-content').hide();
    }
});

   
   $(".section-advanced-content .product-metafields-sections").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplaySpeed: 5000,
  speed: 500,
  arrows: true,
  dots: true,
  autoplay: true,
  pauseOnHover:false,
  responsive: [
    {      
      breakpoint: 989,
      settings: {
        slidesToShow: 2,
        arrows: false
      }
    },
    {      
      breakpoint: 749,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }
  ]   
});
 $('.section-advanced-content .product-metafields-sections').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.feature-row__item').removeClass('showcontent');
    $('.arowws').removeClass('active');
  });
}); 

if ($(window).width() > 768) {
  $(document).ready(function(){
   $('.collection-sidebar__group--1 .collapsible-trigger').addClass('is-open');
   $('.collection-sidebar__group--1 .collapsible-content').addClass('is-open'); 
   $('.collection-sidebar__group--2 .collapsible-trigger').addClass('is-open');
   $('.collection-sidebar__group--2 .collapsible-content').addClass('is-open');  
  });
}
