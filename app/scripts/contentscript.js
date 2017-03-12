'use strict';

jQuery.noConflict();

(function ($) {
  var ROOT_API_URL = 'http://bytheway-rails.herokuapp.com/hotel_packages';
  var renderPowerPackLogo = function renderPowerPackLogo(color) {
    colors = {
      blue: '',
      pink: '',
      white: '#ffff'
    };
    return '\n      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n        <path fill="#FF4165" d="M5.51386667,20.2195902 C5.50616707,20.1519311 5.5,20.0842721 5.5,20.0166131 L5.5,12.9115756 C5.5,12.8439165 5.50616707,12.7762575 5.51386667,12.7085985 L5.51386667,9.86548767 L10.18,9.86548767 C11.7954667,9.86548767 13.1058667,8.44748124 13.1058667,6.69935691 L13.1058667,1.5 L13.6258667,1.5 C16.4408,2.34780279 18.5,5.13879957 18.5,8.4624866 C18.5,12.4464094 15.5117333,15.6800643 11.8301333,15.6800643 L10.076,15.6800643 L10.076,20.0241158 C10.076,20.2491961 10.0413333,20.4592712 9.9928,20.6693462 C9.77093333,21.5771704 9.0776,22.2749196 8.2248,22.4549839 C8.0792,22.4849946 7.9336,22.5 7.788,22.5 C7.63546667,22.5 7.48986667,22.4849946 7.3512,22.4549839 C6.38053333,22.2524116 5.6248,21.3821008 5.51386667,20.3017149 L5.51386667,20.2195902 Z M8.7136,7.17619388 C7.50741011,7.17619388 6.5296,6.13115173 6.5296,4.84202691 C6.5296,3.5529021 7.50741011,2.50785995 8.7136,2.50785995 C9.91978989,2.50785995 10.8976,3.5529021 10.8976,4.84202691 C10.8976,6.13115173 9.91978989,7.17619388 8.7136,7.17619388 Z"/>\n      </svg>';
  };
  var renderFakeCard = function renderFakeCard(index) {
    return '\n      <div class="packageCaptionCard" data-deal-card-item="' + index + '">\n        <div\n          class="package-left"\n          style=\'\n            width: 112px;\n            height: 112px;\n            background-color: #efefef;\n            flex-shrink: 0;\n            margin-right: 12px;\n          \'\n        />\n        <div class="package-right">\n          <i class="bicon-checkmark-circle"></i>\n          <h3 class="package-title">Golden State Museum for FREE</h3>\n          <p class="package-description">Allows unlimited journeys on the Edinburg on the day of purchase.</p>\n          <p class="package-numbers">Selected by 12,345 orders</p>\n          <div class="package-price">\n            <p class="package-original">Original price from TW 600</p>\n            <h4 class="package-now"><small>now is</small>TWD FREE</h4>\n          </div>\n        </div>\n      </div>\n    ';
  };
  var renderCard = function renderCard(id, _ref) {
    var description = _ref.description,
        discountPrice = _ref.discounted_price,
        originalPrice = _ref.original_price,
        thumbnail = _ref.image_thumbnail_url,
        short_name = _ref.short_name,
        name = _ref.name;

    return '\n      <div\n        class="packageCaptionCard"\n        data-deal-card-item="' + id + '"\n        data-description="' + description + '"\n        data-discountPrice="' + discountPrice + '"\n        data-originalPrice="' + originalPrice + '"\n        data-thumbnail="' + thumbnail + '"\n        data-name="' + short_name + ' ' + name + '"\n      >\n        <div\n          class="package-left"\n          style=\'\n            width: 112px;\n            height: 112px;\n            background-color: #efefef;\n            background: #efefef url(' + thumbnail + ') center center / cover;\n            flex-shrink: 0;\n            margin-right: 12px;\n          \'\n        />\n        <div class="package-right">\n          <i class="bicon-checkmark-circle"></i>\n          <h3 class="package-title">' + short_name + ' ' + name + '</h3>\n          <p class="package-description">' + (description || 'No Description Yet') + '</p>\n          <p class="package-numbers">Selected by 12,345 orders</p>\n          <div class="package-price">\n            <p class="package-original">Original price from TWD ' + parseInt(originalPrice).toFixed() + '</p>\n            <h4 class="package-now"><small>now is</small> TWD ' + parseInt(discountPrice).toFixed() + '</h4>\n          </div>\n        </div>\n      </div>\n    ';
  };

  var renderToggleFullDealButton = function renderToggleFullDealButton(customClass, sentence) {
    return '\n    <a class="' + customClass + ' big_review_score_detailed js-big_review_score_detailed ind_rev_total hp_review_score js-hotel-review-score" href="#blockdisplay4" rel="reviews" data-tab-link="" onclick="return false;" style="">\n      <span class="js--hp-scorecard-scoreword" data-open-map-track="rev">\n        ' + sentence + '\n      </span>\n    </a>';
  };

  var renderHighlightWrapper = function renderHighlightWrapper(_ref2) {
    var description = _ref2.description,
        thumbnail = _ref2.thumbnail,
        name = _ref2.name;
    return '\n    <div class="deal-wrapper">\n      <div class="property-highlights section-border">\n        <div data-et-view="ZCFRURURYXYIHMaQZdDSBXe:3"></div>\n        <div data-et-view="ZCFRURURYXYIHMaQZdDSBXe:4"></div>\n        <h3 class="ph-header">\n          <svg fill="#003580" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">\n            <path d="M0 0h24v24H0z" fill="none"/>\n            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>\n          </svg>\n          &nbsp; Your Package ' + renderToggleFullDealButton('ph-header__edit', 'Edit') + '\n        </h3>\n        <div class="ph-section">\n          <div\n            class="package-left"\n            style=\'\n              width: 80px;\n              height: 80px;\n              background-color: #efefef;\n              background: #efefef url(' + thumbnail + ') center center / cover;\n              flex-shrink: 0;\n              margin-right: 12px;\n            \'\n          />\n          <div class="deal-wrapper__descContainer">\n            <h3>' + name + '</h3>\n            <span class="ph-item-copy-heart"><script type="track_copy" data-hash="ZOOTIPPQFFdGdfUSCaIaeaGVKe"></script>\n              ' + (description || 'Allows unlimited journeys on the Edinburg on the day of purchase.') + '\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  ';
  };

  var renderInsertBadge = function renderInsertBadge(shortName) {
    return '\n    <div class="best-deal-container">\n      <div class="d-deal d-deal__cursor d-deal__lonely d-deal__main d-deal__tooltip d-deal__today_copy" data-component="track" data-track="click" data-hash="YPNBJOTXNAWXAQNSMTWGO" data-custom-goal="1">\n        <div class="d-deal-best">\n          <span class="d-deal--main  d-deal--main__text">\n            ' + shortName + '\n          </span>\n          <span class="d-deal--ext d-deal--smart d-deal--ext__last d-deal--ext__first ">\n            <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n              <path d="M0 0h24v24H0z" fill="none"/>\n              <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>\n            </svg>\n          </span>\n          </div>\n          <div class="d-deal-w">\n            <div class="d-deal-w--section d-deal-w--smart">\n              <span class="d-deal-w--icon">\n                <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n                  <path d="M0 0h24v24H0z" fill="none"/>\n                  <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>\n                </svg>\n              </span>\n              <span>\n                Great package here for you during your travel.\n              </span>\n            </div>\n          </div>\n      </div>\n    </div>';
  };

  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  var currentUrl = window.location.href;

  if (currentUrl.indexOf('https://secure.booking.com/book.html') === 0) {
    var powerPackPrice = 400;
    var $totalPrice = $('.bp_pricedetails_total_value');
    var $hotelNameTitle = $('.bp_hotel_name_title');

    // Hack the price - append detail
    $('.bp_pricedetails_breakdown').append('\n      <li class="bp_pricedetails_breakdown_included">\n        <span class="bp_pricedetails_breakdown_charge">\n          Taipei 101 Observatory Ticket Adult Ticket\n        </span>\n        <span class="bp_pricedetails_breakdown_price">\n          TWD&nbsp;' + powerPackPrice + '\n        </span>\n      </li>\n    ');

    // Hack the price - total price
    $totalPrice.text('TWD ' + ($totalPrice.data('price') + powerPackPrice));

    // Hack the title - Add badge
    $hotelNameTitle.after(renderInsertBadge('Taipei 101 Observatory Ticket Adult Ticket'));
  }

  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  if (currentUrl.indexOf('http://www.booking.com/hotel') === 0 || currentUrl.indexOf('https://www.booking.com/hotel') === 0) {
    var $availabilityElem = $('#hp_availability_style_changes');
    var hotelId = $('*[data-hotel-id]').data('hotel-id');
    var cardArray = [];
    var reviewListOverlayClass = 'review_list_block-sliding_in_wrapper';

    // Init Side Bar Fade-in modal, steal from review
    $('.' + reviewListOverlayClass).html('\n      <h1 class="more-deal-title">\n        All Packages in ' + $('#hp_hotel_name').text() + '\n        <a class="be-merchant">\n          ' + renderPowerPackLogo() + '\n          Become Our Merchant\n        </a>\n      </h1>\n      <img class="more-deal-images" src="' + chrome.extension.getURL('images/our-suggestion.jpg') + '" />\n      <img class="more-deal-images" src="' + chrome.extension.getURL('images/filter-deals.jpg') + '" />\n      <img class="more-deal-images" src="' + chrome.extension.getURL('images/more-deals.jpg') + '" />\n    ');

    // Hack the title - Add powerpack Badge
    $('.nowrap.hp__hotel_ratings').append(renderInsertBadge('PowerPack Available!'));

    /**
     * Fetching Best Deal Service
     */
    $.ajax({
      url: ROOT_API_URL + '/' + hotelId,
      type: 'GET'
    }).then(function (data) {
      data.forEach(function (hotel) {
        cardArray.push(renderCard(hotelId, hotel));
      });

      // cardArray.push([1, 2].map((item, index) => renderFakeCard(index)).join(''));

      /**
       * Prepend Pre-selected packages
       */
      $availabilityElem.prepend('\n        <h2 class="bolder-headers package">Our Special Packages: ' + renderToggleFullDealButton('package-showall', 'Click here to show all packages') + '</h2>\n        <div class="card-in-row">\n          ' + cardArray.join('') + '\n          <div class="more-package">\n            ' + renderToggleFullDealButton('more-package-link', 'More Packages <small>▶</samll>') + '\n          </div>\n        </div>\n      ');

      // Toggling Deal Selection
      $('.packageCaptionCard').each(function () {
        var _this = this;

        $(this).click(function () {
          var classActive = 'active';
          var shouldToggleOn = !$(_this).hasClass(classActive);
          var description = $(_this).data('description');
          var thumbnail = $(_this).data('thumbnail');
          var name = $(_this).data('name');

          $('.packageCaptionCard').removeClass(classActive);
          $('.deal-wrapper').remove();

          if (shouldToggleOn) {
            $(_this).addClass(classActive);

            // Init Custom Deal highetWrapper
            $('.property_hightlights_wrapper').append(renderHighlightWrapper({
              description: description,
              thumbnail: thumbnail,
              name: name
            }));
          }
        });
      });
    });
  }

  /***************************
   *
   *  For Search Result Page
   *
   ***************************/
  if (currentUrl.indexOf('http://www.booking.com/searchresults.html?') === 0 || currentUrl.indexOf('https://www.booking.com/searchresults.html?') === 0) {
    /**
     * Fetching hotel IDs
     */
    var $blockRow = $('.sr_property_block_main_row');
    var hotelsIds = [];
    $blockRow.each(function () {
      hotelsIds.push($(this).parent().parent().data('hotelid').toString());
    });
    console.info(hotelsIds);

    /**
     * Fetching Best Deal Service
     */
    $.ajax({
      url: ROOT_API_URL + '/search.json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ ids: hotelsIds })
    }).then(function (data) {
      console.log(data);
      if (!data && !data.length) return;

      Object.keys(data).forEach(function (hotelId) {
        var _data$hotelId = data[hotelId],
            bestDeal = _data$hotelId.name,
            shortName = _data$hotelId.short_name;

        if (!shortName) return;

        var badgeRowClass = 'sr-badges__row';
        var blockMainRow = 'sr_property_block_main_row';
        var $hotelItemBlock = $('#hotel_' + hotelId).parent();
        var $badgeRow = $hotelItemBlock.find('.' + badgeRowClass);

        if ($badgeRow.length) {
          $badgeRow.append(renderInsertBadge(shortName));
        } else {
          console.log($hotelItemBlock.find('.' + blockMainRow));
          $hotelItemBlock.find('.' + blockMainRow).after('<div class="sr-badges__row">' + toInsert + '</div>');
        }
      });
    });
  }
})(jQuery);