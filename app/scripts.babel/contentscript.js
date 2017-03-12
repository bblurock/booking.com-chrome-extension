'use strict';

jQuery.noConflict();

(function($) {
  const ROOT_API_URL = 'http://bytheway-rails.herokuapp.com/hotel_packages';
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
            <h4 class="package-now"><small>now is</small>TWD FREE</h4>
          </div>
        </div>
      </div>
    `;
  }
  const renderCard = (id, {
    description,
    discounted_price: discountPrice,
    original_price: originalPrice,
    image_thumbnail_url: thumbnail,
    short_name,
    name,
  }) => {
    return `
      <div
        class="packageCaptionCard"
        data-deal-card-item="${id}"
        data-description="${description}"
        data-discountPrice="${discountPrice}"
        data-originalPrice="${originalPrice}"
        data-thumbnail="${thumbnail}"
        data-name="${short_name} ${name}"
      >
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
          <h3 class="package-title">${short_name} ${name}</h3>
          <p class="package-description">${description || 'No Description Yet'}</p>
          <p class="package-numbers">Selected by 12,345 orders</p>
          <div class="package-price">
            <p class="package-original">Original price from TWD ${parseInt(originalPrice).toFixed()}</p>
            <h4 class="package-now"><small>now is</small> TWD ${parseInt(discountPrice).toFixed()}</h4>
          </div>
        </div>
      </div>
    `;
  }

  const renderToggleFullDealButton = (customClass, sentence) => (`
    <a class="${customClass} big_review_score_detailed js-big_review_score_detailed ind_rev_total hp_review_score js-hotel-review-score" href="#blockdisplay4" rel="reviews" data-tab-link="" onclick="return false;" style="">
      <span class="js--hp-scorecard-scoreword" data-open-map-track="rev">
        ${sentence}
      </span>
    </a>`)

  const renderHighlightWrapper = ({
    description,
    thumbnail,
    name,
  }) => (`
    <div class="deal-wrapper">
      <div class="property-highlights section-border">
        <div data-et-view="ZCFRURURYXYIHMaQZdDSBXe:3"></div>
        <div data-et-view="ZCFRURURYXYIHMaQZdDSBXe:4"></div>
        <h3 class="ph-header">
          <svg fill="#003580" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
          </svg>
          &nbsp; Your Package ${renderToggleFullDealButton('ph-header__edit', 'Edit')}
        </h3>
        <div class="ph-section">
          <div
            class="package-left"
            style='
              width: 80px;
              height: 80px;
              background-color: #efefef;
              background: #efefef url(${thumbnail}) center center / cover;
              flex-shrink: 0;
              margin-right: 12px;
            '
          />
          <div class="deal-wrapper__descContainer">
            <h3>${name}</h3>
            <span class="ph-item-copy-heart"><script type="track_copy" data-hash="ZOOTIPPQFFdGdfUSCaIaeaGVKe"></script>
              ${description || 'Allows unlimited journeys on the Edinburg on the day of purchase.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  `)

  const renderInsertBadge = shortName => (`
    <div class="best-deal-container">
      <div class="d-deal d-deal__cursor d-deal__lonely d-deal__main d-deal__tooltip d-deal__today_copy" data-component="track" data-track="click" data-hash="YPNBJOTXNAWXAQNSMTWGO" data-custom-goal="1">
        <div class="d-deal-best">
          <span class="d-deal--main  d-deal--main__text">
            ${shortName}
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
    </div>`);


  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  const currentUrl = window.location.href;

  if (currentUrl.indexOf('https://secure.booking.com/book.html') === 0) {
    const powerPackPrice = 400;
    const $totalPrice = $('.bp_pricedetails_total_value');
    const $hotelNameTitle = $('.bp_hotel_name_title');

    // Hack the price - append detail
    $('.bp_pricedetails_breakdown').append(`
      <li class="bp_pricedetails_breakdown_included">
        <span class="bp_pricedetails_breakdown_charge">
          Taipei 101 Observatory Ticket Adult Ticket
        </span>
        <span class="bp_pricedetails_breakdown_price">
          TWD&nbsp;${powerPackPrice}
        </span>
      </li>
    `)

    // Hack the price - total price
    $totalPrice.text(`TWD ${$totalPrice.data('price') + powerPackPrice}`);

    // Hack the title - Add badge
    $hotelNameTitle.after(renderInsertBadge('Taipei 101 Observatory Ticket Adult Ticket'));
  }


  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  if (
    currentUrl.indexOf('http://www.booking.com/hotel') === 0 ||
    currentUrl.indexOf('https://www.booking.com/hotel') === 0
  ) {
    const $availabilityElem = $('#hp_availability_style_changes');
    const hotelId = $('*[data-hotel-id]').data('hotel-id');
    const cardArray = [];
    const reviewListOverlayClass = 'review_list_block-sliding_in_wrapper'

    // Init Side Bar Fade-in modal, steal from review
    $(`.${reviewListOverlayClass}`).html(`
      <h1 class="more-deal-title">
        All Packages in ${ $('#hp_hotel_name').text() }
        <a class="be-merchant">Become Our Merchant</a>
      </h1>
      <img class="more-deal-images" src="${chrome.extension.getURL('images/our-suggestion.jpg')}" />
      <img class="more-deal-images" src="${chrome.extension.getURL('images/filter-deals.jpg')}" />
      <img class="more-deal-images" src="${chrome.extension.getURL('images/more-deals.jpg')}" />
    `);

    // Hack the title - Add powerpack Badge
    $('#wrap-hotelpage-top').before(renderInsertBadge('PowerPack Available!'));

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

      // cardArray.push([1, 2].map((item, index) => renderFakeCard(index)).join(''));

      /**
       * Prepend Pre-selected packages
       */
      $availabilityElem.prepend(`
        <h2 class="bolder-headers package">Our Special Packages: ${renderToggleFullDealButton('package-showall', 'Click here to show all packages')}</h2>
        <div class="card-in-row">
          ${cardArray.join('')}
          <div class="more-package">
            ${renderToggleFullDealButton('more-package-link', 'More Packages <small>▶</samll>')}
          </div>
        </div>
      `);

      // Toggling Deal Selection
      $('.packageCaptionCard').each(function () {
        $(this).click(() => {
          const classActive = 'active'
          const shouldToggleOn = !$(this).hasClass(classActive);
          const description = $(this).data('description');
          const thumbnail = $(this).data('thumbnail');
          const name = $(this).data('name');

          $('.packageCaptionCard').removeClass(classActive);
          $('.deal-wrapper').remove();

          if (shouldToggleOn) {
            $(this).addClass(classActive);

            // Init Custom Deal highetWrapper
            $('.property_hightlights_wrapper').append(
              renderHighlightWrapper({
                description,
                thumbnail,
                name,
              }));
          }
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
        const { name: bestDeal, short_name: shortName } = data[hotelId];
        if (!shortName) return;

        const badgeRowClass = 'sr-badges__row';
        const blockMainRow = 'sr_property_block_main_row';
        const $hotelItemBlock = $(`#hotel_${hotelId}`).parent();
        const $badgeRow = $hotelItemBlock.find(`.${badgeRowClass}`);

        if ($badgeRow.length) {
          $badgeRow.append(renderInsertBadge(shortName));
        } else {
          console.log($hotelItemBlock.find(`.${blockMainRow}`));
          $hotelItemBlock.find(`.${blockMainRow}`).after(`<div class="sr-badges__row">${toInsert}</div>`);
        }
      })
    });
  }
})(jQuery);
