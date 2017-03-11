'use strict';

jQuery.noConflict();

const ROOT_API_URL = 'http://localhost:3000';

(function($) {

  /***************************
   *
   *  For Hotel Detail Page *
   *
   ***************************/
  const $gallery = $('.hp-gallery-slides');
  const bannerClass = 'gallery-mealplan--container gallery-mealplan--container-carousel js-fly-content-tooltip js-ribbon-discount gallery-best-deal';
  const bannerPhrease = 'Bonus Package Deal';
  const $availabilityElem = $('#hp_availability_style_changes');
  const packageSvg = chrome.extension.getURL('images/package.png');

  /**
   * Append banner flag
   */
  $gallery.parent().append(`
    <div class="${bannerClass}">
      <p class="gallery-mealplan--p">${bannerPhrease}</p>
    </div>`);

  /**
   * Prepend Pre-selected packages
   */
  $availabilityElem.prepend(`
    <div class="packageCaptionCard">
      <h3>Golden State Museum for FREE</h3>
      <p>Why wait? Jump the queues and board your capsule more quickly</p>
    </div>
  `);

  /***************************
   *
   *  For Search Result Page
   *
   ***************************/
  /**
   * Fetching hotel IDs
   */
  const $badgesRows = $('.sr-badges__row');
  const hotelsIds = [];
  $badgesRows.each(function () {
    hotelsIds.push($(this).parent().parent().data('hotelid'))
  })
  // console.info('hotel IDs', hotelsIds);

  /**
   * Fetching Best Deal Service
   */
  $.ajax({
    url: ROOT_API_URL + '/hotels',
    method: 'GET'
  }).then(function(data) {
    if (!data && !data.length) return;

    data.forEach(({ id: hotelId, best_deal: bestDeal }) => {
      // console.log(hotelId, bestDeal);
      if (!bestDeal) return;

      const badgeRowClass = 'sr-badges__row';
      const $hotelItemBlock = $(`#hotel_${hotelId}`).parent();
      const $badgeRow = $hotelItemBlock.find(`.${badgeRowClass}`);

      $badgeRow.prepend(`
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
      </div>`);
    })
  });

})(jQuery);

