'use strict';

jQuery.noConflict();

const renderFakeCard = (index) => {
  return `
    <div class="packageCaptionCard" data-deal-card-item="${index}">
      <div
        class="package-left"
        style='
          width: 112px;
          height: 112px;
          background-color: #efefef;
          flex-shrink: 0;
          margin-right: 12px;
        '
      />
      <div class="package-right">
        <i class="bicon-checkmark-circle"></i>
        <h3 class="package-title">Golden State Museum for FREE</h3>
        <p class="package-description">Allows unlimited journeys on the Edinburg on the day of purchase.</p>
        <p class="package-numbers">Selected by 12,345 orders</p>
        <div class="package-price">
          <p class="package-original">Original price from TW 600</p>
          <h4 class="package-now"><small>now is</small> FREE</h4>
        </div>
      </div>
    </div>
  `;
}

(function($) {
  const ROOT_API_URL = 'http://bytheway-rails.herokuapp.com/hotel_packages';
  const renderCard = (id, {
    description,
    discounted_price: discountPrice,
    original_price: originalPrice,
    image_thumbnail_url: thumbnail,
    name,
  }) => {
    return `
      <div class="packageCaptionCard" data-deal-card-item="${id}">
        <div
          class="package-left"
          style='
            width: 112px;
            height: 112px;
            background-color: #efefef;
            background: #efefef url(${thumbnail}) center center / cover;
            flex-shrink: 0;
            margin-right: 12px;
          '
        />
        <div class="package-right">
          <i class="bicon-checkmark-circle"></i>
          <h3 class="package-title">${name}</h3>
          <p class="package-description">${description || 'No Description Yet'}</p>
          <p class="package-numbers">Selected by 12,345 orders</p>
          <div class="package-price">
            <p class="package-original">Original price from TWD ${parseInt(originalPrice).toFixed()}</p>
            <h4 class="package-now"><small>now is</small> ${parseInt(discountPrice).toFixed()}</h4>
          </div>
        </div>
      </div>
    `;
  }

  const toggleFullDealButton = (customClass, sentence) => (`
    <a class="${customClass} big_review_score_detailed js-big_review_score_detailed ind_rev_total hp_review_score js-hotel-review-score" href="#blockdisplay4" rel="reviews" data-tab-link="" onclick="return false;" style="">
      <span class="js--hp-scorecard-scoreword" data-open-map-track="rev">
        ${sentence}
      </span>
    </a>`)

  const renderFullDeals = rel => (`
    <div id="blockdisplay5" class="review_list_block one_col review_list_block-sliding_in review_list_block-sliding_in-shown" data-tab="${rel}" style="">
      <div class="review_list_block-sliding_in_wrapper" data-component="track" data-track="view" data-stage="1" data-hash="adUINVNNLfXdBGHQIcbFDeJZVKMO">
        hi
      </div>
      <div class="reviews_panel-close_button"><i class="bicon-aclose"></i></div>
    </div>
  `)

  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  const currentUrl = window.location.href;
  if (
    currentUrl.indexOf('http://www.booking.com/hotel') === 0 ||
    currentUrl.indexOf('https://www.booking.com/hotel') === 0
  ) {
    const $availabilityElem = $('#hp_availability_style_changes');
    const hotelId = $('*[data-hotel-id]').data('hotel-id');
    const cardArray = [];
    const reviewListOverlayClass = 'review_list_block-sliding_in_wrapper'
    const FULL_DEAL_REL = 'review';
    $(`.${reviewListOverlayClass}`).html('');

    /**
     * Append banner flag
     */

    // const $gallery = $('.hp-gallery-slides');
    // const bannerClass = 'gallery-mealplan--container gallery-mealplan--container-carousel js-fly-content-tooltip js-ribbon-discount gallery-best-deal';
    // const bannerPhrease = 'Bonus Package Deal';

    // $gallery.parent().append(`
    //   <div class="${bannerClass}">
    //     <p class="gallery-mealplan--p">${bannerPhrease}</p>
    //   </div>`);

    /**
     * Fetching Best Deal Service
     */
    $.ajax({
      url: `${ROOT_API_URL}/${hotelId}`,
      type: 'GET',
    }).then(function(data) {
      data.forEach(hotel => {
        cardArray.push(renderCard(hotelId, hotel));
      })

      cardArray.push([1, 2].map((item, index) => renderFakeCard(index)).join(''));

      /**
       * Prepend Pre-selected packages
       */
      $availabilityElem.prepend(`
        <h2 class="bolder-headers package">Our Special Packages: ${toggleFullDealButton('package-showall', 'Click here to show all packages')}</h2>
        <div class="card-in-row">
          ${cardArray.join('')}
          <div class="more-package">
            ${toggleFullDealButton('more-package-link', 'More Packages <small>▶</samll>')}
          </div>
        </div>
      `);

      // Toggling Deal Selection
      $('.packageCaptionCard').each(function () {
        $(this).click(() => {
          const classActive = 'active'
          const shouldToggleOn = !$(this).hasClass(classActive);
          $('.packageCaptionCard').removeClass(classActive);
          if (shouldToggleOn) $(this).addClass(classActive);
        });
      });
    })
  }

  /***************************
   *
   *  For Search Result Page
   *
   ***************************/
  if (
    currentUrl.indexOf('http://www.booking.com/searchresults.html?') === 0 ||
    currentUrl.indexOf('https://www.booking.com/searchresults.html?') === 0
  ) {
    /**
     * Fetching hotel IDs
     */
    const $blockRow = $('.sr_property_block_main_row');
    const hotelsIds = [];
    $blockRow.each(function () {
      hotelsIds.push($(this).parent().parent().data('hotelid').toString());
    })
    console.info(hotelsIds);

    /**
     * Fetching Best Deal Service
     */
    $.ajax({
      url: `${ROOT_API_URL}/search.json`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ ids: hotelsIds }),
    }).then(function(data) {
      console.log(data);
      if (!data && !data.length) return;


      Object.keys(data).forEach((hotelId) => {
        const { name: bestDeal } = data[hotelId];
        if (!bestDeal) return;

        const badgeRowClass = 'sr-badges__row';
        const blockMainRow = 'sr_property_block_main_row';
        const $hotelItemBlock = $(`#hotel_${hotelId}`).parent();
        const $badgeRow = $hotelItemBlock.find(`.${badgeRowClass}`);
        const toInsert = `
        <div class="best-deal-container">
          <div class="d-deal d-deal__cursor d-deal__lonely d-deal__main d-deal__tooltip d-deal__today_copy" data-component="track" data-track="click" data-hash="YPNBJOTXNAWXAQNSMTWGO" data-custom-goal="1">
            <div class="d-deal-best">
              <span class="d-deal--main  d-deal--main__text">
                ${bestDeal}
              </span>
              <span class="d-deal--ext d-deal--smart d-deal--ext__last d-deal--ext__first ">
                <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>
                </svg>
              </span>
              </div>
              <div class="d-deal-w">
                <div class="d-deal-w--section d-deal-w--smart">
                  <span class="d-deal-w--icon">
                    <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>
                    </svg>
                  </span>
                  <span>
                    Great package here for you during your travel.
                  </span>
                </div>
              </div>
          </div>
        </div>`;

        if ($badgeRow.length) {
          $badgeRow.append(toInsert);
        } else {
          console.log($hotelItemBlock.find(`.${blockMainRow}`));
          $hotelItemBlock.find(`.${blockMainRow}`).after(`<div class="sr-badges__row">${toInsert}</div>`);
        }
      })
    });
  }
})(jQuery);
