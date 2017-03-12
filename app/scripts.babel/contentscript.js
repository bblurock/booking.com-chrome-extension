'use strict';

jQuery.noConflict();

(function($) {
  const COLOR_BLUE = 'blue';
  const COLOR_PINK = 'pink';
  const COLOR_WHITE = 'white';

  const ROOT_API_URL = 'http://bytheway-rails.herokuapp.com/hotel_packages';
  const renderPowerPackLogo = (color = COLOR_BLUE, size = 24) => {
    const colors = {
      [COLOR_BLUE]: '#022b80',
      [COLOR_PINK]: '#ff4165',
      [COLOR_WHITE]: '#ffffff'
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
        <path fill="${colors[color]}" d="M5.51386667,20.2195902 C5.50616707,20.1519311 5.5,20.0842721 5.5,20.0166131 L5.5,12.9115756 C5.5,12.8439165 5.50616707,12.7762575 5.51386667,12.7085985 L5.51386667,9.86548767 L10.18,9.86548767 C11.7954667,9.86548767 13.1058667,8.44748124 13.1058667,6.69935691 L13.1058667,1.5 L13.6258667,1.5 C16.4408,2.34780279 18.5,5.13879957 18.5,8.4624866 C18.5,12.4464094 15.5117333,15.6800643 11.8301333,15.6800643 L10.076,15.6800643 L10.076,20.0241158 C10.076,20.2491961 10.0413333,20.4592712 9.9928,20.6693462 C9.77093333,21.5771704 9.0776,22.2749196 8.2248,22.4549839 C8.0792,22.4849946 7.9336,22.5 7.788,22.5 C7.63546667,22.5 7.48986667,22.4849946 7.3512,22.4549839 C6.38053333,22.2524116 5.6248,21.3821008 5.51386667,20.3017149 L5.51386667,20.2195902 Z M8.7136,7.17619388 C7.50741011,7.17619388 6.5296,6.13115173 6.5296,4.84202691 C6.5296,3.5529021 7.50741011,2.50785995 8.7136,2.50785995 C9.91978989,2.50785995 10.8976,3.5529021 10.8976,4.84202691 C10.8976,6.13115173 9.91978989,7.17619388 8.7136,7.17619388 Z"/>
      </svg>`;
  }

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
            ${renderPowerPackLogo(COLOR_WHITE, 18)}
          </span>
          </div>
          <div class="d-deal-w">
            <div class="d-deal-w--section d-deal-w--smart">
              <span class="d-deal-w--icon">
                ${renderPowerPackLogo(COLOR_PINK, 25)}
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
    $('#booking-summary').prepend(`
        <span class="package-selected"></span>
    `);

    // Init Side Bar Fade-in modal, steal from review
    $(`.${reviewListOverlayClass}`).html(`
      <img class="more-deal-images verified" src="${chrome.extension.getURL('images/verified-account.jpg')}" />
      <h1 class="more-deal-title">
        All Packages in ${ $('#hp_hotel_name').text() }
        <a class="be-merchant">
          <div class="d-deal d-deal__cursor d-deal__lonely d-deal__main d-deal__tooltip d-deal__today_copy" data-component="track" data-track="click" data-hash="YPNBJOTXNAWXAQNSMTWGO" data-custom-goal="1">
            <div class="d-deal-best d-deal-best-more-deal">
              <span class="d-deal--main  d-deal--main__text">
                ${renderPowerPackLogo(COLOR_BLUE, 18)} Become Our Merchant
              </span>
            </div>
            <div class="d-deal-w">
              <div class="d-deal-w--section d-deal-w--smart">
                <span class="d-deal-w--icon">
                  ${renderPowerPackLogo(COLOR_PINK, 35)}
                </span>
                <span>
                  Become our merchant to promote your business with us
                </span>
              </div>
            </div>
          </div>
        </a>
      </h1>
      <img class="more-deal-images" src="${chrome.extension.getURL('images/our-suggestion.jpg')}" />
      <img class="more-deal-images" src="${chrome.extension.getURL('images/filter-deals.jpg')}" />
      <img class="more-deal-images" src="${chrome.extension.getURL('images/more-deals.jpg')}" />
    `);

    // Hack the title - Add powerpack Badge
    $('.nowrap.hp__hotel_ratings').append(renderInsertBadge('PowerPack Available!'));

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
        <h2 class="bolder-headers package">
          Our Special Packages: ${renderToggleFullDealButton('package-showall', 'Click here to show all packages')}
          <span class="number-packages-selected"></span>
        </h2>
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

          // Toggle itself
          $(this).hasClass(classActive) ? $(this).removeClass(classActive) : $(this).addClass(classActive) ;

          // Adding up selection number
          const numSeleciton = $('.packageCaptionCard.active').length

          $('.number-packages-selected').html(`
            ${renderPowerPackLogo(COLOR_BLUE, 14)}:
            <em>${numSeleciton}</em> Packages Selected
          `);

          if ($('#booking-summary .package-selected')) {
            $('#booking-summary .package-selected').html(`${numSeleciton} package Selected <br />+ <br />`);
          }

          // $('.deal-wrapper').remove();
          //
          // if (shouldToggleOn) {
          //   $(this).addClass(classActive);
          //   // Init Custom Deal highetWrapper
          //   $('.property_hightlights_wrapper').append(
          //     renderHighlightWrapper({
          //       description,
          //       thumbnail,
          //       name,
          //     })
          //   );
          // }
        });

        // Bind Price Hacking
        $('.roomDefaultUse select').on('change', function () {
          setTimeout(() => {
            const numSeleciton = $('.packageCaptionCard.active').length
            $('#booking-summary .package-selected').html(`${numSeleciton} package Selected <br />+ <br />`);
          }, 1000)
        })
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
